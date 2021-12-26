import {logger} from '@/utils/logger'

/*

Mixin injects 'story' and 'stories' data objects directly into component data

*/

const log = logger({
  title: "Storyblok",
});


export const mixinStoryblokBridge = {

  async asyncData({
    app,
    route,
    $config,
  }) {

    try {

      const isHome = route.path === '/' || route.path === ''
      const slug = isHome ? '/home' : route.path

      log.group(`mixinStoryBlokBridge called from "${slug}" route`);

      const reqConfig = {
        version: $config.STORYBLOK_CONTENT_VERSION,
      };

      log.await(`${reqConfig.version} | cdn/stories${slug}`);

      const pageRes = await app.$storyapi.get(
        `cdn/stories${slug}`,
         reqConfig,
      );
      log.task('set page data');
      const story = pageRes.data.story;

      const isIndex = story.name.toLowerCase() === 'index' && !isHome;
      const stories = [];

      if(story.is_startpage) {
        log.await('fetching indexed pages');
        reqConfig.by_slugs = `${route.name}/*`
        const indexRes = await app.$storyapi.get(
          'cdn/stories',
          reqConfig,
        )
        if(indexRes.data.stories) {
          indexRes.data.stories.forEach(item => {
            if(item.name.toLowerCase() !== 'index') {
              log.task(`add [${item.name}] to index`)
              stories.push(item);
            }
          })
          if(!stories.length) {
            log.failed('no indexed pages found');
          }
        } 
      }

      const dataObj = isIndex ? {story, stories} : {story};

      log.complete('storyblok request complete')
      log.groupEnd()

      return dataObj;

    } catch(err) {
      log.error(`mixinStoryblokBridge | ${err}`);
    }
  },

  mounted () {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      // window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  },


}
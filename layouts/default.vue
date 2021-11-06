<template>

  <div id="top" class="site-wrapper">
    
    <!-- navigation -->
    <layout-primary-nav 
      :page-links="pageLinks" 
      :social-links="socialLinks"
      :handheld-nav-is-active="handheldNavIsActive"
      :is-handheld-window-width="isHandheldWindowWidth">
    </layout-primary-nav>
    
    <!-- body -->
    <Nuxt />

    <!-- footer -->
    <layout-site-footer 
      :social-links="socialLinks">
    </layout-site-footer>

  </div>
  
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'
import {ModuleNames} from '@/constants/store'
import {
  GetterNames as WindowGetterNames,
  MutationNames as WindowMutationNames
} from '@/store/keys/windowKeys'
import {
  GetterNames as NavigationGetterNames,
} from '~/store/keys/navigationKeys'

import {mixinWindowResizeListener} from '@/mixins/mixinWindowResizeListener'

export default {

  mixins: [mixinWindowResizeListener],

  data() {
    return {
      logRef: '<layout-default>',
      pageLinks: [
        {
          name: 'Cakes',
          to: '/cakes'
        },
        {
          name: 'Cheesecakes',
          to: '/cheesecakes'
        },
        {
          name: 'Cupcakes',
          to: '/cupcakes'
        }
      ],
      socialLinks: [
        {
          name: 'Instagram',
          icon_name: 'InstagramIcon',
          to: 'https://www.instagram.com/ruescakery/'
        }
      ],
    }
  },

  computed: {
    ...mapGetters(ModuleNames.Window, {
      isHandheldWindowWidth: WindowGetterNames.IsHandheldWindowWidth,
    }),
    ...mapGetters(ModuleNames.Navigation, {
      handheldNavIsActive: NavigationGetterNames.HandheldNavIsActive
    })
  },

  methods: {
    mixinWindowResizeListener_onResize() {
      this[WindowMutationNames.UpdateWindowWidth](window.innerWidth);
      this[WindowMutationNames.UpdateWindowHeight](window.innerHeight);
    },
    ...mapMutations(ModuleNames.Window, [
      WindowMutationNames.UpdateWindowWidth,
      WindowMutationNames.UpdateWindowHeight,
    ])
  }

}

</script>

<style lang="scss">
  
  :root {
    font-family: $text-font;
    font-size: $text-root;
    line-height: $line-height-root;
    color: $text-color;
    background: $page-background;
    h1, h2, h3,
    h4, h5, h6 {
      font-weight: 700;
      color: $title-color;
    }

    h1, h2, h3 {
      font-family: $title-font;
      line-height: 1.1;
    }

    @include media-from($tablet, font-size, $text-medium);

    b, strong {
      font-weight: 700;
    }

    svg {
      fill: $text-color;
    }

  }

  .site-wrapper {
    @include row(between, center, $direction: column);
    min-height: 100vh;
  }

  .page-wrapper {
    @include row(center, center, $direction: column);
    flex: 1;
  }

  main {
    @include row(center, center);
  }

  .content-panel {
    @include row(center, center);
    @include pad-scale(
      x,
      $default: $space-2,
      $on-tablet: $space-4,
      $on-laptop: $space-6, 
    );
    @include margin-scale(
      bottom,
      $default: $space-8,
      $on-laptop: $space-10,
    );
  }

</style>
/********************

Mixin watches for changes in window dimensions and responds 
as defined in 'onResize' method

Mixin requires a mixinWindowResizeListener data object

{
  onResize(width, height): method to call when window is resized
}

********************/


import {logger} from '@/utils/logger'
import {debounce} from '@/utils/debounce'

const log = logger({
  title: "MIXIN",
  time: false,
})

const mixinName = 'mixinWindowResizeListener'

export const mixinWindowResizeListener = {

  data() {
    return {
      mixinWindowResizeListener_groupTitle: null,
    }
  },

  mounted() {

    this.mixinWindowResizeListener_groupTitle = `${mixinName} called from ${this.logRef}`

    log.group(this.mixinWindowResizeListener_groupTitle);
    
    // check for config object
    if(!this.mixinWindowResizeListener) {
      return log.warn(`make sure to set a ${mixinName} data object`);
    }

    // set event listener
    log.task('set event listener');
    window.addEventListener(
      'resize',
      this.mixinWindowResizeListener_setDimensions,
    );
    this.mixinWindowResizeListener_setDimensions();
    log.groupEnd();
  },

  beforeDestroy() {
    log.group(this.mixinWindowResizeListener_groupTitle)
    log.task('remove event listener')
    window.removeEventListener(
      'resize',
      this.mixinWindowResizeListener_setDimensions
    )
    log.groupEnd();
  },

  methods: {
    mixinWindowResizeListener_setDimensions: debounce(function() {
      this.mixinWindowResizeListener.onResize(
        window.innerWidth,
        window.innerHeight
      );
    }, 500) 
  }

}
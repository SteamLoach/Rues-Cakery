/********************

Mixin watches for changes in window dimensions and responds 
as defined in 'onResize' method

Mixin requires a mixinWindowResizeListener data object

{
  onResize(width, height): method to call when window is resized
}

********************/


import {logger} from '@/utils/logger'

const log = logger({
  title: "MIXIN",
  time: false,
})

export const mixinWindowResizeListener = {

  data() {
    return {
      mixinWindowResizeListener_windowWidth: null,
      mixinWindowResizeListener_windowHeight: null,
    }
  },

  mounted() {

    log.group(`windowResizeListener called from ${this.logRef}`);
    
    // check for config object
    if(!this.mixinWindowResizeListener) {
      return log.warn('make sure to set a mixinWindowResizeListener data object');
    }

    // set event listener
    log.task('set event listener');
    window.addEventListener(
      'resize',
      this.mixinWindowResizeListener_setDimensions,
    );

    // set initial dimensions
    this.mixinWindowResizeListener_setDimensions()
    log.info(`initial width: ${this.mixinWindowResizeListener_windowWidth} | initial height: ${this.mixinWindowResizeListener_windowHeight}`)
    log.groupEnd();
  },

  watch: {
    mixinWindowResizeListener_dimensions: {
      deep: true,
      handler() {
        this.mixinWindowResizeListener_emitResize();
      }
    }
  },

  computed: {
    mixinWindowResizeListener_dimensions() {
      return {
        width: this.mixinWindowResizeListener_windowWidth,
        height: this.mixinWindowResizeListener_windowHeight
      }
    }
  },

  methods: {
    mixinWindowResizeListener_emitResize() {
      return this.mixinWindowResizeListener.onResize(
        this.mixinWindowResizeListener_windowWidth,
        this.mixinWindowResizeListener_windowHeight,
      )
    },
    mixinWindowResizeListener_setDimensions() {
      this.mixinWindowResizeListener_windowWidth = window.innerWidth;
      this.mixinWindowResizeListener_windowHeight = window.innerHeight;
    },
  }

}
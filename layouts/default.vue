<template>

  <div id="top" class="site-wrapper">
    
    <!-- navigation -->
    <layout-top-nav 
      :page-links="pageLinks"
      :social-links="socialLinks"
    />
    
    <!-- body -->
    <Nuxt />

    <!-- footer -->
    <layout-site-footer :social-links="socialLinks" />

  </div>
  
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'
import {
  ModuleNames,
  NavigationGetterNames,
  WindowGetterNames,
  WindowMutationNames
} from '~/constants/store'

import {mixinWindowResizeListener} from '~/mixins/mixin-window-resize-listener'

export default {

  mixins: [mixinWindowResizeListener],

  data() {
    return {
      logRef: '<layout-default>',
      siteSettings: null,
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
      breakpoints: WindowGetterNames.Breakpoints
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
    @include single-pad-until($tablet, top, 75px);
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
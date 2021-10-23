<template>

  <div id="top" class="site-wrapper">
    
    <!-- navigation -->
    <layout-primary-nav 
      :page-links="pageLinks" 
      :social-links="socialLinks"
      :handheld-nav-is-active="handHeldNavIsActive"
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
import {GetterNames, MutationNames} from '@/store/keys'

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
    ...mapGetters({
      isHandheldWindowWidth: GetterNames.IsHandheldWindowWidth,
      handHeldNavIsActive: GetterNames.HandheldNavIsActive
    })
  },

  methods: {
    mixinWindowResizeListener_onResize() {
      this[MutationNames.UpdateWindowWidth](window.innerWidth);
      this[MutationNames.UpdateWindowHeight](window.innerHeight);
    },
    ...mapMutations([
      MutationNames.UpdateWindowWidth,
      MutationNames.UpdateWindowHeight,
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
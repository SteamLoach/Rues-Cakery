<template>

  <div id="top" class="site-wrapper">
    
    <!-- navigations -->
    <slide-y-down-transition>
      <layout-handheld-nav
        v-if="handHeldNavIsActive"
        :page-links="pageLinks" 
        :social-links="socialLinks">
      </layout-handheld-nav>
    </slide-y-down-transition>
    <layout-primary-nav 
      :page-links="pageLinks" 
      :social-links="socialLinks">
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

import {mapGetters} from 'vuex'
import {GetterNames} from '@/store/keys'

import {ENABLE_LOGGER} from '@/constants/app-variables'

export default {

  data() {
    return {
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
      ]
    }
  },

  computed: {
    showLogs () {
      return ENABLE_LOGGER;
    },
    ...mapGetters({
      handHeldNavIsActive: GetterNames.HandheldNavIsActive
    })
  },

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
      fill: $title-color;
    }

  }

  .site-wrapper {
    @include row(between, center, $direction: column);
    min-height: 100vh;
  }

  .page-wrapper {
    width: 100%;
  }

</style>
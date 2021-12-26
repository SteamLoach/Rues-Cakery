<template>
  <nav class="top-nav">
    <client-only>
      <component
        :is="navComponent"
        :page-links="pageLinks"
        :social-links="socialLinks"     
      /> 
    </client-only>
  </nav>
</template>



<script>

import { mapGetters } from 'vuex'

import {
  ModuleNames,
  WindowGetterNames
} from '@/constants/store'

const NavComponents = {
  DesktopNav: 'layout-components-desktop-nav',
  HandheldNav: 'layout-components-handheld-nav'
}

export default {

  props: {
    pageLinks: {
      type: Array,
      required: true,
    },
    socialLinks: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    navComponent() {
      return this.breakpoints.fromTablet ?
      NavComponents.DesktopNav
      : NavComponents.HandheldNav
    },
    ...mapGetters(ModuleNames.Window, {
      breakpoints: WindowGetterNames.Breakpoints
    })
  }

}

</script>

<style lang="scss">

  .top-nav {
    z-index: 1;
    width: 100%;
    &__social-links {
      padding: $space-2 $space-3;
      text-align: center;
      @include media-from($tablet, text-align, right);
      svg {
        @include size(30px);
      }
    }
  }

</style>
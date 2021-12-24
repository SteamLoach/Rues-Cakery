<template>
  <nav class="top-nav">
    <layout-components-desktop-nav 
      v-if="breakpoints.fromTablet"
      :page-links="pageLinks"
      :social-links="socialLinks"
    />
    <layout-components-handheld-nav 
      v-else
      :page-links="pageLinks"
      :social-links="socialLinks"     
    />
  </nav>
</template>



<script>

import { mapGetters } from 'vuex'

import {
  ModuleNames,
  WindowGetterNames
} from '@/constants/store'

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
<template>
  <div 
    id="handheld-nav"
    class="handheld-nav"
  >
    <div class="header">
      <nuxt-link
        class="home-link" 
        :to="`/`"
        @click.native="toggleActive">
        Rue's Cakery
      </nuxt-link>
      <layout-utils-handheld-nav-toggle />
    </div>
    <fade-transition>
      <div
        v-if="isActive" 
        class="inner"
      >
        <ul class="page-links">
          <li 
            v-for="link in pageLinks"
            :key="`${link.name}-page-link`"
            class="page-link"
          >
            <nuxt-link 
              :to="link.to"
              :title="`Browse ${link.name}`"
              @click.native="toggleActive"
            >
              {{link.name}}
            </nuxt-link>
          </li>
        </ul> 
        <ul class="top-nav__social-links">
          <li 
            v-for="link in socialLinks"
            :key="`${link.name}-primary-nav-social-link`">
            <a :href="link.to" :title="link.name">
              <utils-svg-loader :content="{icon_name: link.icon_name}" />
            </a>
          </li>
        </ul>      
      </div>
    </fade-transition>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import {
  ModuleNames,
  NavigationGetterNames,
  NavigationMutationNames
} from '@/constants/store'

export default {

  props: {
    pageLinks: {
      type: Array,
      required: true,
      default: () => []
    },
    socialLinks: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapGetters(ModuleNames.Navigation, {
      isActive: NavigationGetterNames.HandheldNavIsActive
    })
  },

  methods: {
    ...mapMutations(ModuleNames.Navigation, {
      toggleActive: NavigationMutationNames.ToggleHandheldNavIsActive
    })
  }

}
</script>

<style lang="scss" scoped>
  
  .handheld-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .header {
    z-index: 1;
    @include row(between, center);
    padding: $space-5 $space-4;
    background: $page-background;
    @include shadow($elevation-lightest)
  }

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding-top: $space-9;
    padding-bottom: $space-6;
    background: $page-background;
  }

  .page-links {
    margin-bottom: $space-4;
    text-align: center;
  }

  .page-link {
    padding: $space-4;
  }

</style>
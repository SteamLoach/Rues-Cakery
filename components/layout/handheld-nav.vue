<template>
  <nav class="handheld-nav">
    <ul class="page-links">
      <li 
        v-for="link in pageLinks"
        :key="`${link.name}-page-link`"  >
        <nuxt-link :to="link.to">
          {{link.name}}
        </nuxt-link>
      </li>
    </ul>
    <ul class="social-links">
      <li 
        v-for="link in socialLinks"
        :key="`${link.name}-social-link`">
        <a :href="link.to" :title="link.name">
          <utils-svg-loader :content="{icon_name: link.icon_name}" />
        </a>
      </li>
    </ul>
  </nav>
</template>


<script>

import {mapMutations, mapGetters} from 'vuex'
import {MutationNames, GetterNames} from '@/store/keys'

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
    ...mapGetters({
      isActive: GetterNames.HandheldNavIsActive
    })
  },

  methods: {
    ...mapMutations({
      toggle: MutationNames.ToggleHandheldNavIsActive
    })
  }

}

</script>

<style lang="scss" scoped>

.handheld-nav {
  @include row(center, center, $direction: column);
  position: fixed;
  height: 100%;
  background: $page-background;
}

</style>
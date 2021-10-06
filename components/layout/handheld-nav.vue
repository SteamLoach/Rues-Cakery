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
        :key="`${link.name}-handheld-nav-social-link`">
        <a :href="link.to" :title="link.name">
          <utils-svg-loader :content="{icon_name: link.icon_name}" />
        </a>
      </li>
    </ul>
  </nav>
</template>


<script>

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

}

</script>

<style lang="scss" scoped>

.handheld-nav {
  z-index: 5;
  position: fixed;
  width: 100%;
  height: 100%;
  @include y-pad($space-8);
  background: $page-background;
}

.page-links {
  @include y-pad($space-6);
  margin-bottom: $space-4;
  li {
    padding: $space-2;
    margin-bottom: $space-4;
    font-size: $text-large;
    text-align: center;
  }
}

.social-links {
  text-align: center;
  svg {
    @include size(35px);
  }
}

</style>
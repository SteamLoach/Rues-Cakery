<template>
  <ul class="social-links">
    <li 
      v-for="link in links"
      :key="`${link.name}-primary-nav-social-link`">
      <a :href="link.to" :title="link.name">
        <utils-svg-loader :content="{icon_name: link.icon_name}" />
      </a>
    </li>
  </ul> 
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>

  .social-links {
    padding: $space-2 $space-3;
    text-align: center;
    @include media-from($tablet, text-align, right);
    svg {
      @include size(30px);
    }
  }

</style>
<template>
  <ul class="page-links">
    <li 
      v-for="link in links"
      :key="`${link.name}-page-link`"  >
      <nuxt-link 
        :to="link.to"
        :title="`Browse ${link.name}`">
        {{link.name}}
      </nuxt-link>
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

  .page-links {
    @include container(center, center, $space-4, $direction: column);
    @include container-from($tablet, center, center, $space-4);
    @include media-until($tablet, margin-bottom, $space-4);
    text-align: center;
    li {
      padding: $space-2 $space-3;
    }
  }

</style>
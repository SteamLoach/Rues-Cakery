<template>
  <div class="desktop-nav">
    <nuxt-link
      class="home-link" 
      :to="`/`">
      Rue's Cakery
    </nuxt-link>
    <ul class="page-links">
      <li 
        v-for="link in pageLinks"
        :key="`${link.name}-page-link`"
        class="page-link">
        <nuxt-link 
          :to="link.to"
          :title="`Browse ${link.name}`">
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
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>

  .desktop-nav {
    @include row(between, center);
    padding: $space-4 $space-6;
    font-size: $text-large;
    font-weight: 600;
    @include shadow($elevation-lightest);
  }

  .page-links {
    @include container(center, center);
  }

  .page-link {
    @include y-pad($space-2);
    @include pad-scale(
      x,
      $on-tablet: $space-4,
      $on-laptop: $space-6
    )
  }

</style>
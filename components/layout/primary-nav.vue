<template>
  <nav class="primary-nav">
    <nuxt-link :to="`/`">Rue's Cakery</nuxt-link>
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
    <layout-handheld-nav-toggle />
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
    }

  }
</script>

<style lang="scss" scoped>

  .primary-nav {
    @include row(between, center);
    padding: $space-4 $space-6;
    font-family: $title-font;
  }

  .page-links {
    @include wrapper(center, center, $space-4);
    li {
      padding: $space-2 $space-3;
    }
  }

  .social-links {
    svg {
      @include size(35px);
    }
  }

  .page-links,
  .social-links {
    @include hidden-until($tablet);
  }

</style>
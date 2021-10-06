<template>
  <footer class="site-footer">
    <ul class="social-links">
      <li v-for="link in socialLinks"
          :key="`${link.name}-footer-social-link`">
        <a :href="link.to" :title="link.name">
          <utils-svg-loader :content="{icon_name: link.icon_name}" />
        </a>        
      </li>
    </ul>
    <ul class="quick-links">
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <button
          title="scroll to top" 
          @click.prevent="scrollToTop">
          Top
        </button>
      </li>
    </ul>
    <ul class="attribution">
      <li>&copy; Ruhina Talati 2021</li>
      <li>Website by Tom Armstrong</li>
    </ul>
  </footer>
</template>

<script>
export default {
  props: {
    socialLinks: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    scrollToTop() {
      this.$toolkit.scrollPage({
        target: '#top',
        smooth: true,
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.site-footer {
  @include row(between, center);
  padding: $space-3 $space-4;
  @include font-size-scale(
    $default: $text-small,
    $on-laptop: $text-root,
  );
}

.social-links {
  svg {
    @include size(35px);
  }
}

.quick-links {
  @include wrapper(center, center);
  li {
    padding: $space-1 $space-2;
  }
  li:not(:last-child) {
    border-right: 1px solid $text-color;
  }
  button {
    padding: 0;
  }
}

.attribution {
  @include media-from($tablet, text-align, right);
}

</style>
<template>
  <footer class="site-footer">
    <div class="column">
      <ul class="social-links">
        <li v-for="link in socialLinks"
            :key="`${link.name}-footer-social-link`">
          <a :href="link.to" :title="link.name">
            <utils-svg-loader :content="{icon_name: link.icon_name}" />
          </a>        
        </li>
      </ul>
    </div>
    <div class="column">
      <ul class="quick-links">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <a
            title="scroll to top"
            href="#top"
            @click.prevent="scrollToTop">
            Top
          </a>
        </li>
      </ul>
    </div>
    <div class="column">
      <ul class="attribution">
        <li>&copy; Ruhina Talati 2021</li>
        <li>Website by Tom Armstrong</li>
      </ul>
    </div>
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
  padding: $space-6 $space-4;
  @include font-size-scale(
    $default: $text-small,
    $on-laptop: $text-root,
  );
  @include shadow($elevation-medium);
}

.column {
  @include container(center, center);
  @include column-scale(
    $default: 24,
    $on-tablet: 8,
  );
  &:not(:last-child) {
    @include media-until($tablet, margin-bottom, $space-4);
  }
  &:first-child {
    @include container-from($tablet, start, center);
  }
  &:last-child {
    @include container-from($tablet, end, center);
  }
}

.social-links {
  svg {
    @include size(30px);
  }
}

.quick-links {
  @include wrapper(center, center);
  li:not(:last-child) {
    border-right: 1px solid $text-color;
  }
  a {
    @include x-pad($space-2);
  }
}

.attribution {
  text-align: center;
  @include media-from($tablet, text-align, right);
}

</style>
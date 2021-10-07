<template>
  <nav class="primary-nav">
    <nuxt-link
      class="home-link" 
      :to="`/`">
      Rue's Cakery
    </nuxt-link>
    <div 
      class="link-wrapper"
      :class="{'is-active': handheldNavIsActive}">
      <ul class="page-links">
        <li 
          v-for="link in pageLinks"
          :key="`${link.name}-page-link`"  >
          <nuxt-link 
            :to="link.to"
            :title="`Browse ${link.name}`">
            {{link.name}}
          </nuxt-link>
        </li>
      </ul>
      <ul class="social-links">
        <li 
          v-for="link in socialLinks"
          :key="`${link.name}-primary-nav-social-link`">
          <a :href="link.to" :title="link.name">
            <utils-svg-loader :content="{icon_name: link.icon_name}" />
          </a>
        </li>
      </ul>
    </div>
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
      },
      handheldNavIsActive: {
        type: Boolean,
        required: true,
      }
    }

  }
</script>

<style lang="scss" scoped>

  .primary-nav {
    z-index: 10;
    @include row(between, center);
    position: sticky;
    top: 0;
    left: 0;
    @include x-pad($space-4);
    @include pad-scale(
      y,
      $default: $space-4,
      $on-tablet: $space-2,
    );
    font-size: $text-large;
    font-weight: 600;
    background: $page-background;
    @include shadow($elevation-lightest);
  }

  .home-link {
    z-index: 10;
  }

  .link-wrapper {
    @include position-until(
      $tablet,
      absolute,
      $top: 0,
      $left: -100%,
    );
    @include container(center, center, $space-6, $direction: column);
    @include container-from($tablet, around, center, $space-4);
    @include media-until($tablet, width, 100%);
    @include media-until($tablet, min-height, 100vh);
    @include pad-scale(
      y,
      $default: $space-8,
      $on-tablet: 0,
    );
    background: $page-background;
    @include transition(left);

    &.is-active {
      left: 0;
    }

  }

  .page-links {
    @include container(center, center, $space-4, $direction: column);
    @include container-from($tablet, center, center, $space-4);
    text-align: center;
    li {
      padding: $space-2 $space-3;
    }
  }

  .social-links {
    svg {
      @include size(30px);
    }
  }

</style>
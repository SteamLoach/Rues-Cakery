<template>
  <nav id="primary-nav" class="primary-nav">
    
    <div class="column">
      <nuxt-link
        class="home-link" 
        :to="`/`">
        Rue's Cakery
      </nuxt-link>
    </div>

    <!-- from tablet -->
    <div class="column from-tablet">
      <layout-utils-page-links :links="pageLinks" />
    </div>
    <div class="column from-tablet">
      <layout-utils-social-links :links="socialLinks" />
    </div>
    <layout-handheld-nav-toggle />
    
    <!-- handheld -->
    <slide-y-down-transition>
      <div
        v-if="handheldNavIsActive && isHandheldWindowWidth" 
        class="handheld-nav">
        <div class="inner">
          <layout-utils-page-links :links="pageLinks" />
          <layout-utils-social-links :links="socialLinks" />
        </div>
      </div>
    </slide-y-down-transition>
  
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
    },
    isHandheldWindowWidth: {
      type: Boolean,
      required: true,
    }
  },

}
</script>

<style lang="scss" scoped>

  .primary-nav {
    z-index: 1;
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

  .column {
    z-index: 10;
    flex: 1;
    &.from-tablet {
      @include hidden-until($tablet);
    }
  }

  .handheld-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding-top: $space-8;
    background: $page-background;
    .inner {
      overflow-y: auto;
      width: 100%;
      max-height: 100%;
      @include y-pad($space-4);
      border-top: 1px solid $shade-light;
    }
  }

  .link-wrapper {
    @include position-until(
      $tablet,
      absolute,
      $top: 0,
      $left: -100%,
    );
    @include container(center, center, $space-6, $direction: column);
    @include container-from($tablet, between, center, $space-4);
    @include column-scale(
      $default: 24,
      $on-tablet: 16,
    );
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
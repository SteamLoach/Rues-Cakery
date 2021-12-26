<template>
  <section class="content-panel">
    <div class="inner">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-panel {
    @include row(center, center);
    @include pad-scale(
      x,
      $default: $space-2,
      $on-tablet: $space-4,
      $on-laptop: $space-6, 
    );
    @include margin-scale(
      bottom,
      $default: $space-8,
      $on-laptop: $space-10,
    );
    &.y-pad-medium {
      @include pad-scale(
        y,
        $default: $space-6,
        $on-tablet: $space-8
      );
    }
    &.wide-content {
      .inner {
        max-width: $wide-width;
      }
    }
    &.extra-wide-content {
      .inner {
        max-width: $extra-wide-width;
      }
    }
    &.background-brand-lightest {
      background: $brand-lightest
    }
  }
  .inner {
    width: 100%;
  }
</style>
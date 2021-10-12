<template>
  <div class="form-field">
    <slot />
    <p class="feedback">
      {{errorMessage}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    hint: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-field {
    width: 100%;
    margin-bottom: $space-1;
    
    &.half-width {
      @include column-scale(
        $default: 24,
        $on-tablet: 12,
      );
    }

    .feedback {
      min-height: 25px;
      font-size: $text-smaller;
      color: $danger-dark;
    }

  }
</style>
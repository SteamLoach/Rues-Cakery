<template>
  <div class="form-field">
    <slot />
    <slide-x-left-transition mode="out-in">
      <p 
        :key="currentError"
        class="feedback">
        {{currentError}}
      </p>      
    </slide-x-left-transition>

  </div>
</template>

<script>

export default {

  props: {
    hint: {
      type: String,
      default: '',
    },
    fieldErrors: {
      type: Array,
      default: () => [],
    }
  },

  computed: {
    currentError() {
      return this.fieldErrors[0]
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
      min-height: 30px;
      padding: 1px;
      font-size: $text-smallest;
      font-weight: 600;
      color: $danger-dark;
    }

  }
</style>
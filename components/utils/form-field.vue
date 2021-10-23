<template>
  <div 
    class="form-field"
    :class="content.class_extensions">
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
    content: {
      type: Object,
      default: () => ({}),
    },
    fieldErrors: {
      type: Array,
      default: () => []
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
    @include x-pad($space-2);
    
    &.is-half-width {
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
<template>
  <div 
    class="form-field"
    :class="content.class_extensions">
    <slot />
    <slide-x-left-transition mode="out-in">
      <p 
        v-if="showFeedback"
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
    showFeedback: {
      type: Boolean,
      default: true,
    }
  },

  computed: {
    currentError() {
      return this.content.fieldErrors ? this.content.fieldErrors[0] : ''
    }
  }

}
</script>

<style lang="scss">

  .form-field {
    width: 100%;
    margin-bottom: $space-1;
    
    &.is-half-width {
      @include column-scale(
        $default: 24,
        $on-tablet: 12,
      );
      @media screen and (min-width: $tablet) {
        &:nth-child(odd) {
          padding-right: $space-2;
        }
        &:nth-child(even) {
          padding-left: $space-2;
        }
      }
    }

    .feedback {
      min-height: 30px;
      padding: 1px;
      font-size: $text-smallest;
      font-weight: 600;
      color: $danger-dark;
    }

    &__label {
      width: 100%;
      font-weight: 600;
      color: $title-color;
      sup {
        position: relative;
        top: 2px;
        font-size: 10px;
        font-style: italic;
      }
    }

    &__input,
    &__select,
    &__textarea {
      width: 100%;
      max-width: 100%;
      padding: $space-1 $space-2;
      border: $input-border;
      &.has-field-errors {
        border: $input-with-error-border;
      }
      &:placeholder-shown {
        font-style: italic;
      }
    }


  }
</style>
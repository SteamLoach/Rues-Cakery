<template>
  <component
    :is="tag"
    class="ui-button"
    :href="href"
    :to="href"
    :disabled="disabled"
    @click.prevent="onClick">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
      validator(val) {
        return ['button', 'a', 'nuxt-link'].includes(val)
      }
    },
    href: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>

  .ui-button {
    padding: $space-2 $space-4;
    text-align: center;
    font-weight: 600;
    color: $title-color;
    border: 1px solid $title-color;
    @include transition(all, .2s);

    &.is-wide {
      padding: $space-2 $space-6;
    }

    &.is-full-width {
      width: 100%;
    }

    &.is-filled,
    &.has-hover-state:hover {
      &:not(:disabled) {
        color: $page-background;
        background: $title-color;
        &.primary {
          border-color: $brand-darker;
          background: $brand-darker;
        }
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: $shade-dark;
      border-color: $shade-lighter;
      background: $shade-lighter;
    }

  }

</style>
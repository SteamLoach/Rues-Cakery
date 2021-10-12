<template>
  <component
    :is="tag"
    class="ui-button"
    :href="href"
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
        return ['button', 'a'].includes(val)
      }
    },
    href: {
      type: String,
      default: '',
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
      color: $page-background;
      background: $title-color;
      &.primary {
        border-color: $brand-darker;
        background: $brand-darker;
      }
    }

    &:hover {
      cursor: pointer;
    }

  }

</style>
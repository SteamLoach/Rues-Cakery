<template>
  <div class="flex-row">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<template>
  <section 
    class="content-panel"
    :class="[
      content.background_color,
    ]">
    <storyblok-layout-flex-row 
      :max-width="content.content_width">
    </storyblok-layout-flex-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      content: {
        title: '',
        body: [],
        content_width: '',
        background_color: '',
      }
    }
  }
}
</script>

<style lang="scss" scoped>



</style>
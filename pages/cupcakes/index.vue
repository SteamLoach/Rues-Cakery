<template>
  <products-product-page
    :content="story.content">
  </products-product-page>
</template>

<script>

import {mixinStoryblokBridge} from '~/mixins/mixin-storyblok-bridge'

export default {

  mixins: [mixinStoryblokBridge],
  
  data() {
    return {}
  }

}

</script>

<style lang="scss" scoped>

</style>
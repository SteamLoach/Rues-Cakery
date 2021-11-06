<template>
  <div class="page-wrapper">
    <!-- Product Header -->
    <component
      :is="item.component"
      v-for="item in story.content.product_header"
      :key="item._uid" 
      :content="item"
      :base-price="story.content.enquiry_form[0].base_price"
      v-editable="item">
    </component>
    <main>
      <!-- Enquiry Form -->
      <component
        :is="item.component"
        v-for="item in story.content.enquiry_form"
        :key="item._uid" 
        :content="item"
        v-editable="item">
      </component>
    </main> 
  </div>
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
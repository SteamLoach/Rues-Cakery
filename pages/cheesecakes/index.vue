<template>
  <div class="page-wrapper">
    <product-header></product-header>
    <main>
      <enquiry-form></enquiry-form>
    </main> 
  </div>
</template>

<script>

import {mixinStoryblokBridge} from '@/mixins/mixinStoryblokBridge'

export default {

  mixins: [mixinStoryblokBridge],
  
  data() {
    return {
      
    }
  }

}

</script>

<style lang="scss" scoped>

</style>
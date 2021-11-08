<template>
  <div class="page-wrapper">
    <header>
      <h1> {{story.content.title}} </h1>
    </header>
    <main>
      <section class="content-panel">
        <div class="product-preview-cards">
          <products-product-preview-card
            v-for="product in products"
            :key="product._uid"
            :content="product">
          </products-product-preview-card>
        </div>
      </section>
    </main>
  </div>
</template>

<script>

import {mixinStoryblokBridge} from '@/mixins/mixin-storyblok-bridge'

export default {
  mixins: [mixinStoryblokBridge],
  computed: {
    products() {
      return this.stories.map(story => story.content);
    }
  }
}

</script>

<style lang="scss" scoped>

  .product-preview-cards {
    @include row(center, center);
    max-width: $wide-width;
  }

</style>
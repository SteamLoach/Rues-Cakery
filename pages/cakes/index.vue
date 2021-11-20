<template>
  <div class="page-wrapper">
    <header>
      <h1> {{story.content.title}} </h1>
    </header>
    <main>
      <section class="content-panel">
        <div class="product-preview-cards">
          <products-product-preview-card
            v-for="product in stories"
            :key="product._uid"
            :product="product">
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
}

</script>

<style lang="scss" scoped>

  h1 {
    margin-bottom: $space-6;
  }

  .product-preview-cards {
    @include row(center, center);
    max-width: $extra-wide-width;
  }

</style>
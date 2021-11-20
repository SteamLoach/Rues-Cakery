<template>
  <div class="preview-card">
    <img 
      :src="featureImage"
      class="feature-image"
    >
    <h2> {{previewDetails.product_title}} </h2>
    <rich-text
      class="description small-copy-size"
      :content="previewDetails.product_description">
    </rich-text>
    <hr>
    <p class="base-price">
      <sup class="from">from </sup>
      <sup class="currency">$ </sup>
      <span class="price">
        {{previewDetails.base_price}} 
      </span>
    </p>
    <div class="product-page-link">
      <ui-button 
        tag="nuxt-link"
        class="is-full-width has-hover-state"
        :href="product.full_slug">
        Customise
      </ui-button>
    </div>
  </div>
</template>

<script>

import uiButton from '../storyblok/utils/ui-button.vue'

export default {
  components: { uiButton },

  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  computed: {
    previewDetails() {
      return this.product.content.product_header[0]
    },
    featureImage() {
      if(this.previewDetails.product_images[0]) {
        return this.previewDetails.product_images[0].filename
      }
      return ''
    }
  }
}

</script>

<style lang="scss" scoped>

  .preview-card {
    width: 325px;
    @include margin-scale(
      x,
      $default: $space-2,
      $on-tablet: $space-4,
      $on-laptop: $space-5
    );
    margin-bottom: $space-6;
    @include shadow($elevation-lighter);
  }

  h2,
  .feature-image {
    margin-bottom: $space-3;
  }

  .feature-image {
    height: 225px;
    width: 100%;
    object-fit: cover;
  }

  h2,
  .description,
  .base-price {
    @include x-pad($space-4);
  }

  .description {
    margin-bottom: $space-4;
  }

  hr {
    @include x-margin($space-6);
    margin-bottom: $space-3;
  }

  .base-price {
    text-align: right;
    .from {
      position: relative;
      top: -5px;
    }
    .currency,
    .price {
      font-weight: 600;
    }
    .currency {
      font-size: $text-large;
      font-weight: 600;
    }
    .price {
      font-size: $text-largest;
    }
  }

  .product-page-link {
    padding: $space-4;
  }

</style>
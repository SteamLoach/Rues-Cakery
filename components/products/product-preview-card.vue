<template>
  <div class="column">
    <div class="preview-card">
      <img :src="featureImage">
      <h2> {{previewDetails.product_title}} </h2>
      <rich-text
        class="description small-copy-size"
        :content="previewDetails.product_description">
      </rich-text>
      <p class="base-price">
        <sup class="from">from </sup>
        <sup class="currency">$ </sup>
        <span class="price">
          {{previewDetails.base_price}} 
        </span>
      </p>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    content: {
      type: Object,
      required: true,
    }
  },
  computed: {
    previewDetails() {
      return this.content.product_header[0]
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

  .column {
    @include column-scale(
      $default: 24,
      $on-lrg-mobile: 20,
      $on-phablet: 18,
      $on-tablet: 8,
    );
    @include pad-scale(
      x,
      $default: $space-2,
      $on-tablet: $space-6
    );
  }

  .preview-card {
    @include shadow($elevation-lighter);
  }

  img,
  h2,
  .description {
    margin-bottom: $space-2;
  }

  img {
    object-fit: cover;
    max-height: 175px;
  }

  h2,
  .description,
  .base-price {
    @include x-pad($space-2);
  }

  .base-price {
    padding: $space-2;
    text-align: right;
    border-top: 1px solid $shade-base;
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

</style>
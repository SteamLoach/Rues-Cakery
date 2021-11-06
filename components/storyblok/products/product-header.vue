<template>
  <header class="product-header">
    <img 
      :src="content.product_images[0].filename"
      class="feature-image">
    <div class="copy">
      <h1>{{content.product_title}}</h1>
      <rich-text
        class="product-description"
        :content="content.product_description">
      </rich-text>
      <rich-text
        class="service-disclaimer"
        :content="serviceDisclaimer">
      </rich-text>
      <div class="base-price">
        <sup class="from">from</sup>
        <sup class="currency">$</sup>
        <span class="price">{{basePrice}}</span>
      </div>
      <div class="customise-link">
        <storyblok-utils-ui-button
          class="is-full-width has-hover-state"
          tag="a"
          href="#price-calculator"
          @onClick="scrollToOptions">
          <span>Customise</span>
        </storyblok-utils-ui-button>
      </div>
    </div>
  </header>
</template>

<script>

import {mapGetters} from 'vuex'
import {ModuleNames} from '@/constants/store'
import {GetterNames as SettingsGetterNames} from '@/store/keys/settings-keys'

export default {

  props: {
    content: {
      type: Object,
      default: () => {}
    },
    basePrice: {
      type: [String, Number],
      required: true,
    }
  },

  data() {
    return {}
  },

  computed: {
    ...mapGetters(ModuleNames.Settings, {
      serviceDisclaimer: SettingsGetterNames.ServiceDisclaimer
    })
  },

  methods: {
    scrollToOptions() {
      this.$toolkit.scrollPage({
        target: '#price-calculator',
        offset: '#primary-nav',
        smooth: true,
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .product-header {
    @include row(center, stretch);
    max-width: $extra-wide-width;
    margin-bottom: $space-8;

  .feature-image {
    object-fit: cover;
    @include media-until($tablet, margin-bottom, $space-6);
  }

  .feature-image,
  .copy {
    height: 100%;
    @include column-scale(
      $default: 24,
      $on-tablet: 12, 
    );
  }

  .copy {
    @include pad-scale(
      top,
      $on-tablet: $space-6,
      $on-laptop: $space-8
    );
    @include pad-scale(
      x,
      $default: $space-4,
      $on-tablet: $space-6,
      $on-laptop: $space-8, 
    );
  }

  h1 {
    margin-bottom: $space-4;
    @include font-size-scale(
      $default: $title-large,
      $on-tablet: 3.5rem,
    );
  }

  .product-description {
    margin-bottom: $space-4;
  }

  .service-disclaimer {
    padding: $space-3;
    margin-bottom: $space-6;
    border: 1px dashed $warning-base;
    background: $warning-lightest;
  }

  p {
    margin-bottom: $space-2;
    &:last-of-type {
      margin-bottom: $space-8;
    }
  }

  .base-price {
    @include container(end, start);
    margin-bottom: $space-6;
    font-family: $title-font;
    color: $title-color;
    font-weight: 700;
    .from {
      margin-top: $space-1;
      margin-right: $space-2;
      font-weight: 600;
    }
    .currency {
      font-size: $title-larger;
    }
    .price {
      font-size: 5rem;
    }
  }

  }

</style>
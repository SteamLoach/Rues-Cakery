<template>
  <header class="product-header">
    <img 
      :src="content.product_images[0].src"
      class="feature-image">
    <div class="description">
      <h1>{{content.product_title}}</h1>
      <p>{{content.product_description}}</p>
      <p>Not nut, gluten, or dairy free unless explicitly stated. Please contact for any special requests.</p>
      <p>Please note that a minimum of 7 days notice is required. Availability is not gauranteed.</p>
      <div class="base-price">
        <sup class="from">from</sup>
        <sup class="currency">$</sup>
        <span class="price">{{content.product_details.base_price}}</span>
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
export default {
  /*
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  */
  data() {
    return {
      content: {
        product_title: 'Cheesecake',
        product_description: 'Cillum tempor magna duis dolor sit reprehenderit dolore enim ex cillum quis tempor elit aute. In culpa pariatur velit incididunt mollit. Labore non incididunt nulla irure ex tempor sint voluptate duis esse.',
        product_images: [
          {
            src: "/placeholder-images/cheesecake-placeholder-portrait.jpg"
          }
        ],
        product_details: {
          base_price: 50,
          customization_options: [
            [
              {
                label: 'Size',
                options: [
                  {
                    description: '12" (serves 6)',
                    price_modifier: 0,
                    default: true,
                  },
                  {
                    description: '14" (serves 8)',
                    price_modifier: 15,
                    default: false,
                  },
                  {
                    description: '16" (serves 10)',
                    price_modifier: 20,
                    default: false,
                  }
                ]
              }
            ]
          ]
        }
      }
    }
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
  .description {
    height: 100%;
    @include column-scale(
      $default: 24,
      $on-tablet: 12, 
    );
  }

  .description {
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
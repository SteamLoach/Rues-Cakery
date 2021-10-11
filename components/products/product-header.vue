<template>
  <header class="product-header">
    <div class="images">
      <img :src="content.product_images[0].src">
    </div>
    <div class="description">
      <h1>{{content.product_title}}</h1>
      <p>{{content.product_description}}</p>
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
          base_price: 40,
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
  }
}
</script>

<style lang="scss" scoped>

  .product-header {
    @include row(center, center);
    max-width: $extra-wide-width;
    @include height-scale(
      $on-tablet: 650px,
      $on-laptop: 850px,
    );

  .images,
  .description {
    height: 100%;
    @include column-scale(
      $default: 24,
      $on-tablet: 12, 
    );
  }

  }

</style>
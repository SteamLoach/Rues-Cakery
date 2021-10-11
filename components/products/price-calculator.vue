<template>
  <section class="price-calculator">
    <form class="inner">
      <div class="options">
        <storyblok-forms-form-field
          v-for="(field, index) in product_details.customization_options"
          :key="index">
          <component 
            :is="'form-field-select'"
            :content="field"
            :value="getFieldValue(field)"
            @updateValue="updatePriceMatrix">
          </component>
        </storyblok-forms-form-field>
      </div>
      <div class="pricing">

      </div>
    </form>
  </section>
</template>

<script>
export default {
  /*
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  }
  */
  data() {
    return {
      priceMatrix: {},
      product_details: {
        base_price: 40,
        customization_options: [
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
            },
            {
              label: 'Flavour',
              options: [
                {
                  description: 'Vanilla',
                  price_modifier: 2,
                  default: true,
                },
                {
                  description: 'Chocolate',
                  price_modifier: 3,
                  default: false,
                },
                {
                  description: 'Lemon',
                  price_modifier: 5,
                  default: false,
                }
              ]
            }
        ]
      }      
    }
 },
 computed: {
   totalPrice() {
     let addons = 0;
     Object.keys(this.priceMatrix.modifiers).forEach(key => {
       addons += parseFloat(this.priceMatrix.modifiers[key]);
     })
     return this.priceMatrix.basePrice + addons
   }
 },
 created() {
   this.priceMatrix = this.buildPriceMatrix();
 },
 methods: {
   buildPriceMatrix() {
     const matrix = {
       basePrice: this.product_details.base_price,
       modifiers: {

       }
     };
     this.product_details.customization_options.forEach(field => {
        matrix.modifiers[`${this.$toolkit.camelCase(field.label)}`] = field.options.find(option => option.default).price_modifier
     })
     return matrix
   },
   updatePriceMatrix(payload) {
     this.priceMatrix.modifiers[payload.prop] = payload.value
   },
   getFieldValue(field) {
     return this.priceMatrix.modifiers[`${this.$toolkit.camelCase(field.label)}`]
   }
 }
}
</script>

<style lang="scss" scoped>

  .price-calculator {
    background-color: $accent-lighter;

    .inner {
      max-width: $wide-width;
    }
  }

</style>
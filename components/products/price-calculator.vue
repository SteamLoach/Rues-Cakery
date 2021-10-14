<template>
  <section id="price-calculator" class="price-calculator content-panel">
    <form class="inner">
      <div class="options">
        <h2>Options</h2>
        <component 
          :is="'form-field-select'"
          v-for="field in product_details.customization_options"
          :key="`${field.label}-field`"
          v-model="$v.form[$toolkit.camelCase(field.label)].$model"
          :content="field">
        </component>
        <storyblok-forms-form-field-textarea 
          v-if="product_details.text_option"
          v-model="$v.form[$toolkit.camelCase(product_details.text_option.label)].$model"
          :label="product_details.text_option.label"
          :placeholder="product_details.text_option.placeholder">
        </storyblok-forms-form-field-textarea>
      </div>
      <div class="pricing">
        <div class="modifiers">
          <h2>Pricing</h2>
          <ul>
            <li>
              <b>Base Price:</b>
              <span>${{basePrice}}</span>
            </li>
            <template v-for="item in priceMap">
              <slide-x-right-transition 
                :key="item.label"
                mode="out-in">
                <li :key="item.value">
                  <div>
                    <b>{{item.label}}: </b><i>{{item.value}}</i>
                  </div>
                  <div>
                    {{item.priceModifierText}}
                  </div>
                </li>
              </slide-x-right-transition>
            </template>
          </ul>
        </div>
        <div class="estimate">
          <p class="disclaimer">
            {{product_details.price_disclaimer}}
          </p>
          <p class="total">
            <b>Estimate:</b>
            <slide-y-down-transition mode="out-in">
              <span :key="totalPrice"><sup>$</sup>{{totalPrice}}</span>
            </slide-y-down-transition>
          </p>
        </div>
      </div>
      <div class="send">
        <storyblok-utils-ui-button
          class="is-wide has-hover-state">
          <span>Send Enquiry</span>
        </storyblok-utils-ui-button>
      </div>
    </form>
  </section>
</template>

<script>

import {mixinFormHandler} from '@/mixins/mixinFormHandler'

import {CAKE_OPTIONS} from '@/placeholder-data/cake-options'

export default {
  
  mixins: [mixinFormHandler],
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
      logRef: '<price-calculator>',
      mixinFormHandler: {
        formFields: []
      },
      basePrice: null,
      form: {},
      product_details: {
        base_price: 50,
        price_disclaimer: "All prices are estimates only and are subject to change depending on exact requirements.",
        customization_options: CAKE_OPTIONS,
        text_option: {
          label: 'Add a message',
          price_modifier: 3,
          placeholder: "Enter your message (optional)",
          validations: [
            {
              validation: 'maxLength',
              params: 150,
              message: 'Max 150 characters'
            }
          ]
        }
      }      
    }
 },
 computed: {
   priceMap() {
    const priceMap = [];
    const customizationOptions = this.product_details.customization_options;
    customizationOptions.forEach(field => {
      const formValue = this.form[this.$toolkit.camelCase(field.label)]
      const priceModifier = field.options.find(option => option.label === formValue).price_modifier; 
      priceMap.push({
        label: field.label,
        value: formValue,
        priceModifierText: priceModifier ? `+ $${priceModifier}` : '-',
        priceModifier,
      })
    })
    if(this.product_details.text_option) {
      const textOption = this.product_details.text_option;
      const formValue = this.form[this.$toolkit.camelCase(textOption.label)]
      const priceModifier = textOption.price_modifier
      priceMap.push({
        label: textOption.label,
        value: formValue ? 'Yes' : '',
        priceModifierText: formValue ? `+ $${priceModifier}` : '-', 
        priceModifier: formValue ? priceModifier : 0,
      })
    }
    return priceMap;
   },
   totalPrice() {
     let modifiers = 0;
     this.priceMap.forEach(item => {modifiers += item.priceModifier});
     return (this.basePrice + modifiers).toFixed(2);
   },
 },
 created() {
   this.buildProductOptionsForm();
 },
 methods: {
   buildProductOptionsForm() {
     const productDetails = this.product_details
     this.basePrice = productDetails.base_price;
     this.mixinFormHandler.formFields = [
       ...productDetails.customization_options
     ]
     productDetails.customization_options.forEach(field => {
       const camelCasedKey = this.$toolkit.camelCase(field.label)
       const defaultOption = field.options.find(option => option.default) || field.options[0];
       this.$set(this.form, camelCasedKey, defaultOption.label)
       this.form[camelCasedKey] = defaultOption.label
     });
     if(productDetails.text_option) {
       this.mixinFormHandler.formFields.push(productDetails.text_option);
       this.$set(
         this.form,
         this.$toolkit.camelCase(productDetails.text_option.label),
         '',
        );
     }
   },
  }
}
</script>

<style lang="scss" scoped>

  .price-calculator {
    padding: $space-8 $space-4;

    .inner {
      @include row(center, stretch);
      max-width: $wide-width;
      @include y-pad($space-6);
      @include pad-scale(
        x,
        $default: $space-2,
        $on-phablet: $space-5,
      );
      border: 1px solid $title-color;
      @include shadow($elevation-light);
    }

    h2 {
      margin-bottom: $space-3;
    }

    .options,
    .pricing {
      @include pad-scale(
        x,
        $default: $space-2,
        $on-tablet: $space-4,
        $on-laptop: $space-5
      );
      @include column-scale(
        $default: 24,
        $on-tablet: 12,
      );
    }

    .pricing {
      @include wrapper(center, center, $yc: between);
      font-family: $title-font;
      color: $title-color;
      @include border-from($tablet, left, 1px solid $title-color);
      .modifiers {
        width: 100%;
      }
      ul {
        margin-bottom: $space-4;
      }
      li {
        @include row(between, center, $no-wrap: true);
        margin-bottom: $space-1;
      }
      li:first-child {
        margin-bottom: $space-2;
        font-size: $text-large;
      }
    }

    .estimate {
      font-family: $title-font;
      color: $title-color;
      .disclaimer {
        padding-top: $space-4;
        font-size: $text-small;
      }
      .total {
        @include row(between, start, $space-4, $no-wrap: true);
        padding-top: $space-3;
        margin-top: $space-3;
        border-top: 1px dashed $title-color; 
        text-align: right;

        span {
          font-size: $title-large;
          @include media-from($phablet, font-size, $title-larger);
        }
        sup, b {
          font-size: $title-small;
          @include media-from($phablet, font-size, $title-large);
        }
        sup {
          position: relative;
          top: -$space-2;
        }
      }
    }

    .send {
      @include row(center, center);
      margin-top: $space-6;
    }

  }

</style>
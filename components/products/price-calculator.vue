<template>
  <section id="price-calculator" class="price-calculator content-panel">
    <form class="inner">
      <div class="options">
        <h2>Options</h2>
        <component 
          :is="'form-field-select'"
          v-for="field in product_details.customization_options"
          :key="`${field.label}-field`"
          :content="field"
          :value="getFieldValue(field)"
          @updateValue="updatePriceMatrix">
        </component>
        <storyblok-forms-form-field-textarea 
          v-if="product_details.text_option"
          label="Add A Message"
          @updateValue="updateTextOption">
        </storyblok-forms-form-field-textarea>
      </div>
      <div class="pricing">
        <div>
          <h2>Pricing</h2>
          <ul>
            <li>
              <b>Base Price:</b>
              <span>${{priceMatrix.basePrice}}</span>
            </li>
            <li 
              v-for="modifier in priceMatrix.modifierKeys"
              :key="modifier.key">
              <span>
                <b>{{modifier.label}}: </b>
                <i>{{getModifierOptionLabel(modifier.key)}}</i>
              </span>
              <span>{{getModifierOptionValue(modifier.key)}}</span>
            </li>
            <li 
              v-if="priceMatrix.textOption"
              :key="textOptionPrice">
              <b>{{priceMatrix.textOption.label}}:</b>
              <span>{{textOptionPrice}}</span>              
            </li>
          </ul>
          <p>{{product_details.price_disclaimer}}</p>
        </div>
        <div class="total-price">
          <b>Estimate:</b>
          <slide-y-down-transition mode="out-in">
            <span :key="totalPrice"><sup>$</sup>{{totalPrice}}</span>
          </slide-y-down-transition>
        </div>
      </div>
      <div class="send">
        <storyblok-utils-ui-button
          class="primary is-wide has-hover-state">
          <span>Send Enquiry</span>
        </storyblok-utils-ui-button>
      </div>
    </form>
  </section>
</template>

<script>

import {CAKE_OPTIONS} from '@/placeholder-data/cake-options'

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
        price_disclaimer: "All prices are estimates only and are subject to change depending on exact requirements.",
        customization_options: CAKE_OPTIONS,
        text_option: {
          label: 'Add a message',
          price_modifier: 3,
          placeholder: "Enter your message"
        }
      }      
    }
 },
 computed: {
   totalPrice() {
     let addons = 0;
     const textOption = this.priceMatrix.textOption
     if(textOption && textOption.value) {
       addons += textOption.price_modifier
     }
     Object.keys(this.priceMatrix.modifiers).forEach(key => {
       addons += parseFloat(this.priceMatrix.modifiers[key].value);
     })
     return (this.priceMatrix.basePrice + addons).toFixed(2);
   },
   textOptionPrice() {
     return this.priceMatrix.textOption.value ? `+ $${this.priceMatrix.textOption.price_modifier}` : '-'
   },
 },
 created() {
   this.priceMatrix = this.buildPriceMatrix();
 },
 methods: {
   buildPriceMatrix() {
     const matrix = {
       basePrice: this.product_details.base_price,
       modifiers: {},
       modifierKeys: [],
     };
     this.product_details.customization_options.forEach(field => {
        const camelCasedKey = this.$toolkit.camelCase(field.label);
        const def = field.options.find(option => option.default) || field.options[0]; 
        matrix.modifiers[camelCasedKey] = {
          label: def.label,
          value: def.price_modifier
        };
        matrix.modifierKeys.push({
          key: camelCasedKey,
          label: field.label, 
        });
     })
     if(this.product_details.text_option) {
       matrix.textOption = {
         ...this.product_details.text_option,
         value: ''};
     }
     return matrix
   },
   getModifierOptionValue(key) {
     const value = this.priceMatrix.modifiers[key].value
     return value ? `+ $${value}` : '-';
   },
   getModifierOptionLabel(key) {
     return this.priceMatrix.modifiers[key].label
   },
   updatePriceMatrix(payload) {
     this.priceMatrix.modifiers[payload.prop].value = parseFloat(payload.value);
     this.priceMatrix.modifiers[payload.prop].label = payload.label;
   },
   updateTextOption(payload) {
     this.priceMatrix.textOption.value = payload.value
   },
   getFieldValue(field) {
     return this.priceMatrix.modifiers[`${this.$toolkit.camelCase(field.label)}`].value
   },
 }
}
</script>

<style lang="scss" scoped>

  .price-calculator {
    padding: $space-8 $space-4;

    .inner {
      @include row(center, stretch);
      max-width: $medium-width;
      @include y-pad($space-6);
      @include pad-scale(
        x,
        $default: $space-2,
        $on-phablet: $space-5,
      );
      background-color: $brand-lightest;
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

    .total-price {
      @include row(between, start, $space-4, $no-wrap: true);
      padding-top: $space-3;
      margin-top: $space-3;
      text-align: right;
      font-family: $title-font;
      color: $title-color;
      border-top: 1px dashed $title-color;
      span {
        @include media-from($phablet, min-width, 150px);
        font-size: $title-large;
        @include media-from($phablet, font-size, $title-larger);
      }
      sup, b {
        font-size: $title-medium;
        @include media-from($phablet, font-size, $title-large);
      }
      sup {
        position: relative;
        top: -$space-2;
      }
    }

    .send {
      @include row(center, center);
      margin-top: $space-6;
    }

  }

</style>
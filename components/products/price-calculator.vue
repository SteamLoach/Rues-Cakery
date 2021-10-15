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
          :content="field"
          :field-errors="mixinFormHandler_fieldErrors[$toolkit.camelCase(field.label)]">
        </component>
        <storyblok-forms-form-field-textarea 
          v-if="product_details.text_option"
          v-model="$v.form[$toolkit.camelCase(product_details.text_option.label)].$model"
          :content="product_details.text_option"
          :field-errors="mixinFormHandler_fieldErrors[$toolkit.camelCase(product_details.text_option.label)]">
        </storyblok-forms-form-field-textarea>
        <storyblok-forms-form-field-date-picker 
          v-model="$v.form[$toolkit.camelCase(product_details.delivery_date.label)].$model"
          :content="product_details.delivery_date"
          :min-date="earliestAvailableDate"
          :disabled-dates="disabledDates"
          :is-expanded="true"
          :button-text="product_details.delivery_date.label"
          :field-errors="mixinFormHandler_fieldErrors[$toolkit.camelCase(product_details.delivery_date.label)]">
        </storyblok-forms-form-field-date-picker>
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
      <div class="order-notes">
        <storyblok-forms-form-field-textarea
          v-model="$v.form[$toolkit.camelCase(product_details.order_notes.label)].$model"
          :content="product_details.order_notes"
          :field-errors="mixinFormHandler_fieldErrors[$toolkit.camelCase(product_details.order_notes.label)]">
        </storyblok-forms-form-field-textarea>
      </div>
      <div class="send">
        <storyblok-utils-ui-button
          class="is-wide has-hover-state"
          :disabled="!mixinFormHandler_canSubmit">
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
          label: 'Add writing',
          rows: 3,
          price_modifier: 3,
          placeholder: "Add writing (optional)",
          validations: [
            {
              validation: 'maxLength',
              params: 50,
              message: 'Max 150 characters'
            }
          ]
        },
        delivery_date: {
          label: 'Pickup date',
          validations: [
            {
              validation: 'required',
              message: 'Please enter a pickup date. This can be changed later if needed'
            }
          ],
        },
        order_notes: {
          label: 'Order notes',
          rows: 5,
          placeholder: 'Please add any other information that might be useful',
          validations: [
            {
              validation: 'maxLength',
              params: 300,
              message: 'Max 300 characters'
            }
          ]
        }
      }      
    }
 },
 computed: {
   disabledDates() {
     return [
       {
         start: new Date("2021-11-10 00:00"),
         end: new Date("2021-11-20 00:00")
       },
       {
         start: new Date("2021-12-22 00:00"),
         end: new Date("2021-12-26 00:00")
       }
     ]
   },
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
    const dateOption = this.product_details.delivery_date;
    const dateOptionFormValue = this.form[this.$toolkit.camelCase(dateOption.label)];
    priceMap.push({
      label: dateOption.label,
      value: dateOptionFormValue ? this.$dayjs(dateOptionFormValue).format('ddd DD MMMM YYYY') : '',
      priceModifierText: '',
      priceModifier: 0,
    })
    return priceMap;
   },
   totalPrice() {
     let modifiers = 0;
     this.priceMap.forEach(item => {modifiers += item.priceModifier});
     return (this.basePrice + modifiers).toFixed(2);
   },
   earliestAvailableDate() {
     const date = new Date();
     return date.setDate(date.getDate() + 7);
   },
   serializedFormData() {
     const serializedPairs = [];
     Object.keys(this.form).forEach(key => {
       serializedPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(this.form[key])}`)
     })
     const serializedData = serializedPairs.join('&').replace(/%20/g, '+')
     return `form-name=enquiryForm&${serializedData}`
   }
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
       this.setAdditionalFields('text_option');
     }
     this.setAdditionalFields('delivery_date');
     this.setAdditionalFields('order_notes');
   },
    setAdditionalFields(prop, val = '') {
    this.mixinFormHandler.formFields.push(this.product_details[prop]);
      this.$set(
        this.form,
        this.$toolkit.camelCase(this.product_details[prop].label),
        val
      );
    }
  },
}
</script>

<style lang="scss" scoped>

  .price-calculator {
    padding: $space-8 $space-4;
    background: $brand-lightest;

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
      background: $page-background;
      @include shadow($elevation-light);
    }

    h2 {
      margin-bottom: $space-3;
    }

    .options,
    .pricing {
      @include column-scale(
        $default: 24,
        $on-tablet: 12,
      );
      @include pad-scale(
        x,
        $default: $space-2,
        $on-tablet: $space-4,
        $on-laptop: $space-5
      );
    }

    .options {
      @media screen and (max-width: $tablet) {
        padding-bottom: $space-4;
        margin-bottom: $space-6;
        border-bottom: 1px solid $title-color;
      }
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

    .order-notes {
      width: 100%;
      padding-top: $space-6;
      margin-top: $space-7;
      margin-bottom: $space-4;
      @include margin-scale(
        x,
        $default: $space-2,
        $on-tablet: $space-4,
        $on-laptop: $space-5
      );
      border-top: 1px solid $title-color;
    }

    .send {
      @include row(center, center);
    }

  }

</style>
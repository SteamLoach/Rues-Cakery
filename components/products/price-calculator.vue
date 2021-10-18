<template>
  <section id="price-calculator" class="price-calculator content-panel">
    <form class="inner">
      <div class="options">
        <h2>Options</h2>
        <component 
          :is="'form-field-select'"
          v-for="field in product_details.customization_options"
          :key="getAugmentedField(field).key"
          v-model="$v.form[getAugmentedField(field).name].$model"
          :content="getAugmentedField(field)"
          :field-errors="mixinFormHandler_fieldErrors[getAugmentedField(field).name]">
        </component>
        <storyblok-forms-form-field-textarea 
          v-for="field in product_details.text_option"
          :key="getAugmentedField(field).key"
          v-model="$v.form[getAugmentedField(field).name].$model"
          :content="getAugmentedField(field)"
          :field-errors="mixinFormHandler_fieldErrors[getAugmentedField(field).name]">
        </storyblok-forms-form-field-textarea>
        <storyblok-forms-form-field-date-picker 
          v-for="field in product_details.date_option"
          :key="getAugmentedField(field).key"
          v-model="$v.form[getAugmentedField(field).name].$model"
          :content="getAugmentedField(field)"
          :min-date="earliestAvailableDate"
          :disabled-dates="disabledDates"
          :field-errors="mixinFormHandler_fieldErrors[getAugmentedField(field).name]">
        </storyblok-forms-form-field-date-picker>
      </div>
      <div class="pricing">
        <div class="modifiers">
          <h2>Pricing</h2>
          <ul>
            <li>
              <b>Base Price:</b>
              <span>${{product_details.base_price}}</span>
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
          v-for="field in product_details.order_notes"
          :key="getAugmentedField(field).key"
          v-model="$v.form[getAugmentedField(field).name].$model"
          :content="getAugmentedField(field)"
          :field-errors="mixinFormHandler_fieldErrors[getAugmentedField(field).name]">
        </storyblok-forms-form-field-textarea>
      </div>
      <div class="form-controls">
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
        formFields: [],
        formName: 'Product Form'
      },
      form: {},
      product_details: {
        base_price: 50,
        price_disclaimer: "All prices are estimates only and are subject to change depending on exact requirements.",
        customization_options: CAKE_OPTIONS,
        text_option: [
            {
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
          }
        ],
        date_option: [
          {
            label: 'Pickup date',
            placeholder: "Please select a date",
            validations: [
              {
                validation: 'required',
                message: 'Please enter a pickup date. This can be changed later if needed'
              }
            ],
          }
        ],
        order_notes: [
          {
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
        ]
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
    this.product_details.customization_options.forEach(field => {
      const augmentedField = this.getAugmentedField(field);
      const formValue = this.form[augmentedField.name];
      const priceModifier = field.options.find(option => option.label === formValue).value; 
      priceMap.push({
        label: field.label,
        value: formValue,
        priceModifierText: priceModifier ? `+ $${priceModifier}` : '-',
        priceModifier,
      })
    })
    this.product_details.text_option.forEach(field => {
      const formValue = this.form[this.getAugmentedField(field).name];
      priceMap.push({
        label: field.label,
        value: formValue ? 'Yes' : '',
        priceModifierText: formValue ? `+ $${field.price_modifier}` : '-', 
        priceModifier: formValue ? field.price_modifier : 0,
      })
    })
    this.product_details.date_option.forEach(field => {
      const formValue = this.form[this.getAugmentedField(field).name];  
        priceMap.push({
          label: field.label,
          value: formValue ?
            this.$dayjs(formValue).format('ddd DD MMMM YYYY') : '',
          priceModifierText: '',
          priceModifier: 0,
        })    
    }) 
    return priceMap;
   },
   totalPrice() {
     let modifiers = 0;
     this.priceMap.forEach(item => {modifiers += item.priceModifier});
     return (this.product_details.base_price + modifiers).toFixed(2);
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
   this.mixinFormHandler.formFields = [
     ...this.product_details.customization_options,
     ...this.product_details.text_option,
     ...this.product_details.date_option,
     ...this.product_details.order_notes,
   ];
   this.mixinFormHandler_buildForm();
 },
 methods: {
    getAugmentedField(field) {
      return this.mixinFormHandler_augmentedFields.find(augmentedField => field.label === augmentedField.label);
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

    .form-controls {
      @include row(center, center);
    }

  }

</style>
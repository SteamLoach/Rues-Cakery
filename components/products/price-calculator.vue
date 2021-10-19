<template>
  <section id="price-calculator" class="price-calculator content-panel">
    <!-- Same Page Target -->
    <iframe 
      id="hidden-iframe"
      name="hidden-iframe"
      style="display:none;">
    </iframe>
    <!-- End Same Page Target -->
    <form 
      class="inner"
      data-netlify="true"
      :name="formName"
      :aria-label="formName"
      data-netlify-honeypot="bot-field"
      method="post"
      target="hidden-iframe">
      <!-- Netlify Form Name Prop -->
      <input type="hidden" name="form-name" :value="formName" >
      <!-- End Netlify Form Name Prop -->
      <!-- Bot Field -->
      <input 
        id="paranoidandroid"
        v-model="$v.form.honeypot.$model"
        name="bot-field"
        type="text"
        placeholder="sneaky sneaky"
        style="display: none;" >
      <!-- End Bot Field -->
      <section class="options">
        <h2>Options</h2>
        <div class="form-fields">
          <component 
            :is="'form-field-select'"
            v-for="field in product_details.customization_options"
            :key="getAugmentedField(field).key"
            v-model="$v.form[getAugmentedField(field).name].$model"
            :content="getAugmentedField(field)">
          </component>
          <storyblok-forms-form-field-textarea 
            v-for="field in product_details.text_option"
            :key="getAugmentedField(field).key"
            v-model="$v.form[getAugmentedField(field).name].$model"
            :content="getAugmentedField(field)">
          </storyblok-forms-form-field-textarea>
          <storyblok-forms-form-field-date-picker 
            v-for="field in product_details.date_option"
            :key="getAugmentedField(field).key"
            v-model="$v.form[getAugmentedField(field).name].$model"
            :content="getAugmentedField(field)"
            :min-date="earliestAvailableDate"
            :disabled-dates="disabledDates">
          </storyblok-forms-form-field-date-picker>
        </div>
      </section>
      <section class="pricing">
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
      </section>
      <section class="order-notes">
        <storyblok-forms-form-field-textarea
          v-for="field in product_details.order_notes"
          :key="getAugmentedField(field).key"
          v-model="$v.form[getAugmentedField(field).name].$model"
          :content="getAugmentedField(field)">
        </storyblok-forms-form-field-textarea>
      </section>
      <section class="contact-details">
        <storyblok-forms-form-field-input
          v-for="field in product_details.contact_details"
          :key="getAugmentedField(field).key"
          v-model="$v.form[getAugmentedField(field).name].$model"
          :content="getAugmentedField(field)">
        </storyblok-forms-form-field-input>
      </section>
      <section class="form-controls">
        <storyblok-utils-ui-button
          class="is-wide has-hover-state"
          :disabled="!mixinFormHandler_canSubmit"
          @onClick="mixinFormHandler_postForm">
            Send Enquiry
        </storyblok-utils-ui-button>
      </section>
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
        formName: 'Enquiry Form',
        serializedFormSource: 'serializedFormData',
      },
      form: {},
      product_details: {
        product_type: 'Cheesecake',
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
        ],
        contact_details: [
          {
            label: 'Your Name',
            type: 'text',
            placeholder: 'Please enter your name',
            validations: [
              {
                validation: 'required',
                message: 'This field is required'
              },
              {
                validation: 'maxLength',
                params: 100,
                message: 'Max 100 characters'
              }
            ],
            class_extensions: ['is-half-width']
          },
          {
            label: 'Your Email',
            type: 'email',
            placeholder: 'Please enter your email',
            validations: [
              {
                validation: 'required',
                message: 'This field is required'
              },
              {
                validation: 'maxLength',
                params: 100,
                message: 'Max 100 characters'
              },
              {
                validation: 'email',
                message: 'Please enter a valid email address'
              }
            ],
            class_extensions: ['is-half-width']
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
   formName() {
     return `${this.product_details.product_type} Enquiry Form`
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
        formValue,
        priceModifierText: priceModifier ? `+ $${priceModifier}` : '-',
        priceModifier,
      })
    })
    this.product_details.text_option.forEach(field => {
      const formValue = this.form[this.getAugmentedField(field).name];
      priceMap.push({
        label: field.label,
        value: formValue ? 'Yes' : '',
        formValue,
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
          formValue: formValue ?
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
     // define form name
     const serializedFormName = `form-name=${encodeURIComponent(this.formName)}`;
     // handle pricemap entries
     const formData = [];
     this.priceMap.forEach(entry => {
       const entryLabel= encodeURIComponent(entry.label);
       const entryString = encodeURIComponent(`${entry.formValue} (${entry.priceModifierText})`);
       formData.push(`${entryLabel}=${entryString}`);
     });
     // handle additional fields
     [
       ...this.product_details.order_notes,
       ...this.product_details.contact_details,
     ].forEach(field => {
       const augmentedField = this.getAugmentedField(field);
       const fieldLabel = encodeURIComponent(field.label);
       const fieldString = encodeURIComponent(this.form[augmentedField.name]);
       formData.push(`${fieldLabel}=${fieldString}`);
     })
     formData.push()
     const serializedFormData = formData.join('&');
     const serializedForm = `${serializedFormName}&${serializedFormData}`
     return serializedForm.replace(/%20/g, '+');
   }
 },
 created() {
   this.mixinFormHandler.formFields = [
     ...this.product_details.customization_options,
     ...this.product_details.text_option,
     ...this.product_details.date_option,
     ...this.product_details.order_notes,
     ...this.product_details.contact_details,
   ];
   this.mixinFormHandler_buildForm();
   this.mixinFormHandler.formName = this.formName;
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
    }

    .pricing,
    .options h2 {
      @include pad-scale(
        x,
        $default: $space-2,
        $on-tablet: $space-4,
        $on-laptop: $space-5
      );
    }



    .options {
      @media screen and (max-width: ($tablet - 1px)) {
        padding-bottom: $space-4;
        margin-bottom: $space-6;
        border-bottom: 1px solid $title-color;
      }
      .form-fields {
        @include pad-scale(
          x,
          $default: $space-1,
          $on-tablet: $space-2,
          $on-laptop: $space-4
        );
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

    .order-notes,
    .contact-details {
      @include margin-scale(
        x,
        $default: $space-2,
        $on-tablet: $space-4,
        $on-laptop: $space-5
      );
    }

    .order-notes {
      width: 100%;
      padding-top: $space-6;
      margin-top: $space-7;
      border-top: 1px solid $title-color;
    }

    .contact-details {
      @include row(between, center);
      margin-bottom: $space-4;
    }

    .form-controls {
      @include row(center, center, $space-2, $direction: column);
    }

  }

</style>
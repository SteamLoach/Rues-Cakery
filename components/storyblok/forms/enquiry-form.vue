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
      :name="mixinFormHandler_formName"
      :aria-label="mixinFormHandler_formName"
      data-netlify-honeypot="bot-field"
      method="post"
      target="hidden-iframe">
      <!-- Netlify Form Name Prop -->
      <input type="hidden" name="form-name" :value="mixinFormHandler_formName" >
      <!-- End Netlify Form Name Prop -->
      <!-- Bot Field -->
      <input 
        id="paranoidandroid"
        v-model="$v.mixinFormHandler_form.honeypot.$model"
        name="bot-field"
        type="text"
        placeholder="sneaky sneaky"
        style="display: none;" >
      <!-- End Bot Field -->
      <section class="options">
        <h2>Options</h2>
        <div class="form-fields">
          <component
            :is="field.component"
            v-for="field in customizationOptionFields"
            :key="field.key"
            v-model="$v.mixinFormHandler_form[field.name].$model"
            :content="field">
          </component>
          <component
            :is="field.component"
            v-for="field in textOptionFields"
            :key="field.key"
            v-model="$v.mixinFormHandler_form[field.name].$model"
            :content="field">
          </component>
          <component
            :is="field.component"
            v-for="field in dateOptionFields"
            :key="field.key"
            v-model="$v.mixinFormHandler_form[field.name].$model"
            :content="field"
            :min-date="earliestAvailableDate"
            :disabled-dates="blackoutDates">
          </component>
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
        <component
          :is="field.component"
          v-for="field in orderNoteFields"
          :key="field.key"
          v-model="$v.mixinFormHandler_form[field.name].$model"
          :content="field">
        </component>
      </section>
      <section class="contact-details">
        <component
          :is="field.component"
          v-for="field in contactDetailFields"
          :key="field.key"
          v-model="$v.mixinFormHandler_form[field.name].$model"
          :content="field">
        </component>
        <div 
          v-if="mixinFormHandler_formConsent"
          class="form-consent">
          <forms-form-field>
            <p id="form-consent-description">
              {{product_details.form_consent.description}}
            </p>
            <input
              id="form-consent"
              v-model="$v.mixinFormHandler_form.formConsent.$model"
              type="checkbox"
              aria-describedby="form-consent-description">
            <label for="form-consent">
              {{product_details.form_consent.checkbox_label}}
            </label>
          </forms-form-field>
        </div>
      </section>
      <section class="form-controls">
        <storyblok-utils-ui-button
          class="is-wide has-hover-state"
          :disabled="!mixinFormHandler_canSubmit"
          :loading="true"
          @onClick="mixinFormHandler_postForm">
            {{product_details.form_submit.button_text}}
        </storyblok-utils-ui-button>
        <forms-form-post-state
          :content="product_details.form_submit"
          :is-posting="mixinFormHandler_isPosting"
          :has-attempted-post="mixinFormHandler_hasAttemptedPost"
          :has-successful-post="mixinFormHandler_hasSuccessfulPost">
        </forms-form-post-state>
      </section>
    </form>    
  </section>
</template>

<script>

import {mapGetters} from 'vuex'
import {ModuleNames} from '@/constants/store'
import {GetterNames as SettingsGetterNames} from '@/store/keys/settingsKeys'

import {mixinFormHandler} from '@/mixins/mixinFormHandler'
import {CAKE_OPTIONS} from '@/placeholder-data/cake-options'


export default {

  mixins: [
    mixinFormHandler
  ],

  data() {
    return {
      logRef: '<price-calculator>',
      product_details: {
        product_type: 'Cheesecake',
        base_price: 50,
        price_disclaimer: "All prices are estimates only and are subject to change depending on exact requirements.",
        customization_options: CAKE_OPTIONS,
        text_option: [
            {
              component: 'form-field-textarea',
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
            component: 'form-field-date-picker',
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
            component: 'form-field-textarea',
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
            component: 'form-field-input',
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
            component: 'form-field-input',
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
        ],
        form_consent: {
          is_required: true,
          description: "We use the details your provide for the sole purpose of responding to your enquiry.",
          checkbox_label: "I'm happy for you to use my details to contact me about my enquiry",
        },
        form_submit: {
          button_text: 'Send Enquiry',
          sending_message: 'Sending...',
          success_message: 'Thanks for your enquiry!',
          error_message: `Something went wrong, please try again`
        }
      }      
    }
 },

 computed: {

   /** mixinFormHandler config **/
   mixinFormHandler_formName() {
     return `${this.product_details.product_type} Enquiry Form`
   },
   mixinFormHandler_formSchema() {
     return [
       ...this.product_details.customization_options,
       ...this.product_details.text_option,
       ...this.product_details.date_option,
       ...this.product_details.order_notes,
       ...this.product_details.contact_details,
     ]
   },
   mixinFormHandler_formConsent() {
     return this.product_details.form_consent.is_required
   },

   /** Mapped augmented fields **/
   customizationOptionFields() {
     return this.mixinFormHandler_findFormFields(this.product_details.customization_options);
   },
   textOptionFields() {
     return this.mixinFormHandler_findFormFields(this.product_details.text_option);
   },
   dateOptionFields() {
     return this.mixinFormHandler_findFormFields(this.product_details.date_option);
   },
   orderNoteFields() {
     return this.mixinFormHandler_findFormFields(this.product_details.order_notes);
   },
   contactDetailFields() {
     return this.mixinFormHandler_findFormFields(this.product_details.contact_details);
   },

  /** Pricing **/
  priceMap() {
    const priceMap = [];
    this.customizationOptionFields.forEach(field => {
      const formValue = this.mixinFormHandler_form[field.name];      
      if(!formValue) {return;}
      const priceModifier = field.options.find(
        option => option.label === formValue
      ).value; 
      priceMap.push({
        label: field.label,
        value: formValue,
        formValue,
        priceModifierText: priceModifier ? `+ $${priceModifier}` : '-',
        priceModifier,
      })
    })
    this.textOptionFields.forEach(field => {
      const formValue = this.mixinFormHandler_form[field.name];
      priceMap.push({
        label: field.label,
        value: formValue ? 'Yes' : '',
        formValue,
        priceModifierText: formValue ? `+ $${field.price_modifier}` : '-', 
        priceModifier: formValue ? field.price_modifier : 0,
      })
    })
    this.dateOptionFields.forEach(field => {
      const formValue = this.mixinFormHandler_form[field.name];
      const formattedFormValue = this.$dayjs(formValue).format('ddd DD MMMM YYYY')
        priceMap.push({
          label: field.label,
          value: formValue ? formattedFormValue : '',
          formValue: formValue ? formattedFormValue : '',
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
     return date.setDate(date.getDate() + this.leadTimeInDays);
   },

   /** Serialised Form Data **/
   mixinFormHandler_serializedFormData() {
     // define form name
     const serializedFormName = `form-name=${encodeURIComponent(this.mixinFormHandler_formName)}`;
     // handle pricemap entries
     const formData = [];
     this.priceMap.forEach(entry => {
       const entryLabel= encodeURIComponent(entry.label);
       const entryString = encodeURIComponent(`${entry.formValue} (${entry.priceModifierText})`);
       formData.push(`${entryLabel}=${entryString}`);
     });
     // handle additional fields
     [
       ...this.orderNoteFields,
       ...this.contactDetailFields,
     ].forEach(field => {
       const fieldLabel = encodeURIComponent(field.label);
       const fieldString = encodeURIComponent(this.mixinFormHandler_form[field.name]);
       formData.push(`${fieldLabel}=${fieldString}`);
     })
     // handle total price
     const totalPriceLabel = encodeURIComponent(`Total Price`);
     const totalPriceString = encodeURIComponent(`$${this.totalPrice}`);
     formData.push(`${totalPriceLabel}=${totalPriceString}`)
     const serializedFormData = formData.join('&');
     const serializedForm = `${serializedFormName}&${serializedFormData}`
     return serializedForm.replace(/%20/g, '+');
   },

   ...mapGetters(ModuleNames.Settings, {
     leadTimeInDays: SettingsGetterNames.LeadtimeInDays,
     blackoutDates: SettingsGetterNames.BlackoutDates
   })
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
      @include row(center, center);
      margin-bottom: $space-4;
    }

    .form-consent {
      font-size: $text-small;
      p {
        margin-bottom: $space-2;
      }
    }

    .form-controls {
      @include row(center, center, $space-2, $direction: column);
    }

  }

</style>
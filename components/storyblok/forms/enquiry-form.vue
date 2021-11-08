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
            v-editable="field"
            :content="field">
          </component>
          <component
            :is="field.component"
            v-for="field in textOptionFields"
            :key="field.key"
            v-model="$v.mixinFormHandler_form[field.name].$model"
            v-editable="field"
            :content="field">
          </component>
          <component
            :is="field.component"
            v-for="field in dateOptionFields"
            :key="field.key"
            v-model="$v.mixinFormHandler_form[field.name].$model"
            v-editable="field"
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
              <span>${{productHeader.base_price}}</span>
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
          <rich-text 
            :content="enquiryForm.price_disclaimer"
            class="disclaimer">
          </rich-text>
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
          v-editable="field"
          :content="field">
        </component>
      </section>
      <section class="contact-details">
        <component
          :is="field.component"
          v-for="field in contactDetailFields"
          :key="field.key"
          v-model="$v.mixinFormHandler_form[field.name].$model"
          v-editable="field"
          class="is-half-width"
          :content="field">
        </component>
        <div 
          v-if="mixinFormHandler_formConsent"
          class="form-consent">
          <forms-form-field 
            v-for="field in enquiryForm.form_consent"
            :key="field._uid"
            v-editable="field"
            :show-feedback="false">
            <rich-text 
              id="form-consent-description"
              class="small-copy-size"
              :content="field.description">
            </rich-text>
            <input
              id="form-consent"
              v-model="$v.mixinFormHandler_form.formConsent.$model"
              type="checkbox"
              aria-describedby="form-consent-description">
            <label for="form-consent">
              {{field.checkbox_label}}
            </label>
          </forms-form-field>
        </div>
      </section>
      <section 
        v-for="item in enquiryForm.form_submit"
        :key="item._uid"
        v-editable="item"
        class="form-controls">
        <storyblok-utils-ui-button
          class="is-wide has-hover-state"
          :disabled="!mixinFormHandler_canSubmit"
          :loading="true"
          @onClick="mixinFormHandler_postForm">
            {{item.button_text}}
        </storyblok-utils-ui-button>
        <forms-form-post-state
          :content="item"
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
import {GetterNames as SettingsGetterNames} from '~/store/keys/settings-keys'

import {mixinFormHandler} from '~/mixins/mixin-form-handler'

export default { 

  mixins: [
    mixinFormHandler
  ],

  props: {
    content: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      logRef: '<price-calculator>',     
    }
 },

 computed: {

   /** Derive major bloks from content prop */
   enquiryForm() {
     return this.content.enquiry_form[0]
   },

   productHeader() {
     return this.content.product_header[0]
   },

   /** mixinFormHandler config **/
   mixinFormHandler_formName() {
     return `${this.productHeader.product_title} Enquiry Form`
   },
   mixinFormHandler_formSchema() {
     return [
       ...this.enquiryForm.customization_options,
       ...this.enquiryForm.add_writing_option,
       ...this.enquiryForm.date_option,
       ...this.enquiryForm.order_notes,
       ...this.enquiryForm.contact_details,
     ]
   },
   mixinFormHandler_formConsent() {
     return this.enquiryForm.form_consent.length
   },

   /** Mapped augmented fields **/
   customizationOptionFields() {
     return this.mixinFormHandler_findFormFields(this.enquiryForm.customization_options);
   },
   textOptionFields() {
     return this.mixinFormHandler_findFormFields(this.enquiryForm.add_writing_option);
   },
   dateOptionFields() {
     return this.mixinFormHandler_findFormFields(this.enquiryForm.date_option);
   },
   orderNoteFields() {
     return this.mixinFormHandler_findFormFields(this.enquiryForm.order_notes);
   },
   contactDetailFields() {
     return this.mixinFormHandler_findFormFields(this.enquiryForm.contact_details);
   },

  /** Pricing **/
  priceMap() {
    const priceMap = [];
    this.customizationOptionFields.forEach(field => {
      const formValue = this.mixinFormHandler_form[field.name];      
      if(!formValue) {return;}
      const chosenOption = field.options.find(
        option => option.label === formValue
      ) 
      const priceModifier = chosenOption.value || 0
      priceMap.push({
        label: field.label,
        value: formValue,
        formValue,
        priceModifierText: parseFloat(priceModifier) ?
           `+ $${priceModifier}` : '-',
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
    this.priceMap.forEach(item => {
      modifiers += parseFloat(item.priceModifier)
    });
    const total = parseFloat(this.productHeader.base_price) + modifiers
    return total.toFixed(2);
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
      padding: $space-3;
      margin-bottom: $space-2;
      font-size: $text-small;
      border: 1px dashed $brand-dark;
      background: $brand-lightest;

      p {
        margin-bottom: $space-2;
      }
    }

    .form-controls {
      @include row(center, center, $space-2, $direction: column);
    }

  }

</style>
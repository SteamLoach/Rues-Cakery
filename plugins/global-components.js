import Vue from 'vue'

// Transitions //
import Transitions from 'vue2-transitions'


// Storyblok //

// Forms
import EnquiryForm from '@/components/storyblok/forms/enquiry-form.vue'
// Fields
import FormFieldSelect from '~/components/storyblok/forms/fields/form-field-select.vue'
import FormFieldDatePicker from '~/components/storyblok/forms/fields/form-field-date-picker.vue'
import FormFieldTextArea from '~/components/storyblok/forms/fields/form-field-textarea.vue'
import FormFieldInput from '~/components/storyblok/forms/fields/form-field-input.vue'
// Custom Fields
import ProductAddWritingField from '~/components/storyblok/forms/custom-fields/product-add-writing-field.vue'

// Content
import ProductHeader from '@/components/storyblok/products/product-header.vue'
import RichText from '@/components/storyblok/content/rich-text.vue'


/******************************************************/


// Transitions
Vue.use(Transitions)

// Storyblok //

// Forms
Vue.component('enquiry-form', EnquiryForm)
// Fields
Vue.component('form-field-select', FormFieldSelect)
Vue.component('form-field-date-picker', FormFieldDatePicker)
Vue.component('form-field-textarea', FormFieldTextArea)
Vue.component('form-field-input', FormFieldInput)
// Custom Fields
Vue.component('product-add-writing-field', ProductAddWritingField)



// Content
Vue.component('product-header', ProductHeader)
Vue.component('rich-text', RichText)
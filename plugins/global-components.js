import Vue from 'vue'

// Transitions //
import Transitions from 'vue2-transitions'


// Storyblok //

// Froms
import FormFieldSelect from '@/components/storyblok/forms/form-field-select.vue'
import FormFieldDatePicker from '@/components/storyblok/forms/form-field-date-picker.vue'
import FormFieldTextArea from '@/components/storyblok/forms/form-field-textarea.vue'
import FormFieldInput from '@/components/storyblok/forms/form-field-input.vue'
import EnquiryForm from '@/components/storyblok/forms/enquiry-form.vue'


// Content
import ProductHeader from '@/components/storyblok/products/product-header.vue'
import RichText from '@/components/storyblok/content/rich-text.vue'


/******************************************************/


// Transitions
Vue.use(Transitions);

// Storyblok //

// Forms
Vue.component('form-field-select', FormFieldSelect);
Vue.component('form-field-date-picker', FormFieldDatePicker);
Vue.component('form-field-textarea', FormFieldTextArea);
Vue.component('form-field-input', FormFieldInput);
Vue.component('enquiry-form', EnquiryForm);

// Content
Vue.component('product-header', ProductHeader);
Vue.component('rich-text', RichText);
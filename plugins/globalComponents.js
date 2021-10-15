import Vue from 'vue'

// Transitions
import Transitions from 'vue2-transitions'

// Storyblok
import FormFieldSelect from '@/components/storyblok/forms/form-field-select.vue'
import FormFieldDatePicker from '@/components/storyblok/forms/form-field-date-picker.vue'

/******************************************************/

// Transitions
Vue.use(Transitions);

// Storyblok
Vue.component('form-field-select', FormFieldSelect);
Vue.component('form-field-date-picker', FormFieldDatePicker);
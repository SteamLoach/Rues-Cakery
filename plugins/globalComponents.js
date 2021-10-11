import Vue from 'vue'

// Transitions
import Transitions from 'vue2-transitions'

// Storyblok
import FormFieldSelect from '@/components/storyblok/forms/form-field-select.vue'

/******************************************************/

// Transitions
Vue.use(Transitions);

// Storyblok
Vue.component('form-field-select', FormFieldSelect);
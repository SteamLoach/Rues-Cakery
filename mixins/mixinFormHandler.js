/********************

Mixin builds a vueliadate validation object 

Mixin requires a mixinFormHandler data object

{
  formName: name for the vuelidate form prop. Defaults to 'form',
  formFields: array of fields to construct validation object
}

********************/

import * as Validators from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'

import {logger} from '@/utils/logger'

const log = logger({
  title: "Mixin",
  time: false,
});

const mixinName = 'mixinFormHandler'

export const mixinFormHandler = {

  mixins: [validationMixin],

  data() {
    return {
      mixinFormHandler_groupTitle: null,
      mixinFormHandler_formName: 'form',
    }
  },

  validations() {
    return {
      [this.mixinFormHandler_formName]: this.mixinFormHandler_buildValidations()
    }
  },

  computed: {
    mixinFormHandler_fieldErrors() {
      const formModel = this.$v[this.mixinFormHandler_formName];
      const errorObj = {};
      this[mixinName].formFields.forEach(field => {
        const fieldRef = this.$toolkit.camelCase(field.label);
        errorObj[fieldRef] = [];
        if(!this.$toolkit.isEmpty(field.validations)) {
          field.validations.forEach(item => {
            if(!formModel[fieldRef][item.validation] && formModel[fieldRef].$dirty) {
              errorObj[fieldRef].push(item.message || 'Error in field')
            }
          })
        }
      })
      return errorObj;
    }
  },

  mounted() {
    this.mixinFormHandler_groupTitle = `${mixinName} called from ${this.logRef}`;

    log.group(this.mixinFormHandler_groupTitle);

    if(!this[mixinName]) {
      return log.warn(`make sure to set a ${mixinName} data object`)
    }

    if(this[mixinName].formName) {
      this.mixinFormHandler_formName = this[mixinName.formName];
    }

    log.groupEnd();

  },

  methods: {
    mixinFormHandler_buildValidations() {
      const validationObj = {};
      this[mixinName].formFields.forEach(field => {
        const fieldRef = this.$toolkit.camelCase(field.label);
        const fieldRules = {};
        if(!this.$toolkit.isEmpty(field.validations)) {
          field.validations.forEach(item => {
            fieldRules[item.validation] = item.params ? 
              Validators[item.validation](item.params)
              : Validators[item.validation]
          })
        }
        validationObj[fieldRef] = fieldRules;
      })
      return validationObj;
    }
  }

}
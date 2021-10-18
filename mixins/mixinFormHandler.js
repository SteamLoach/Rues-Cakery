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
      mixinFormHandler_formKey: 'form',
      mixinFormHandler_formName: 'form',
    }
  },

  validations() {
    return {
      [this.mixinFormHandler_formKey]: this.mixinFormHandler_buildValidations()
    }
  },

  computed: {
    mixinFormHandler_canSubmit() {
      return !this.$v[this.mixinFormHandler_formKey].$invalid;
    },
    mixinFormHandler_augmentedFields() {
      return this[mixinName].formFields.map((field, index) => {
        const camelCaseLabel = this.$toolkit.camelCase(field.label);
        const kebabCaseLabel = this.$toolkit.kebabCase(field.label);
        let defaultVal = field.default_value;
        if(field.options) {
          const defaultOption = field.options.find(option => option.default) || field.options[0]
          defaultVal = defaultOption.label
        }
        const required = field.validations ? field.validations.find(item => item.validation === 'required') : false;
        const fieldErrors = this.mixinFormHandler_fieldErrors[camelCaseLabel].length;
        return {
          ...field,
          key: `${kebabCaseLabel}-field-${index}`,
          id: kebabCaseLabel,
          name: camelCaseLabel,
          defaultVal,
          required,
          fieldErrors,
        }
      });
    },
    mixinFormHandler_serializedFormData() {
       const serializedFormName = `form-name=${encodeURIComponent(this.mixinFormHandler_formName)}`;
       const formData = this[this.mixinFormHandler_formKey];
       const serializedFieldArray = [];
       this.mixinFormHandler_augmentedFields.forEach(field => {
         serializedFieldArray.push(`${encodeURIComponent(field.label)}=${encodeURIComponent(formData[field.name])}`)
       });
       const serializedFieldString = serializedFieldArray.join('&');
       const serializedForm = `${serializedFormName}&${serializedFieldString}`;
       return serializedForm.replace(/%20/g, '+');
    },
    mixinFormHandler_fieldErrors() {
      const formModel = this.$v[this.mixinFormHandler_formKey];
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
    },
  },
  mounted() {
    this.mixinFormHandler_groupTitle = `${mixinName} called from ${this.logRef}`;
    log.group(this.mixinFormHandler_groupTitle);
    if(!this[mixinName]) {
      return log.warn(`make sure to set a ${mixinName} data object`)
    }
    if(this[mixinName].formName) {
      this.mixinFormHandler_formName = this[mixinName].formName;
    }
    if(this[mixinName].formKey) {
      this.mixinFormHandler_formKey = this[mixinName].formKey;
    }
    log.groupEnd();
  },
  methods: {
    mixinFormHandler_buildForm() {
      this.mixinFormHandler_augmentedFields.forEach(field => {
        this.$set(
          this[this.mixinFormHandler_formKey],
          field.name,
          field.defaultVal ? field.defaultVal : ''
        );
      });
    },
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
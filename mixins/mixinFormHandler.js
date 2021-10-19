/********************

Mixin builds a vueliadate validation object 

Mixin requires a mixinFormHandler data object

{
  formKey: name for the vuelidate form prop. Defaults to 'form',
  formName: name for the form - submitted with form data
  formFields: array of fields to construct validation object
}

********************/

import * as Validators from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'

import {logger} from '@/utils/logger'
import {Timeouts} from '@/constants/timeouts'

const log = logger({
  title: "Mixin",
  time: false,
});

const isEmpty = (val) => val === '';

const mixinName = 'mixinFormHandler'

export const mixinFormHandler = {

  mixins: [validationMixin],

  data() {
    return {
      mixinFormHandler_groupTitle: null,
      mixinFormHandler_formKey: 'form',
      mixinFormHandler_formName: 'form',
      mixinFormHandler_isPosting: false,
      mixinFormHandler_hasAttemptedPost:  false,
      mixinFormHandler_hasSuccessfulPost: false,
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
      
      const formModel = this.$v[this.mixinFormHandler_formKey];

      return this[mixinName].formFields.map((field, index) => {
        
        // cased field references
        const camelCaseLabel = this.$toolkit.camelCase(field.label);
        const kebabCaseLabel = this.$toolkit.kebabCase(field.label);
        
        // default value
        let defaultVal = field.default_value;
        if(field.options) {
          const defaultOption = field.options.find(option => option.default) || field.options[0]
          defaultVal = defaultOption.label
        }

        // required field
        const isRequired = field.validations ? field.validations.find(item => item.validation === 'required') : false;

        // field errors
        const fieldErrors = [];
        if(field.validations) {
          field.validations.forEach(rule => {
            if(!formModel[camelCaseLabel][rule.validation] && formModel[camelCaseLabel].$dirty) {
              fieldErrors.push(rule.message || 'Error in field')
            }
          })
        }

        return {
          ...field,
          key: `${kebabCaseLabel}-field-${index}`,
          id: kebabCaseLabel,
          name: camelCaseLabel,
          defaultVal,
          isRequired,
          fieldErrors,
          hasFieldErrors: fieldErrors.length
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
      // add honeypot field reference
      this.$set(
        this[this.mixinFormHandler_formKey],
        'honeypot',
        '',
      );
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
      // add honeypot field validation
      validationObj.honeypot = {isEmpty};
      return validationObj;
    },
    async mixinFormHandler_postForm() {
      log.group(this.mixinFormHandler_groupTitle)
      try {
        const dataSource = this[mixinName].serializedFormSource ? 
          this[mixinName].serializedFormSource 
          : 'mixinFormData_serializedFormData';
        const postBody = this[dataSource];
        log.await('posting form');
        log.break();
        log.line(postBody);
        log.break();
        this.mixinFormHandler_isPosting = true;
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: postBody
        })
        this.mixinFormHandler_hasSuccessfulPost = true;
        log.complete('form sent')
      } catch(err) {
        log.error(err)
      } finally {
        setTimeout(() => {
          this.mixinFormHandler_hasAttemptedPost = true;
          this.mixinFormHandler_isPosting = false;
        }, Timeouts.OneSecond)
      }
      log.groupEnd();
    }
  }

}
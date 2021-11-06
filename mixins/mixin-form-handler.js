/* 

## Configurable Props ##
NOTE THAT ALL CONFIGURABLE PROPS SHOULD BE COMPUTED

_formName
  Used in serialized form data and available in markup. Defaults to 'form'

_formSchema
  Array of plain field objects used to create augmented fields. All field objects should specify at least a label

_serializedFormData
  Encoded string to send on form submission. Defaults to key-value pairs derived from mixinFormHandler_form. 

_formConsent
  Should return a boolean indicating whether consent is required before the form can post 


## Readable Props ##

_form
$v.mixinFormHandler_form
  Form/validation objects derived from augmented form fields

_formFields
  Field array with additional props/validation state for use in markup

_isPosting
_hasAttemptedPost
_hasSuccessfulPost
  Boolean values set during mixinFormHandler_postForm

_canSubmit
  Boolean indicating form validity
  

## Methods ##

_findFormFields
  Takes an array of plain fields and returns augmented fields. Useful if markup splits the form into sections

_postForm
  Posts serialized form data using fetch. 


*/

import * as Validators from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'

import {logger} from '@/utils/logger'
import {Timeouts} from '~/constants/timeouts'

const log = logger({
  title: "Mixin",
  time: false,
});

const isEmpty = (val) => val === '';
const isTrue = (val) => val === true;

const RULES_WITH_PARAMS = [
  'maxLength'
]

export const mixinFormHandler = {

  mixins: [validationMixin],

  data() {
    return {
      mixinFormHandler_form: {},
      mixinFormHandler_isPosting: false,
      mixinFormHandler_hasAttemptedPost:  false,
      mixinFormHandler_hasSuccessfulPost: false,
    }
  },

  validations() {
    return {
      mixinFormHandler_form: this.$_mixinFormHandler_buildValidations()
    }
  },

  computed: {

    mixinFormHandler_formName() {
      return 'form'
    },

    mixinFormHandler_formSchema() {
      return []
    },

    mixinFormHandler_canSubmit() {
      return (
        !this.$v.mixinFormHandler_form.$invalid
        && !this.mixinFormHandler_isPosting
        && !this.mixinFormHandler_hasSuccessfulPost
      );
    },
    
    mixinFormHandler_formFields() {
      return this.$_mixinFormHandler_augmentedFields.map(field => {
        const fieldErrors = []
        if(field.validations && field.validations.length) {
          field.validations.forEach(rule => {
            if(!this.$v.mixinFormHandler_form[field.name][rule.validation] && this.$v.mixinFormHandler_form[field.name].$dirty) {
              fieldErrors.push(rule.message || 'Error in field');
            }
          })
        }        
        return {
          ...field,
          fieldErrors,
        }
      })
    },

    /*
    // fieldErrors are now a prop on _formFields
    mixinFormHandler_formFieldErrors() {
      const errorObj = {}
      this.$_mixinFormHandler_augmentedFields.forEach(field => {
        const fieldErrors = [];
        if(field.validations && field.validations.length) {
          field.validations.forEach(rule => {
            if(!this.$v.mixinFormHandler_form[field.name][rule.validation] && this.$v.mixinFormHandler_form[field.name].$dirty) {
              fieldErrors.push(rule.message || 'Error in field');
            }
          })
        }
        errorObj[field.name] = fieldErrors; 
      })
      return errorObj;
    },
    */

    mixinFormHandler_serializedFormData() {
      const serializedFormName = `form-name=${encodeURIComponent(this.mixinFormHandler_formName)}`;
      const formData = this.mixinFormHandler_form;
      const serializedFieldArray = [];
      this.mixinFormHandler_formFields.forEach(field => {
        serializedFieldArray.push(`${encodeURIComponent(field.label)}=${encodeURIComponent(formData[field.name])}`)
      });
      const serializedFieldString = serializedFieldArray.join('&');
      const serializedForm = `${serializedFormName}&${serializedFieldString}`;
      return serializedForm.replace(/%20/g, '+');
    },

    $_mixinFormHandler_augmentedFields() {
      
      if(!this.mixinFormHandler_formSchema || !this.mixinFormHandler_formSchema.length) {
        return []
      }
      const validFields = this.mixinFormHandler_formSchema.filter(field => field.label);
      return validFields.map((field, index) => {  
        // cased field references
        const camelCaseLabel = this.$toolkit.camelCase(field.label);
        const kebabCaseLabel = this.$toolkit.kebabCase(field.label);
        // default value
        let defaultVal = field.default_value || ''
        if(field.options && field.options.length) {
          // if select field with valid options
          if(defaultVal) {
            // squash default_value & labels for more forgiving match
            const squashedDefaultVal = field.default_value
              .replace(/\s+/g, '')
              .toLowerCase()
            const defaultOption = field.options.find(option => {
              const squashedOptionLabel = option.label
                .replace(/\s+/g, '')
                .toLowerCase()
              return new RegExp(squashedDefaultVal, 'i')
                .test(squashedOptionLabel)
            })
            if(defaultOption) {
              defaultVal = defaultOption.label
            }
          }
          // if default can't be determined, use first option
          if(!defaultVal) {
            defaultVal = field.options[0].label;
          }
        }
        // required field
        const isRequired = field.validations ? field.validations.find(item => item.validation === 'required') : false;
        // augmented field
        return {
          ...field,
          key: `${kebabCaseLabel}-field-${index}`,
          id: kebabCaseLabel,
          name: camelCaseLabel,
          defaultVal,
          isRequired,
        }        
      })
    },

  },

  mounted() {
    log.group(`mixinFormHandler called by ${this.logRef}`);
    log.task(`building form object`);
    this.$_mixinFormHandler_buildForm();
    log.groupEnd();
  },

  methods: {

    mixinFormHandler_findFormFields(targetFields = []) {
      return this.mixinFormHandler_formFields.filter(field => {
        const labels = targetFields.map(
          targetField => targetField.label || ''
        );
        return labels.includes(field.label);
      })
    },

    async mixinFormHandler_postForm() {
      log.group(`mixinFormHandler called from ${this.logRef}`)
      try {
        log.await('posting form');
        log.break();
        log.line(this.mixinFormHandler_serializedFormData);
        log.break();
        this.mixinFormHandler_isPosting = true;
        await this.$axios({
          method: 'POST',
          url: '/',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: this.mixinFormHandler_serializedFormData
        })
        this.mixinFormHandler_hasSuccessfulPost = true;
        log.complete('form sent')
      } catch(err) {
        log.error(err)
      } finally {
        setTimeout(() => {
          this.mixinFormHandler_hasAttemptedPost = true;
          this.mixinFormHandler_isPosting = false;
        }, Timeouts.TwoSeconds)
      }
      log.groupEnd();
    },

    $_mixinFormHandler_buildForm() {
      // build form from augmented fields
      this.$_mixinFormHandler_augmentedFields.forEach(field => {
        this.$set(
          this.mixinFormHandler_form,
          field.name,
          field.defaultVal
        );
      });
      // add honeypot field
      this.$set(this.mixinFormHandler_form, 'honeypot', '');
      // add form consent if applicable
      if(this.mixinFormHandler_formConsent) {
        this.$set(this.mixinFormHandler_form, 'formConsent', false);
      }
    },
    
    $_mixinFormHandler_buildValidations() {
      const validationObj = {};
      this.$_mixinFormHandler_augmentedFields.forEach(field => {
        const fieldRules = {};
        if(!this.$toolkit.isEmpty(field.validations)) {
          field.validations.forEach(rule => {
            if(!Validators[rule.validation]) return
            if(RULES_WITH_PARAMS.includes(rule.validation)) {
              fieldRules[rule.validation] = Validators[rule.validation](rule.params)
            } else {
              fieldRules[rule.validation] = Validators[rule.validation]
            }
          })
        }
        validationObj[field.name] = fieldRules;
      })
      // add honeypot validation
      validationObj.honeypot = {isEmpty};
      // add form consent validation if needed
      if(this.mixinFormHandler_formConsent) {
        validationObj.formConsent = {isTrue};
      }
      return validationObj;
    }

  }

}
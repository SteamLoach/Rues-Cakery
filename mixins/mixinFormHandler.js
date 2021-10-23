/* 

## Configurable Props ##
NOTE THAT ALL CONFIGURABLE PROPS SHOULD BE COMPUTED

_formName
  Used in serialized form data and available in markup. Defaults to 'form'

_formFields
  Array of plain field objects used to create augmented fields. All field objects should specify at least a label

_serializedFormData
  Encoded string to send on form submission. Defaults to key-value pairs derived from mixinFormHandler_form. 

_formConstent
  Should return a boolean indicating whether consent is required before the form can post 


## Readable Props ##

_form
$v.mixinFormHandler_form
  Form/validation objects derived from augmented form fields

_augmentedFormFields#
  Mapped _formFields with additional props for use in markup

_formFieldErrors
  Object containing an array of errors for each augmented field. Fields are keyed by .name

_isPosting
_hasAttemptedPost
_hasSuccessfulPost
  Boolean values set during mixinFormHandler_postForm

_canSubmit
  Boolean indicating form validity
  

## Methods ##

_findAugmentedFields
  Takes an array of plain fields and returns augmented fields. Useful if markup splits the form into sections

_postForm
  Posts serialized form data using fetch. 


*/

import * as Validators from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'

import {logger} from '@/utils/logger'
import {Timeouts} from '@/constants/timeouts'

const log = logger({
  title: "Mixin",
  time: false,
});

const isEmpty = (val) => val === '';
const isTrue = (val) => val === true;

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
      mixinFormHandler_form: this.mixinFormHandler_buildValidations()
    }
  },

  computed: {

    mixinFormHandler_formName() {
      return 'form'
    },

    mixinFormHandler_formFields() {
      return []
    },

    mixinFormHandler_canSubmit() {
      return (
        !this.$v.mixinFormHandler_form.$invalid
        && !this.mixinFormHandler_isPosting
        && !this.mixinFormHandler_hasSuccessfulPost
      );
    },
    
    mixinFormHandler_augmentedFormFields() {
      
      if(!this.mixinFormHandler_formFields || !this.mixinFormHandler_formFields.length) {
        return []
      }
      const validFields = this.mixinFormHandler_formFields.filter(field => field.label);
      return validFields.map((field, index) => {  
        // cased field references
        const camelCaseLabel = this.$toolkit.camelCase(field.label);
        const kebabCaseLabel = this.$toolkit.kebabCase(field.label);
        // default value
        let defaultVal = field.default_value || '';
        if(field.options && !field.default_value) {
          defaultVal = field.options[0].label
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

    mixinFormHandler_formFieldErrors() {
      const errorObj = {}
      this.mixinFormHandler_augmentedFormFields.forEach(field => {
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

    mixinFormHandler_serializedFormData() {
      const serializedFormName = `form-name=${encodeURIComponent(this.mixinFormHandler_formName)}`;
      const formData = this[this.mixinFormHandler_getFormKey()];
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
    log.group(`mixinFormHandler called by ${this.logRef}`);
    log.task(`building form object`);
    this.mixinFormHandler_buildForm();
    log.groupEnd();
  },

  methods: {

    mixinFormHandler_buildForm() {
      // build form from augmented fields
      this.mixinFormHandler_augmentedFormFields.forEach(field => {
        this.$set(
          this.mixinFormHandler_form,
          field.name,
          field.defaultVal
        );
      });
      // add honeypot field
      this.$set(this.mixinFormHandler_form, 'honeypot', '');
      // add form consent if applicable
      this.$set(this.mixinFormHandler_form, 'formConsent', false);
    },
    
    mixinFormHandler_buildValidations() {
      const validationObj = {};
      this.mixinFormHandler_augmentedFormFields.forEach(field => {
        const fieldRules = {};
        if(!this.$toolkit.isEmpty(field.validations)) {
          field.validations.forEach(rule => {
            if(Validators[rule.validation]) {
              fieldRules[rule.validation] = rule.params ? 
                Validators[rule.validation](rule.params)
                : Validators[rule.validation]
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
    },

    mixinFormHandler_findAugmentedFields(targetFields = []) {
      return this.mixinFormHandler_augmentedFormFields.filter(augmentedField => {
        const labels = targetFields.map(
          targetField => targetField.label || ''
        );
        return labels.includes(augmentedField.label);
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
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.mixinFormHandler_serializedFormData
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
    }
  },

}
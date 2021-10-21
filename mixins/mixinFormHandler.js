/********************

Mixin can be configured using a mixinFormHandler data object

{
  formKey: key for the form and validation objects. Defaults to 'form'. 

  formName: name for the form - submitted with form data. Should be set in created hook of importing component if not directly on config object. Defaults to 'form'.
  
  formConsent: will add a 'formConsent' prop to form and validation object if set to true. 

  formFields: array of fields to construct validation object. Set in created hook of importing component.
  
  serializedFormDataSource: prop name for serialized data source, if different from mixinFormHandler_serializedFormData
}

// METHODS
mixinFormHandler_buildForm:
Constructs a data object using supplied formFields. formKey is used as the prop name. The corresponding validation object is constructed automatically. Should be run in the created hook of the importing component after defining formFields

mixinFormHandler_postForm:
Posts the form using fetch and either mixinFormHandler_serializedFormData or the serializedFormDataSource if specified

// PROPERTIES
Properties indicating post state:
mixinFormHandler_isPosting
mixinFormHandler_hasAttemptedPost
mixinFormHandler_hasSuccessfulPost

// COMPUTED PROPERTIES
mixinFormHandler_canSubmit:
Boolean indicating whether the form is valid

mixinFormHandler_augmentedFields:
An array of form fields augmented with additional props such as name, id, and field errors. Generated from supplied formFields

mixinFormHandler_serializedFormData:
Encoded string based on form object key-value pairs. Send with post action unless another source is specified with serializedFormDataSource

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
const isTrue = (val) => val === true;

const mixinName = 'mixinFormHandler'

export const mixinFormHandler = {

  mixins: [validationMixin],

  data() {
    return {
      mixinFormHandler_groupTitle: null,
      mixinFormHandler_isPosting: false,
      mixinFormHandler_hasAttemptedPost:  false,
      mixinFormHandler_hasSuccessfulPost: false,
    }
  },

  validations() {
    return {
      [this.mixinFormHandler_getFormKey()]: this.mixinFormHandler_buildValidations()
    }
  },

  computed: {
    mixinFormHandler_canSubmit() {
      return (
        !this.$v[this.mixinFormHandler_getFormKey()].$invalid
        && !this.mixinFormHandler_isPosting
        && !this.mixinFormHandler_hasSuccessfulPost
      );
    },

    mixinFormHandler_augmentedFields() {
      const formModel = this.$v[this.mixinFormHandler_getFormKey()];
      const fields = this[mixinName].formFields ? 
      this[mixinName].formFields : [];
      return fields.map((field, index) => {
        
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
       const formName = this[mixinName].formName || 'form'
       const serializedFormName = `form-name=${encodeURIComponent(formName)}`;
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
    this.mixinFormHandler_groupTitle = `${mixinName} called from ${this.logRef}`;
    log.group(this.mixinFormHandler_groupTitle);
    if(!this[mixinName]) {
      return log.warn(`make sure to set a ${mixinName} data object`)
    }
    log.groupEnd();
  },
  methods: {
    mixinFormHandler_getFormKey() {
      return this[mixinName].formKey || 'form';
    },
    mixinFormHandler_buildForm() {
      this.mixinFormHandler_augmentedFields.forEach(field => {
        this.$set(
          this[this.mixinFormHandler_getFormKey()],
          field.name,
          field.defaultVal ? field.defaultVal : ''
        );
      });
      // add honeypot field reference
      this.$set(
        this[this.mixinFormHandler_getFormKey()],
        'honeypot',
        '',
      );
      // add form consent reference
      if(this[mixinName].formConsent) {
        this.$set(
          this[this.mixinFormHandler_getFormKey()],
          'formConsent',
          false,
        )
      }
    },
    mixinFormHandler_buildValidations() {
      const validationObj = {};
      const fields = this[mixinName].formFields ? 
        this[mixinName].formFields : []
      fields.forEach(field => {
        const fieldRef = this.$toolkit.camelCase(field.label);
        const fieldRules = {};
        if(!this.$toolkit.isEmpty(field.validations)) {
          field.validations.forEach(item => {
            if(Validators[item.validation]) {
              fieldRules[item.validation] = item.params ? 
              Validators[item.validation](item.params)
              : Validators[item.validation]
            }
          })
        }
        validationObj[fieldRef] = fieldRules;
      })
      // add honeypot field validation
      validationObj.honeypot = {isEmpty};
      // add form consent
      if(this[mixinName].formConsent) {
        validationObj.formConsent = {isTrue};
      }
      return validationObj;
    },
    async mixinFormHandler_postForm() {
      log.group(this.mixinFormHandler_groupTitle)
      try {
        const dataSource = this[mixinName].serializedFormDataSource ? 
          this[mixinName].serializedFormDataSource 
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
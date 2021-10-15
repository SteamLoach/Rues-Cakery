<template>
  <utils-form-field :field-errors="fieldErrors">
    <label :for="fieldId">
      <span>
        {{content.label}}
      </span>
      <span 
        v-if="characterAllowance"
        class="character-allowance"
        :class="{'exceeds-max-length': exceedsMaxLength}">
        {{characterAllowance}}
      </span>
    </label>
    <textarea
      :id="fieldId"
      :class="{'has-field-errors': hasFieldErrors}"
      :value="value"
      :rows="content.rows"
      :maxlength="maxLength"
      :placeholder="content.placeholder"
      :disabled="disabled"
      @input="onInput">
    </textarea>
  </utils-form-field>
</template>

<script>

export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    content: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fieldErrors: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    fieldId() {
      return this.$toolkit.kebabCase(`${this.content.label}-textarea`)
    },
    fieldRef() {
      return this.$toolkit.camelCase(this.content.label)
    },
    hasFieldErrors() {
      return this.fieldErrors.length
    },  
    maxLength() {
      return this.content.validations.find(item =>  item.validation === 'maxLength').params;
    },
    exceedsMaxLength() {
      return this.value.length > this.maxLength
    },
    characterAllowance() {
      if(this.maxLength) {
        return `${this.value.length}/${this.maxLength}`
      }
      return false;
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>

  label, textarea {
    display: block;
    width: 100%;
  }

  label {
    @include row(between, center, $space-2, $no-wrap: true);
    font-weight: $input-label-weight;
    color: $input-label-color;
    .character-allowance {
      font-size: $text-small;
      &.exceeds-max-length {
        color: $danger-dark;
      }
    }
  }

  textarea {
    max-width: 100%;
    padding: $space-1 $space-2;
    border: $input-border;
    &:placeholder-shown {
      font-style: italic;
    }
    &.has-field-errors {
      border: $input-with-error-border;
    }
  }

</style>


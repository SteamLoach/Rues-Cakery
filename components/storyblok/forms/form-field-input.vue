<template>
  <utils-form-field :content="content">
    <label :for="content.id">
      {{content.label}}
      <sup class="required">
        {{content.isRequired ? '*required' : ''}}
      </sup>
    </label>
    <input
      :id="content.id"
      :class="{'has-field-errors': content.hasFieldErrors}"
      :name="content.id"
      :type="content.type"
      :maxlength="maxLength"
      :value="value"
      @input="onInput">
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
      default: () => {}
    },
  },
  computed: {
    maxLength() {
      const maxLengthRule = this.content.validations.find(item =>  item.validation === 'maxLength')
      return maxLengthRule ? maxLengthRule.params : false
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    }
  } 
}
</script>

<style lang="scss" scoped>

  label,
  input {
    width: 100%;
  }

  label {
    font-weight: $input-label-weight;
    color: $input-label-color;
    sup {
      position: relative;
      top: 2px;
      font-size: 10px;
      font-style: italic;
    }
  }

  input {
    padding: $space-1 $space-2;
    border: $input-border;
    &.has-field-errors {
      border: $input-with-error-border;
    }    
  }

</style>
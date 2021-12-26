<template>
  <forms-form-field 
    :content="content">
    <label 
      class="form-field__label"
      :for="content.id"
    >
      {{content.label}}
      <sup class="required">
        {{content.isRequired ? '*required' : ''}}
      </sup>
    </label>
    <input
      :id="content.id"
      class="form-field__input"
      :class="{'has-field-errors': content.fieldErrors.length}"
      :name="content.id"
      :type="content.type"
      :value="value"
      @input="onInput">
  </forms-form-field>
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

</style>
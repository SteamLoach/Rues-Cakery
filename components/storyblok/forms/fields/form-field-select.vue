<template>
  <forms-form-field 
      :content="content">
    <label 
      class="form-field__label"
      :for="content.id">
      {{content.label}}
      <sup class="required">
        {{content.isRequired ? '*required' : ''}}
      </sup>
    </label>
    <select 
      :id="content.id"
      class="form-field__select"
      :name="content.id"
      :value="value"
      :class="{'has-field-errors': content.fieldErrors.length}"
      @input="onInput">
      <option 
        v-for="option in content.options"
        :key="option.label">
        {{option.label}}
      </option>
    </select>
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
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
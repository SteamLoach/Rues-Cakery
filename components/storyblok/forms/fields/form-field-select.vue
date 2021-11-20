<template>
  <forms-form-field 
      :content="content">
    <label :for="content.id">
      {{content.label}}
      <sup class="required">
        {{content.isRequired ? '*required' : ''}}
      </sup>
    </label>
    <select 
      :id="content.id"
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

  label, select {
    display: block;
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

  select {
    padding: $space-1 $space-2;
    border: $input-border;
    &.has-field-errors {
      border: $input-with-error-border;
    }
  }

</style>
<template>
    <utils-form-field :field-errors="fieldErrors">
    <label :for="fieldId">
      {{content.label}}
    </label>
    <select 
      :id="fieldId"
      :value="value"
      :class="{'has-field-errors': hasFieldErrors}"
      @input="onInput">
      <option 
        v-for="option in content.options"
        :key="option.label">
        {{option.label}}
      </option>
    </select>
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
    fieldErrors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    fieldId() {
      return `${this.$toolkit.kebabCase(this.content.label)}-select-field`;
    },
    hasFieldErrors() {
      return this.fieldErrors.length
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

  label, select {
    display: block;
    width: 100%;
  }

  label {
    font-weight: $input-label-weight;
    color: $input-label-color;
  }

  select {
    padding: $space-1 $space-2;
    border: $input-border;
    &.has-field-errors {
      border: $input-with-error-border;
    }
  }

</style>
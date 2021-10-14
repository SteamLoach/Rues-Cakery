<template>
  <utils-form-field>
    <label :for="fieldId">
      {{content.label}}
    </label>
    <select 
      :id="fieldId"
      :value="value"
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
    }
  },
  computed: {
    fieldId() {
      return `${this.$toolkit.kebabCase(this.content.label)}-select-field`;
    },
    fieldRef() {
      return this.$toolkit.camelCase(this.content.label)
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
  }

</style>
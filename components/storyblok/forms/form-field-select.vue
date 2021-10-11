<template>
  <storyblok-forms-form-field>
    <label :for="fieldId">
      {{content.label}}
    </label>
    <select 
      :id="fieldId"
      :value="value"
      @input="onInput">
      <option 
        v-for="option in content.options"
        :key="option.description"
        :value="option.price_modifier">
        {{option.description}}
      </option>
    </select>
  </storyblok-forms-form-field>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true,
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
      this.$emit('updateValue', {
        prop: this.fieldRef,
        value: e.target.value,
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
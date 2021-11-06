<template>
  <forms-form-field :content="content">
    <input
      :id="content.id"
      :name="content.id"
      type="checkbox"
      :value="value"
      @input="onInput">
    <label :for="content.id"> {{content.label}} </label>
  </forms-form-field>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Object,
      default: () => {}
    },
  },  
  methods: {
    onInput(e) {
      this.$emit('input', e.target.checked);
    }
  } 
}
</script>

<style lang="scss" scoped>

</style>
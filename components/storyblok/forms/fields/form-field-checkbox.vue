<template>
  <forms-form-field 
    :content="content">
    <div class="wrapper">
      <input
        :id="content.id"
        :name="content.id"
        type="checkbox"
        :value="value"
        @input="onInput">
      <label 
        class="label"
        :for="content.id"> 
        {{content.label}} 
      </label>
    </div>
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
  .wrapper {
    @include row(start, center);
  }
  .label {
    @include font-size-scale(
      $default: $text-small,
      $on-tablet: $text-root,
    )
  }
</style>
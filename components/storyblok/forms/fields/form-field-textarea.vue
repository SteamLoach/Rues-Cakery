<template>
    <forms-form-field 
      :content="content">
    <label 
      class="form-field__label"
      :for="content.id">
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
      :id="content.id"
      class="form-field__textarea"
      :class="{'has-field-errors': content.fieldErrors.length}"
      :name="content.id"
      :value="value"
      :rows="content.rows"
      :maxlength="maxLength"
      :placeholder="content.placeholder"
      :disabled="disabled"
      @input="onInput">
    </textarea>
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
      required: true
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: { 
    maxLength() {
      const maxLengthRule = this.content.validations.find(item =>  [...item.validation].includes('maxLength'))
      return maxLengthRule ? maxLengthRule.params : false
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

  label {
    @include row(between, center, $space-2, $no-wrap: true);
    .character-allowance {
      font-size: $text-small;
      &.exceeds-max-length {
        color: $danger-dark;
      }
    }
  }

</style>


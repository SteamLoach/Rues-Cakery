<template>
  <utils-form-field>
    <label :for="fieldId">
      {{label}}
    </label>
    <textarea
      :id="fieldId"
      :value="value"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput">
    </textarea>
  </utils-form-field>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      required: true
    },
    rows: {
      type: [String, Number],
      default: 5,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    fieldId() {
      return this.$toolkit.kebabCase(`${this.label}-textarea`)
    },
    fieldRef() {
      return this.$toolkit.camelCase(this.label)
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

  label, textarea {
    display: block;
    width: 100%;
  }

  label {
    font-weight: $input-label-weight;
    color: $input-label-color;
  }

  textarea {
    max-width: 100%;
    padding: $space-1 $space-2;
    border: $input-border;
    &:placeholder-shown {
      font-style: italic;
    }
  }

</style>


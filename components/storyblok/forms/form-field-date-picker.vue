<template>
  <utils-form-field>
    <v-date-picker
      class="form-field-date-picker"
      :value="value"
      :min-date="minDate"
      :is-expanded="isExpanded"
      color="green"
      @popoverDidShow="updatePickerIsShown(true)"
      @popoverDidHide="updatePickerIsShown(false)"
      @input="onInput">
      <template #default="{togglePopover}">
        <storyblok-utils-ui-button 
          class="is-full-width"
          :class="{'is-filled': pickerIsShown}"
          @onClick="togglePopover()">
          <span>{{buttonText}}</span>
        </storyblok-utils-ui-button>
      </template>
    </v-date-picker>
  </utils-form-field>
</template>

<script>

export default {
  props: {
    value: {
     type: [String, Number, Date],
      required: true,
    },
    minDate: {
      type: [String, Number],
      default: ''
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: 'Select date'
    }
  },
  data() {
    return {
      pickerIsShown: false,
    }
  },
  methods: {
    updatePickerIsShown(bool) {
      this.pickerIsShown = bool;
    },
    onInput(e) {
      this.$emit('input', e);
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-field-date-picker::v-deep {
    .vc-container {
      font-family: $title-font;
    }
  }
</style>
<template>
  <!-- client only as v-date-picker references document -->
  <client-only>
    <forms-form-field :content="content">
      <label 
        class="form-field__label"
        :for="content.id"
      >
        {{content.label}}
        <sup class="required">
          {{content.isRequired ? '*required' : ''}}
        </sup>
      </label>
      <v-date-picker
        class="form-field-date-picker"
        :value="value"
        :min-date="minDate"
        :disabled-dates="disabledDates"
        color="green"
        @popoverDidShow="updatePickerIsShown(true)"
        @popoverDidHide="updatePickerIsShown(false)"
        @input="onInput">
        <template #default="{togglePopover}">
          <div 
            class="input-wrapper"
            :class="{'has-field-errors': content.fieldErrors.length}">
            <button
              class="calendar-button"
              title="Toggle date picker"
              aria-label="Toggle date picker"
              @click.prevent="togglePopover()">
              <utils-svg-loader
                :content="{icon_name: 'CalendarIcon'}">
              </utils-svg-loader>
            </button>
            <slide-y-down-transition mode="out-in">
              <input 
                :id="content.id"
                :key="formattedValue"
                :name="content.id"
                :value="formattedValue"
                readonly
                :placeholder="content.placeholder"
                @click="togglePopover()">
            </slide-y-down-transition>
            <fade-transition>
              <button 
                v-if="value"
                class="clear-button"
                @click.prevent="onInput('')">
                <utils-svg-loader
                  :content="{icon_name: 'CloseIcon'}">
                </utils-svg-loader>              
              </button>
            </fade-transition>
          </div>
        </template>
      </v-date-picker>
    </forms-form-field>
  </client-only>
</template>

<script>

export default {

  props: {
    value: {
     type: [String, Number, Date],
     default: '',
    },
    content: {
      type: Object,
      required: true,
    },
    minDate: {
      type: [String, Number],
      default: ''
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      pickerIsShown: false,
    }
  },
  computed: {
    formattedValue() {
      return this.value ? this.$dayjs(this.value).format('ddd DD MMMM YYYY') : ''
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

  .input-wrapper {
    @include container(start, center, $space-2, $no-wrap: true);
    border: $input-border;
    
    &.has-field-errors {
      border: $input-with-error-border;
      .calendar-button {
        border-right: $input-with-error-border;
        background: $danger-lighter;
        svg {
          fill: $danger-darker;
        }
      }
    }

    .calendar-button,
    .clear-button {
      padding: $space-2;
    }
    
    .calendar-button {
      border-right: $input-border;
      background: $brand-lighter;
      svg {
        min-width: $text-smaller;
        @include size($text-largest);
        fill: $brand-darker;
      }
    }

    .clear-button {
      svg {
        min-width: $text-smallest;
        @include size($text-medium);
      }
    }

    input {
      flex: 1;
      &:placeholder-shown {
        font-style: italic;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }

</style>
<template>
  <component :is="content.icon_name"></component>
</template>

<script>

import CloseIcon from '~/assets/vectors/google_close.svg?inline'
import CalendarIcon from '~/assets/vectors/calendar_two_tone.svg?inline'
import InstagramIcon from '~/assets/vectors/instagram_glyph_logo.svg?inline'
import RightChevron from '~/assets/vectors/mdi_chevron_right.svg?inline'
import UndrawWorkFromAnywhere from '~/assets/vectors/undraw_work_from_anywhere.svg?inline'

export default {

  components: {
    CloseIcon,
    CalendarIcon,
    InstagramIcon,
    RightChevron,
    UndrawWorkFromAnywhere,
  },

  props: {
    content: {
      type: Object,
      required: true,
    }
  },

}
</script>
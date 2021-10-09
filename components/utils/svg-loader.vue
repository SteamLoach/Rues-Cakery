<template>
  <component :is="content.icon_name"></component>
</template>

<script>

import InstagramIcon from '~/assets/vectors/instagram_glyph_logo.svg?inline'
import RightChevron from '~/assets/vectors/mdi_chevron_right.svg?inline'
import UndrawWorkFromAnywhere from '~/assets/vectors/undraw_work_from_anywhere.svg?inline'

export default {

  components: {
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
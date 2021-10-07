<template>
  <component :is="content.icon_name"></component>
</template>

<script>

import InstagramIcon from '~/assets/vectors/instagram-gradient.svg?inline'
import RightChevron from '~/assets/vectors/right_chevron.svg?inline'
import LeftChevron from '~/assets/vectors/left_chevron.svg?inline'

export default {

  components: {
    InstagramIcon,
    RightChevron,
    LeftChevron,
  },

  props: {
    content: {
      type: Object,
      required: true,
    }
  },

}
</script>
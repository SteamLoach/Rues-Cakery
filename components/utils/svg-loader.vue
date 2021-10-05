<template>
  <component :is="content.icon_name"></component>
</template>

<script>

import InstagramIcon from '~/assets/vectors/instagram.svg?inline'

export default {
  
  props: {
    content: {
      type: Object,
      required: true,
    }
  },

  components: {
    InstagramIcon
  }

}
</script>
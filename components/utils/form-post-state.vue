<template>
  <fade-transition mode="out-in">
    <div 
      :key="message"
      class="form-post-state">
      <utils-circle-spinner v-if="isPosting"></utils-circle-spinner>
      <span :class="{
        'success': !isPosting && hasSuccessfulPost,
        'error': !isPosting && hasAttemptedPost && !hasSuccessfulPost
      }">{{message}}</span>
    </div>
  </fade-transition>
</template>

<script>

export default{

  props: {
    content: {
      type: Object,
      default: () => ({
        button_text: 'Send',
        sending_message: 'Sending...',
        success_message: 'Thanks for your message!',
        error_message: `Something went wrong, please try again`        
      }),
    },
    isPosting: {
      type: Boolean,
      default: false,
    },
    hasAttemptedPost: {
      type: Boolean,
      default: false,
    },
    hasSuccessfulPost: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    message() {
      if(this.isPosting) {
        return this.content.sending_message
      } else if(this.hasSuccessfulPost) {
        return this.content.success_message
      } else if(this.hasAttemptedPost && !this.hasSuccessfulPost) {
        return this.content.error_message
      } else {
        return ``
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-post-state {
    @include row(center, center, $space-2);
    min-height: 30px;
    font-size: $text-small;
    font-weight: 600;

    .success {
      color: $success-darkest;
    }

    .error {
      color: $danger-dark;
    }
  }
</style>
<template>
  <div 
    v-interpolation
    class="rich-text"
    v-html="resolvedText">
  </div>
</template>

<script>

export default {

  props: {
    content: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
    }
  },

  computed: {

    isComponent() {
      return this.content ? this.content.component : false;
    },

    resolvedText() {
      if(this.content) {
        const raw = this.isComponent ? this.content.text : this.content;
        return this.$storyapi.richTextResolver.render(raw)
      } else {
        return ''
      }
    }
  }

}

</script>

<style lang="scss">

  $major-headers: 'h1', 'h2', 'h3';
  $minor-headers: 'h4', 'h5', 'h6';
  $copy-components: 'p', 'ul', 'ol';

  $major-copy-headers:
    "p + h1",
    "p + h2", "p + h3",
    "ul + h2", "ul + h3",
    "ol + h2", "ol + h3";

  $minor-copy-headers:
    "p + h4", "p + h5", "p + h6",
    "ul + h4", "ul + h5", "ul + h6",
    "ol + h4", "ol + h5", "ul + h6";

  .rich-text {
    max-width: $medium-width;
    @include font-size-scale(
      $default: $text-small,
      $on-tablet: $text-body
    );

    .brand {
      color: $brand-dark;
      .dark-mode & {
        color: $brand-light;
      }
    }

    .accent {
      color: $accent-dark;
      .dark-mode & {
        color: $accent-base;
      }
    }

    h1 {
      @include font-size-scale(
        $default: $title-large,
        $on-tablet: title-larger,
      )
    }
    h2 {
      @include font-size-scale(
        $default: $title-medium,
        $on-tablet: $title-large,
      );
    }
    h3 {
      font-size: $title-small;
    }
    h4 {
      font-size: $title-smaller;
    }
    h5, h6 {
      font-size: $title-smallest;
    }

    &.margin-bottom-light {
      margin-bottom: $space-4;
    }

    &.margin-bottom-medium {
      margin-bottom: $space-6;
    }

    &.margin-bottom-heavy {
      margin-bottom: $space-8;
    }


    #{$major-headers} {
      margin-bottom: $space-5;
    }
    #{$minor-headers} {
      margin-bottom: $space-2;
    }

    #{$major-copy-headers} {
      margin-top: $space-5;
    }
    #{$minor-copy-headers} {
      margin-top: $space-4;
    }

    #{$copy-components} {
      margin-bottom: $space-3;
    }

    ul {
      list-style-type: disc;
    }

    ul, ol {
      padding-left: $space-6;
      li {
        margin-bottom: $space-1;
        p {margin-bottom: 0;}
      }
    }

    a {
      color: $brand-dark;
      &:hover {
        text-decoration: underline;
      }
    }

    &.small-copy-size {
      @include font-size-scale(
        $default: $text-smaller,
        $on-tablet: $text-small
      );
      h3 {
        font-size: $title-smaller;
        margin-bottom: $space-3;
      }
      h4 {
        font-size: $title-smallest;
      }
      h5 {
        font-size: $text-body;
      }
      h6 {
        font-size: $text-root;
      }
      #{$minor-headers} {
        margin-bottom: $space-1;
      }
      #{$minor-copy-headers} {
        margin-top: $space-3;
      }
      #{$copy-components} {
        margin-bottom: $space-1;
      }
      ul, ol {
        padding-left: $space-5;
      }
    }

    img {
      max-height: 90vh;
      margin: $space-8 auto;
    }

    &.thumbnail-images {
      img {
        @include media-from($tablet, max-width, 25%);
      }
    }

    &.small-images {
      img {
        @include media-from($tablet, max-width, 50%);
      }
    }

    &.medium-images {
      img {
        @include media-from($tablet, max-width, 75%);
      }
    }

    &.large-images {
      img {
        @include media-from($tablet, max-width, 90%);
      }
    }

    &.styled-images {
      img {
        border-radius: $space-1;
        @include shadow($elevation-light);
      }
    }

  }


</style>
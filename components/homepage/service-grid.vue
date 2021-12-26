<template>
  <layout-wrappers-content-panel class="extra-wide-content">
    <div class="service-grid">
      <div v-for="orientation in assetOrientations"
          :key="`${orientation}-orientation`"
          :class="`${orientation}-assets`">
          <div 
            v-for="(asset, index) in content[`${orientation}_assets`]"
            :key="`${orientation}-asset-${index}`"
            :class="`${orientation}-asset`"
            :style="$toolkit.setBackgroundImage(asset.src)">
              <nuxt-link 
                :to="asset.link_href"
                class="service-link">
                <span>{{asset.link_text}}</span>
                <utils-svg-loader :content="{icon_name: 'RightChevron'}" />
              </nuxt-link>
          </div>
      </div>
    </div>  
  </layout-wrappers-content-panel>  
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      assetOrientations: [
        'landscape',
        'portrait',
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

  .service-grid {
    @include row(center, center);
    @include height-scale(
      $default: 650px,
      $on-tablet: 750px,
    );
    max-width: $extra-wide-width;
  }

  .landscape-assets {
    @include container(center, center);
    @include height-scale(
      $default: calc((100% / 3) * 2),
      $on-tablet: 100%,
    );
    @include media-from($tablet, flex, 2);
    @include media-from($tablet, margin-right, $space-4);
  }

  @media screen and (min-width: $tablet) {
    .landscape-asset:first-child {
      margin-bottom: $space-4;
    }
  }

  .portrait-assets {
    @include media-from($tablet, flex, 1);
    @include height-scale(
      $default: calc(100% / 3),
      $on-tablet: 100%,
    );
  }

  .landscape-assets,
  .portrait-assets {
    @include media-until($tablet, width, 100%);
  }

  .landscape-asset,
  .portrait-asset {
    width: 100%;
    @include pad-scale(
      xy,
      $default: $space-2,
    );
    @include background-image();
  }

  .landscape-asset {
    @include container(start, end);
    height: calc(50% - $space-2);
  }

  .portrait-asset {
    @include container(start, end);
    @include container-from($tablet, center, end);
    height: 100%;
  }

  .service-link {
    @include container(start, center, $space-1);
    padding: $space-2 $space-3;
    color: $title-color;
    font-weight: 600;
    background: rgba($page-background, 0.8);
    border: 1px solid $title-color;
    @include shadow($elevation-lightest);
    @include transition(background, .2s);
    svg {
      @include size($text-medium);
      fill: $text-color;
      @include transition(left, .1s);
    }
    &:hover {
      background: rgba($page-background, 1);
    }
  }

</style>
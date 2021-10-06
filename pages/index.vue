<template>
  <div class="page-wrapper">
    <header>
      <h1>Rue's Cakery</h1>
      <div class="media-grid">
        <div class="landscape">
          <div 
            v-for="(asset, index) in landscapeAssets"
            :key="`landscape-${index}`"
            class="landscape-image"
            :style="$toolkit.setBackgroundImage(`${asset}`)">
          </div>  
        </div>
        <div class="portrait">
          <div
            class="portrait-image" 
            :style="$toolkit.setBackgroundImage(portraitAssets[0])">
          </div>
        </div>
      </div>
    </header>
    <main>

    </main>
  </div>
</template>

<script>

export default {

  data() {
    return {
      landscapeAssets: [
        "/placeholder-images/cake-placeholder-landscape.jpg",
        "/placeholder-images/cupcake-placeholder-landscape.jpg"
      ],
      portraitAssets: [
        "/placeholder-images/cheesecake-placeholder-portrait.jpg"
      ]
    }
  }

}

</script>

<style lang="scss" scoped>

header {
  @include row(center, center);
}

h1 {
  margin-bottom: $space-6;
}

.media-grid {
  @include row(center, center, $space-4);
  @include height-scale(
    $default: 650px,
    $on-tablet: 750px,
  );

  .landscape {
    @include container(center, center, $space-4);
    @include column-scale(
      $default: 24,
      $on-tablet: 14,
    );
    @include height-scale(
      $default: calc((100% / 3) * 2),
      $on-tablet: 100%,
    );
  }

  .portrait {
    @include column-scale(
      $default: 24,
      $on-tablet: 9,
    );
    @include height-scale(
      $default: calc(100% / 3),
      $on-tablet: 100%,
    );
  }

  .landscape-image,
  .portrait-image {
    @include background-image();
    width: 100%;
  }

  .landscape-image {
    height: calc(50% - $space-2);
  }

  .portrait-image {
    height: 100%;
  }

}

</style>
<template>
  <section class="content-panel order-process">
    <div class="inner">
      <ul class="steps">
        <h2>{{content.title}}</h2>
        <li 
          v-for="(step, index) in content.steps"
          :key="`step-${index}`"
          class="step">
          <h3>{{index + 1}}. {{step.title}}</h3>
          <p>{{step.body}}</p>
        </li>
      </ul>
      <div class="graphic">
        <utils-svg-loader :content="{icon_name: 'UndrawWorkFromAnywhere'}" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  }

}
</script>

<style lang="scss" scoped>

  .order-process {
    @include y-pad($space-6);
    background-color: $brand-lightest;
  }

  .inner {
    @include row(center, center);
    padding: $space-6;
    max-width: $extra-wide-width;
    border-radius: $space-4;
    //@include shadow($elevation-light);
  }

  h2 {
    width: 100%;
    font-size: $title-large;
    margin-bottom: $space-6;
  }

  .steps {
    @include column-scale(
      $default: 24,
      $on-laptop: 12,
    );
    @include pad-scale(
      right,
      $on-tablet: $space-4,
      $on-laptop: $space-6,
    );
    @include media-until($laptop, margin-bottom, $space-5);
  }

  .graphic {
    @include column-scale(
      $default: 24,
      $on-tablet: 20,
      $on-laptop: 12,
    )
  }

  .step {
    margin-bottom: $space-4;
    h3 {
      margin-bottom: $space-1;
    }
  }

</style>
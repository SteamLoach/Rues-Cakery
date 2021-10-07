<template>
  <div class="page-wrapper">
    <header>
      <h1>Rue's Cakery</h1>
      <homepage-service-grid :content="service_grid" />
    </header>
    <main>

    </main>
  </div>
</template>

<script>

export default {

  data() {
    return {
      service_grid: {
        landscape_assets: [
          {
            src: "/placeholder-images/cake-placeholder-landscape.jpg",
            link_text: 'Cakes',
            link_href: '/cakes',
          },
          {
            src: "/placeholder-images/cupcake-placeholder-landscape.jpg",
            link_text: 'Cupcakes',
            link_href: '/cupcakes',            
          }
          
          
        ],
        portrait_assets: [
          {
            src: "/placeholder-images/cheesecake-placeholder-portrait.jpg",
            link_text: 'Cheesecakes',
            link_href: '/cheesecakes',            
          }
        ]
      }
    }
  }

}

</script>

<style lang="scss" scoped>

  header {
    @include row(center, center, $direction: column);
  }

  h1 {
    margin-bottom: $space-6;
  }

</style>
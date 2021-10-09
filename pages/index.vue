<template>
  <div class="page-wrapper">
    <header>
      <h1>Rue's Cakery</h1>
      <homepage-service-grid :content="service_grid" />
      <homepage-order-process :content="order_process" />
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
      },
      order_process: {
        title: 'How It Works',
        steps: [
          {
            title: 'Send your enquiry',
            body: 'Customise your Cake, Cheesecake, or Cupcakes and send in your enquiry. The more information you can provide, the better. Please note that all prices at this stage are estimates and are likely to change.'
          },
          {
            title: 'Confirm your order',
            body: "We'll be in touch to discuss the specifics of your order and confirm a final price."
          },
          {
            title: 'Put down a deposit',
            body: "All orders require a 50% deposit before we can start baking"
          },
          {
            title: 'Pickup or Delivery',
            body: "Once your order is ready you can come and collect it, or it'll be delivered depending on what was agreed in step two."
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
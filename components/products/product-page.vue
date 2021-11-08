<template>
  <!--
    Header and enquiry form share some common params so are both
    given the product page as content
  -->
  <div class="page-wrapper">
    <!-- Product Header -->
    <component
      :is="item.component"
      v-for="item in content.product_header"
      :key="item._uid" 
      v-editable="item"
      :content="content">
    </component>
    <main>
      <!-- Enquiry Form -->
      <component
        :is="item.component"
        v-for="item in content.enquiry_form"
        :key="item._uid" 
        v-editable="item"
        :content="content">
      </component>
    </main> 
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    }
  }  
}
</script>

<style lang="scss" scoped>

</style>
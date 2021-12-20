<template>
   <div class="vld-parent">
      <loading v-model="isLoading" :can-cancel="false" :is-full-page="fullPage" />
   </div>
</template>

<script>
   import Loading from 'vue-loading-overlay'
   import 'vue-loading-overlay/dist/vue-loading.css'

export default {
   name: 'loading-overlay',
   components: {
      Loading
   },
   data() {
      return {
         isLoading: false,
         fullPage: true
      }
   },
   created() {
      this.isLoading
   },
   methods: {
      doLoading() {
         this.isLoading = true
      }
   },
   destroyed() {
      this.isLoading = false
   }
}
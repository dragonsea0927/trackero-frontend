<template>
   <div id="app">
      <main :style="setBg">
         <app-header v-if="!isHomePage && !isLoginPage && loggedUser" />
         <router-view />
         <!-- <loading-overlay v-else /> -->
         <!-- {{ loggedUser }} -->
      </main>
   </div>
</template>

<script>
import appHeader from '@/cmps/app-header'
// import loadingOverlay from '@/cmps/loading-overlay'

export default {
   components: {
      appHeader,
      // loadingOverlay
   },
   data() {
      return {
      }
   },
   created() {
      this.$store.dispatch({ type: 'loadUsers' })
   },
   computed: {
      setBg() {
         const currBoard = this.$store.getters.currBoard
         let bg = null
         if (currBoard) {
            const regexp = new RegExp('https?:\/\/')
            bg = (currBoard.style.bgColor.match(regexp))
               ? 'backgroundImage:' + currBoard.style.bgColor
               : `backgroundColor: ${currBoard.style.bgColor}`
         } else bg = 'backgroungColor: #fff'
         return bg
      },
      loggedUser() {
         return this.$store.getters.currLoggedUser
      },
      isHomePage() {
         return this.$route.name === 'home' ? true : false
      },
      isLoginPage() {
         return this.$route.name === 'login' ? true : false
      },
   }
}
</script>
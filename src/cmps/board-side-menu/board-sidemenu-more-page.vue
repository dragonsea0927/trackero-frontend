<template>
   <component :is="currCmp" @changeCmp="setCurrCmp" :board="board" />
</template>

<script>
import sidemenuMoreDynamic from '@/cmps/dynamic/board-side-menu/sidemenu-more'

export default {
   name: 'menu-more-page',
   props: {
      board: Object, required: true,
   },
   components: {
      sidemenuMoreDynamic,
   },
   data() {
      return {
         currCmp: 'sidemenu-more-dynamic'
      }
   },
   methods: {
      setCurrCmp(cmp) {
         this.currCmp = cmp
      }
   },
   computed: {
   }
}
</script>
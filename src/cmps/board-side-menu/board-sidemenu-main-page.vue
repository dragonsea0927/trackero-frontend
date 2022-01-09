<template>
<div>
   <component :title="checkCmp" @changeCmp="setCurrCmp" :is="currCmp" :board="board" :moreOptions="moreOptions"></component>
   <hr class="board-menu-header-divider" />
</div>
</template>

<script>
import sidemenuMainDynamic from '@/cmps/dynamic/board-side-menu/sidemenu-main'
import aboutBoardCmp from '@/cmps/dynamic/board-side-menu/sidemenu-about'
import changeBgcCmp from '@/cmps/dynamic/board-side-menu/sidemenu-boardbg'
// import labelsList from './dynamic/task-details-cmps/labels-list'
import archiveCmp from '@/cmps/dynamic/board-side-menu/sidemenu-archived'
import loginVue from '../../views/login.vue'

export default {
   name: 'menu-main-page',
   props: {
      board: Object, required: true,
      moreOptions: Function, required: true,
      isBoardMainPage: Boolean, required: true,
   },
   components: {
      sidemenuMainDynamic,
      aboutBoardCmp,
      changeBgcCmp,
      // labelsList,
      archiveCmp
   },
   data() {
      return {
         currCmp: 'sidemenu-main-dynamic'
      }
   },
   methods: {
      setCurrCmp(cmp) {
         this.currCmp = cmp
         this.$emit('innerPages', cmp)
      }
   },
   computed: {
      checkCmp() {
         if (this.isBoardMainPage) this.currCmp = 'sidemenu-main-dynamic'
      }
   }
}
</script>
<template>
   <div class="board-background-section-tiles clearfix">
      <template v-if="!currCmp">
         <div @click="openPhotos" class="board-background-section-tile board-background-photos-tile">
            <div :style="{'background-image': 'url(https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg)'}" class="image"></div>
            <div class="title">Photos</div>
         </div>
         <div @click="openColors" class="board-background-section-tile board-colors-photos-tile">
            <div :style="{'background-image': 'url(https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg)'}" class="image"></div>
            <div class="title">Colors</div>
         </div>
      </template>
      <component v-else :is="currCmp" :board="board" />
   </div>
</template>

<script>
import openColors from '@/cmps/dynamic/board-side-menu/sidemenu-colors'
import openPhotos from '@/cmps/dynamic/board-side-menu/sidemenu-photos'

export default {
   name: 'changeBgcCmp',
   props: {
      board: Object, required: true,
      moreOptions: Function, required: true,
   },
   components: {
      openColors,
      openPhotos
   },
   data() {
      return {
         currCmp: null,
         isBoardMainPage: true,
      }
   },
   methods: {
      openPhotos() {
         this.currCmp = 'openPhotos'
      },
      openColors() {
         this.currCmp = 'openColors'
      },
   }
}
</script>
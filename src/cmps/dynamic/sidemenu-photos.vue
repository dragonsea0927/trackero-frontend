<template>
   <div class="board-backgrounds-photos">
      <div class="search-photos">
         <input type="text" placeholder="Photos" />
         <span class="icon-sm icon-search"></span>
      </div>
      <div class="board-background-list-observer">
         <div class="board-backgrounds-list">
            <template v-for="(photo,idx) in photos">
               <div @click="selectBg(photo.urls.regular)" class="board-background-select" :key="idx">
                  <span class="background-box" :style="{'backgroundImage':`url(${photo.urls.regular})`}"></span>
               </div>
            </template>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'openPhotos',
   props: {
      board: Object, required: true,
   },
   created(){
       this.$store.dispatch({type:'fetchPhotos'})
   },
   methods: {
      selectBg(url) {
         this.$store.dispatch('changeBoardBgc', {bgc:`url('${url}&fm=jpg&fit=crop&w=1080&q=80&fit=max')`})
      }

   },
   computed:{
      photos(){
         return this.$store.getters.photos
      }
   }
}
</script>
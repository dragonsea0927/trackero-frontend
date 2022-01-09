<template>
   <div>
      <template v-for="(color,idx) in colors">
         <div class="board-backgrounds-section-tile board-backgrounds-section-tile-large" :key="idx">
            <div class="image" @click="selectColor(idx)" :style="{ backgroundColor: color }"></div>
         </div>
      </template>
   </div>
</template>

<script>
export default {
   name: 'openColors',
   props: {
      board: Object, required: true,
      info:  Object,
   },
   data() {
      return {
         colors: {
            'blue':'#0079bf',
            'orange':'#d29034',
            'green':'#519839',
            'red':'#b04632',
            'purple':'#89609e',
            'pink':'#cd5a91',
            'lightgreen':'#4bbf6b',
            'cyan':'#00aecc',
            'grayblue':'#838c91',
            'navy':'#172B4D'
         }
      }
   },
   methods: {
      selectColor(color) {
         if(!this.info) this.$store.dispatch('changeBoardBgc', { bgc: this.colors[color] })
         else this.$emit('changeTaskCover',this.colors[color])
      }
   }
}
</script>
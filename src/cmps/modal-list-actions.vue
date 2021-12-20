<template>
   <div
      :class="popOverClasses"
      :style="{
         top: 44 + 'px',
         left: 235 + 'px',
         'background-color': '#fff',
      }"
   >
      <div class="no-back">
         <div class="pop-over-header">
            <span class="pop-over-header-title">List actions</span>
            <span @click="closeModal" class="icon-sm pop-over-header-close-btn">
            </span>
         </div>
         <div>
            <div class="pop-over-content" :style="{ 'max-height': 350 + 'px' }">
               <div>
                  <div>
                     <ul class="pop-over-list">
                        <li>
                           <a class="js-add-card" @click="addTask" href="#"
                              >Add card…</a
                           >
                        </li>
                        <li>
                           <a class="js-delete-list" @click="deleteGroup">
                              Archive this list</a
                           >
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: ['group', 'board'],
   name: 'modalListActions',
   data() {
      return {
         isOptionsListOpen: true,
      }
   },
   methods: {
      closeModal() {
         this.$emit('closeModal')
      },
      addTask() {
         this.$emit('openAddTask')
         this.isOptionsListOpen = false
         this.closeModal()

      },
      async deleteGroup() {
         try {
            const groupId = this.group.id
            await this.$store.dispatch({ type: 'removeGroup', groupId })
            this.isOptionsListOpen = false
            this.closeModal()
         } catch (err) {
            console.log(err)
         }
      },
   },
   computed: {
      popOverClasses() {
         if (this.isOptionsListOpen) return 'pop-over is-shown'
         return 'pop-over'
      }
   }
}
</script>


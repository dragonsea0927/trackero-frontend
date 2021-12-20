<template>
   <section class="group-preview-container">
      <section class="group-header-section">
         <h2
            @mousedown="closeOptions"
            v-if="isEditable === false"
            @mouseup="toggleEditing"
            class="group-header-title-assist"
         >
            {{ group.title }}
         </h2>
         <textarea
            v-else
            ref="textareainp"
            class="group-header-title-textarea"
            :class="{ 'is-editing': isTitleInputOpen }"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="updateGroupTitle"
            @focus="titleInputFocus"
            @blur="updateGroupTitle"
            :value="group.title"
         ></textarea>
         <div class="group-header-options">
            <button @click="toggleOptions">
               <img :src="require(`@/assets/img/option.png`)" />
            </button>
         </div>
         <modal-list-actions
            v-if="this.isOptionsListOpen"
            :group="group"
            :board="board"
            @closeModal="toggleOptions"
            @openAddTask="toggleInput"
         />
      </section>

      <Container
         orientation="vertical"
         class="group-tasks-section"
         drag-class="card-ghost"
         drop-class="card-ghost-drop"
         group-name="2"
         :get-child-payload="getChildPayload"
         @drop="onDrop(group.tasks, $event)"
         :drop-placeholder="dropPlaceholderOptions"
         drag-handle-selector=".list-card"
      >
         <Draggable v-for="task in group.tasks" :key="task.id">
            <task-preview
               @openPreviewEdit="openPreviewEdit"
               :task="task"
               :board="board"
               :group="group"
            />
         </Draggable>
         <!-- <draggable class="group-tasks-section" v-model="tasksList" group="group" draggable=".list-card">
         <template v-for="task in group.tasks">
            <task-preview @openPreviewEdit="openPreviewEdit" :task="task" :board="board" :group="group" :key="task.id"> </task-preview>
         </template> -->

         <div class="task-composer-container">
            <div v-if="isTaskInputOpen" class="card-composer-open">
               <div class="add-task-input-section">
                  <div class="add-task-input-details group-task-link">
                     <!-- <textarea type="text" class="add-task-input"
                        v-model="taskInput" placeholder="Enter a title for this card..." /> -->
                     <textarea
                        class="add-task-input"
                        v-model="taskInput"
                        type="text"
                        @keydown.enter.exact.prevent
                        @keyup.enter.exact="addTask"
                        placeholder="Enter a title for this card..."
                     />
                  </div>
               </div>
               <div class="add-task-control-section">
                  <button @click="addTask" class="add-card-confirm-btn">
                     Add card
                  </button>
                  <span @click="toggleInput" class="cancel-add-card">
                     <img src="@/assets/img/cancel-icon.svg" />
                  </span>
               </div>
            </div>
         </div>
     </Container>
      <div v-if="!isTaskInputOpen" @click="toggleInput" class="add-task-button">
         <a class="card-composer">
            <span class="add-task-plus-icon">
               <img src="@/assets/img/plus-icon.svg" />
            </span>
            <span class="add-task-span">Add a card</span>
         </a>
      </div>
   </section>
</template>

<script>
import { showMsg } from '@/services/event-bus-service.js'
// import draggable from 'vuedraggable'
import taskPreview from './task-preview.vue'
import modalListActions from './modal-list-actions.vue'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/services/applyDrag.js'

export default {
   props: ['group', 'board'],
   name: 'groupPreview',
   components: {
      // draggable,
      taskPreview,
      modalListActions,
      Container,
      Draggable
   },
   data() {
      return {
         isOptionsListOpen: false,
         isTaskInputOpen: false,
         isTitleInputOpen: false,
         taskInput: '',
         groupToEdit: null,
         isEditable: false,
         isPreviewEdit: false,
         currTask: null,
         task: null,
         dropPlaceholderOptions: {
            className: "drop-preview",
            animationDuration: "0",
            showOnTop: true
         },
      }
   },
   methods: {
      toggleOptions() {
         this.isOptionsListOpen = !this.isOptionsListOpen
      },
      toggleInput() {
         this.isTaskInputOpen = !this.isTaskInputOpen
         this.isOptionsListOpen = false
      },
      closeOptions(){
         this.isOptionsListOpen = false
      },
      async addTask() {
         try {
            if (!this.taskInput) return
            const groupId = this.group.id
            const newTask = await this.$store.dispatch('addTask', { groupId, title: this.taskInput })
            this.isTaskInputOpen = false
            this.taskInput = ''
            if (newTask) showMsg(`task added `)
            else showMsg(`Yoy are not allowed to add task`, 'danger')
         } catch (err) {
            console.log(err)
         }
      },
      async deleteGroup() {
         try {
            const groupId = this.group.id
            const deletedId = this.$store.dispatch({ type: 'removeGroup', groupId })
            this.isOptionsListOpen = false
            if (deletedId) showMsg(`group removed ${deletedId}`)
            else showMsg(`Yoy are not allowed to remove group`, 'danger')
         } catch (err) {
            console.log(err)
         }
      },
      async updateGroupTitle(ev) {
         try {
            this.closeOptions()
            this.isTitleInputOpen = false
            this.isEditable = false
            ev.target.blur()
            this.groupToEdit.title = ev.target.value
            this.$store.dispatch({ type: 'updateGroup', group: this.groupToEdit })
         } catch (err) {
            console.log(err)
         }
      },
      titleInputFocus(ev) {
         this.isTitleInputOpen = true
         ev.target.select()
         // this.groupToEdit = JSON.parse(JSON.stringify(this.group))
         this.groupToEdit = this.group
      },
      toggleModal(ev) {
         this.$emit('toggleModal', ev)
      },
      toggleEditing(ev) {
         this.closeOptions()
         this.isEditable = true
         ev.target.style.display = 'none'
         this.$nextTick(() => {
            this.$refs.textareainp.select()
         })
      },
      openPreviewEdit(group, task, modalPos) {
         this.task = task
         this.isPreviewEdit = true
         this.$emit('onlyOneEdit', group, task, modalPos)
      },
      onDrop(items, dropResult) {
         const tasks = applyDrag(items, dropResult)
         this.group.tasks = tasks
         this.$store.dispatch({ type: 'updateGroup', group: this.group })
      },
      getChildPayload(index) {
         return this.group.tasks[index]
      },
   },
   computed: {
      // tasksList: {
      //    get() {
      //       return this.group.tasks
      //    },
      //    set(tasks) {
      //       this.$store.dispatch('updateTaskPositions', { tasks, group: this.group })
      //    }
      // }
   },
}

</script>

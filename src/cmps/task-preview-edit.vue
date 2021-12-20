<template>
   <div
      v-if="taskToEdit"
      class="quick-card-editor"
      @click.prevent.self="closePreviewEdit()"
   >

      <span
         @click="closePreviewEdit"
         class="icon-lg icon-close quick-card-editor-close-icon"
      >
      </span>
      <div
         class="quick-card-editor-card"
         :style="{ left: modalPos.left + 'px', top: modalPos.top + 'px' }"
      >
         
         <div
            class="list-card list-card-quick-edit js-stop"
            style="width: 256px"
         >
        
            <!-- <div
               v-if="taskCover"
               class="list-card-cover"
               :style="{
                  backgroundColor: taskToEdit.style.bgColor,
                  height: isHeight + 'px',
               }"
            ></div> -->
            <div
               v-if="taskCover"
               class="list-card-cover"
               :style="taskCover"
               :class="{ img: task.style.url }"
            >
              
            </div>
            
            <div class="list-card-details">
               
               <div
                  v-if="taskToEdit.labels && taskToEdit.labels.length"
                  class="list-card-labels"
               >
              
                  <span
                     v-for="label in taskToEdit.labels"
                     :key="label.id"
                     class="card-label"
                     :class="'label-' + label.color"
                  >
                     <span class="label-text">{{ label.title }}</span>
                  </span>
               </div>

               <textarea-autosize
                  class="list-card-edit-title"
                  @focus="titleInputFocus"
                  v-model="taskToEdit.title"
               />
              
               <!-- <textarea
                  class="list-card-edit-title"
                  @keydown.enter.exact.prevent
                  @keyup.enter.exact="updateTaskTitle"
                  @focus="titleInputFocus"
                  @blur="updateTaskTitle"
                  :value="taskToEdit.title"
               /> -->

               <!-- badges -->
               <div class="badges">
                  <span class="js-badges">
                     <div
                        v-if="isWatchingBadge"
                        class="badge"
                        title="You are watching this card."
                     >
                        <span class="badge-icon icon-sm icon-subscribe"></span>
                     </div>
                     <div
                        v-if="isDatesBadge"
                        class="badge is-due-soon"
                        title="This card is due in less than twenty-four hours."
                     >
                        <span
                           class="
                              badge-icon
                              icon-sm icon-clock
                              badge-due-icon
                              is-due-soon-span
                           "
                        ></span>
                        <span class="badge-text js-due-date-text">
                           {{ organizedDates }}
                        </span>
                     </div>
                     <div
                        v-if="taskToEdit.description"
                        class="badge is-icon-only"
                        title="This card has a description."
                     >
                        <span
                           class="badge-icon icon-sm icon-description"
                        ></span>
                     </div>
                     <div
                        v-if="taskToEdit.comments && taskToEdit.comments.length"
                        class="badge is-icon-only"
                        title="Comments"
                     >
                        <span class="badge-icon icon-sm icon-comment"></span>
                        <span class="badge-text">{{
                           taskToEdit.comments.length
                        }}</span>
                     </div>
                     <div
                        v-if="
                           taskToEdit.attachments &&
                           taskToEdit.attachments.length
                        "
                        class="badge"
                        title="Attachments"
                     >
                        <span class="badge-icon icon-sm icon-attachment"></span>
                        <span class="badge-text">{{
                           taskToEdit.attachments.length
                        }}</span>
                     </div>
                     <div
                        v-if="taskToEdit.location.id"
                        class="badge"
                        title="This card has a location."
                     >
                        <span class="badge-icon icon-sm icon-location"></span>
                     </div>
                     <div
                        v-if="isChecklist"
                        class="badge"
                        title="Checklist items"
                     >
                        <span class="badge-icon icon-sm icon-checklist"></span>
                        <span class="badge-text">{{ checklistItems }}</span>
                     </div>
                  </span>
               </div>

               <!-- task-members -->
               <div
                  div
                  v-if="taskToEdit.members && taskToEdit.members.length"
                  class="task-detail-members-list list-card-members"
               >
                  <a
                     class="member"
                     v-for="member in taskToEdit.members"
                     :key="member._id"
                     style="float: left"
                  >
                     <avatar
                        :src="member.imgUrl"
                        :size="28"
                        :username="member.fullname"
                        :title="`${member.fullname}(${member.username})`"
                     />
                  </a>
               </div>
            </div>
         </div>
         <button
            class="nch-button nch-button-primary wide js-save-edits"
            type="submit"
            @click="updateTask('save')"
         >
            Save
         </button>
         <div class="quick-card-editor-buttons fade-in">
            <router-link
               :to="'/board/' + boardId + '/' + groupId + '/' + taskId"
               class="quick-card-editor-buttons-item"
            >
               <span class="icon-sm icon-card light"></span>
               <span class="quick-card-editor-buttons-item-text"
                  >Open card</span
               >
            </router-link>
            <task-opts-list
               v-if="isListOpen"
               :info="info"
               @removeMember="removeTaskMember"
               @addMember="addTaskMember"
               @removeLabel="removeTaskLabel"
               @addLabel="addTaskLabel"
               @closeList="closeList"
               @changeTaskCover="toggleTaskCover"
               @removeTaskCover="toggleTaskCover"
            />
            <a
               @click="toggleListCmp($event, 'labels-list')"
               class="quick-card-editor-buttons-item js-edit-labels"
            >
               <span class="icon-sm icon-label light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Edit labels
               </span>
            </a>
            
            <a
               @click="toggleListCmp($event, 'members-list')"
               class="quick-card-editor-buttons-item js-edit-members"
            >
               <span class="icon-sm icon-member light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Change members
               </span>
            </a>
             
            <a
               @click="toggleListCmp($event, 'cover-menu')"
               class="quick-card-editor-buttons-item js-edit-cover"
            >
               <span class="icon-sm icon-card-cover light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Change cover
               </span>
            </a>
            <!-- <a class="quick-card-editor-buttons-item js-move-card">
               <span class="icon-sm icon-move light"></span>
               <span class="quick-card-editor-buttons-item-text"> Move </span>
            </a>
            <a class="quick-card-editor-buttons-item js-copy-card">
               <span class="icon-sm icon-card light"></span>
               <span class="quick-card-editor-buttons-item-text"> Copy</span>
            </a> -->
            <a
               @click="toggleListCmp($event, 'date-picker')"
               class="quick-card-editor-buttons-item js-edit-due-date"
            >
               <span class="icon-sm icon-clock light"> </span>
               <span class="quick-card-editor-buttons-item-text">
                  Edit dates
               </span>
            </a>
            <a
               @click="archiveTask"
               class="quick-card-editor-buttons-item js-archive"
            >
               <span class="icon-sm icon-archive light"></span>
               <span class="quick-card-editor-buttons-item-text">
                  Archive
               </span>
            </a>
         </div>
      </div>
         
   </div>
</template>

<script>
import Avatar from 'vue-avatar'
import taskOptsList from './task-opts-list'

export default {
   name: 'task-edit',
   props: ['task', 'group', 'board', 'modalPos'],
   components: {
      Avatar,
      taskOptsList

   },
   data() {
      return {
         groupTitle: '',
         taskId: '',
         currLoggedUser: null,
         boardId: '',
         groupId: '',
         isTitleInputOpen: false,
         taskInput: '',
         taskToEdit: null,
         isEditable: false,
         isListOpen: false,
         loggedInUser: null,
         info: {
            type: null,
            task: null,
            groupId: this.groupId,
            modalPos: {
               posX: null,
               posY: null,
            },
         },
      }
   },
   created() {
      this.taskToEdit = JSON.parse(JSON.stringify(this.task))
      this.groupId = this.group.id
      this.boardId = this.board._id
      this.taskId = this.task.id
      this.info.task = this.taskToEdit
      this.loggedInUser = this.$store.getters.currLoggedUser
   },
   methods: {
      closePreviewEdit() {
         this.$emit('closePreviewEdit')
      },
      titleInputFocus(ev) {
         this.isTitleInputOpen = true
         ev.target.select()
      },
      toggleEditing(ev) {
         this.isEditable = true
         ev.target.style.display = 'none'
      },
      archiveTask() {
         this.taskToEdit.isArchived = true
         this.updateTask()
         this.closePreviewEdit()
      },
      toggleListCmp(ev, cmpName) {
         if (cmpName === this.info.type) {
            this.isListOpen = false
            this.info.type = null
            return
         } else {
            this.$nextTick(() => {
               this.isListOpen = true
               this.info.modalPos.posY = ev.pageY + 20 // top
               this.info.modalPos.posX = ev.pageX - 15 // left
               this.info.type = cmpName
            })
         }
      },
      closeList() {
         this.isListOpen = false
      },
      addActivity(txt) {
         const activity = {
            txt,
            byMember: this.loggedInUser,
            createdAt: Date.now(),
         }
         this.taskToEdit.activities.unshift(activity)
      },
      updateTask(action) {
         const groupId = this.groupId
         const task = this.taskToEdit
         this.$store.dispatch({ type: 'updateTask', groupId, task })
         if (action === 'save') this.closePreviewEdit()
      },
      addTaskMember(user) {
         if (user) this.taskToEdit.members.push(user)
         this.addActivity(`added ${user.fullname} to this task`)
      },
      removeTaskMember(user) {
         const memberIdx = this.taskToEdit.members.findIndex(member => member._id === user._id)
         if (user) this.taskToEdit.members.splice(memberIdx, 1)
         this.addActivity(`removed ${user.fullname} from this task`)
      },
      removeTaskLabel(label) {
         const labelIdx = this.taskToEdit.labels.findIndex(currLabel => currLabel.id === label.id)
         if (label) this.taskToEdit.labels.splice(labelIdx, 1)
         this.addActivity(`Removed label ${label.title} from this task`)
      },
      addTaskLabel(label) {
         if (label) this.taskToEdit.labels.push(label)
         this.addActivity(`Labeled this task as ${label.title}`)
      },
      toggleTaskCover(color) {
         if (color) {
            this.taskToEdit.style.bgColor = color
            this.addActivity(`Changed this task cover`)
         } else {
            this.taskToEdit.style.bgColor = '#ffffff'
            this.taskToEdit.style.url = ''
            this.addActivity(`Removed this task cover`)
         }
         this.updateTask()
      },
   },
   computed: {
      labelsHeight() {
         // if (this.board.isLabelsShown) return 16
         // return 8
         return 16
      },
      isWatchingBadge() {
         this.currLoggedUser = this.$store.getters.currLoggedUser
         const idx = this.taskToEdit.members.findIndex(member => member._id === this.currLoggedUser._id)
         if (idx !== -1) return true
      },
      isDatesBadge() {
         // if (this.task.startDate || this.task.dueDate) return true
         if (this.taskToEdit.startDate.date || this.taskToEdit.dueDate.date) return true
      },
      organizedDates() {
         if (this.taskToEdit.startDate.date && this.taskToEdit.dueDate.date) {
            const from = this.taskToEdit.startDate.date.slice(0, 6)
            const to = this.taskToEdit.dueDate.date.slice(0, 6)
            return `${from}-${to}`
         } else if (this.taskToEdit.startDate.date) return this.taskToEdit.startDate.date.slice(0, 6)
         return this.taskToEdit.dueDate.date.slice(0, 6)
      },
      checklistItems() {
         // Currently checks only the first checklist and not all checklists in TODO
         let count = 0
         this.taskToEdit.checklists[0].todos.forEach(todo => {
            if (todo.isDone) count++
         })
         return `${count} / ${this.taskToEdit.checklists[0].todos.length}`
      },
      isChecklist() {
         if (this.taskToEdit.checklists[0] && this.taskToEdit.checklists[0].id) return true
      },
      taskCover() {
         const cover = this.taskToEdit.style
         var style = ''
         if (cover.bgColor !== '#ffffff') style += `background-color:${cover.bgColor}; `
         if (cover.url) style += `background-image: url('${cover.url}');`
         return style
      },
   },
}
</script>

<template>
   <div class="archive" v-if="archivedList">
      <ul class="archive-cards-list">
         <li v-for="(task, idx) in archivedList" :key="idx">
            <div class="list-card archived">
               <!-- cover -->
               <div
                  v-if="isCoverBgc(task)"
                  class="list-card-cover"
                  :style="{
                     background: task.style.bgColor,
                     height: isHeight(task) + 'px',
                  }"
               ></div>

               <div class="list-card-details">
                  <div
                     v-if="task.labels && task.labels.length"
                     class="list-card-labels"
                  >
                     <label-checkboxes :checked="getChecked" />
                     <label
                        for="label-toggler"
                        class="label-toggler"
                        @click.self.prevent="toggle"
                     >
                        <span
                           v-for="label in task.labels"
                           :key="label.id"
                           class="card-label"
                           :class="'label-' + label.color"
                        >
                           <span class="label-text">{{ label.title }}</span>
                        </span>
                     </label>
                  </div>
                  <div class="list-card-title">
                     <span class="task-id hide">{{ task.id }}</span>
                     <span>{{ task.title }}</span>
                  </div>
                  <!-- badges -->
                  <div class="badges">
                     <span class="js-badges">
                        <div
                           v-if="isWatchingBadge(task)"
                           class="badge"
                           title="You are watching this card."
                        >
                           <span
                              class="badge-icon icon-sm icon-subscribe"
                           ></span>
                        </div>
                        <div
                           v-if="isDatesBadge(task)"
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
                              {{ organizedDates(task) }}
                           </span>
                        </div>
                        <div
                           v-if="task.description"
                           class="badge is-icon-only"
                           title="This card has a description."
                        >
                           <span
                              class="badge-icon icon-sm icon-description"
                           ></span>
                        </div>
                        <div
                           v-if="task.comments && task.comments.length"
                           class="badge is-icon-only"
                           title="Comments"
                        >
                           <span class="badge-icon icon-sm icon-comment"></span>
                           <span class="badge-text">{{
                              task.comments.length
                           }}</span>
                        </div>
                        <div
                           v-if="task.attachments && task.attachments.length"
                           class="badge"
                           title="Attachments"
                        >
                           <span
                              class="badge-icon icon-sm icon-attachment"
                           ></span>
                           <span class="badge-text">{{
                              task.attachments.length
                           }}</span>
                        </div>
                        <div
                           v-if="task.location.id"
                           class="badge"
                           title="This card has a location."
                        >
                           <span
                              class="badge-icon icon-sm icon-location"
                           ></span>
                        </div>
                        <div
                           v-if="isChecklist(task)"
                           class="badge"
                           title="Checklist items"
                        >
                           <span
                              class="badge-icon icon-sm icon-checklist"
                           ></span>
                           <span class="badge-text">{{
                              checklistItems(task)
                           }}</span>
                        </div>
                        <div class="badge" title="This card is archived">
                           <span class="badge-icon icon-sm icon-archive"></span>
                           <span class="badge-text">Archived</span>
                        </div>
                     </span>
                  </div>

                  <!-- task-members -->
                  <div
                     div
                     v-if="task.members && task.members.length"
                     class="task-detail-members-list list-card-members"
                  >
                     <a
                        class="member"
                        v-for="member in task.members"
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
            <div class="archived-btns">
               <a @click="restoreTask(task)">Send to board</a>
               -
               <a @click="removeTask(task)">Delete</a>
            </div>
         </li>
      </ul>
   </div>
</template>

<script>
import labelCheckboxes from '@/cmps/task-preview-label-checkboxes.vue'
import Avatar from 'vue-avatar'

export default {
   name: 'archiveCmp',
   components: {
      labelCheckboxes, Avatar
   },
   props: {
      board: Object, required: true,
      info: Object,
   },
   data() {
      return {
         labelsAreOpen: true,
         currLoggedUser: null,
         modalPos: {},
         archivedList: null
      }
   },
   created() {
      this.archivedList = this.$store.getters.allBoardTasks.filter(task => task.isArchived)
   },
   methods: {
      toggle(ev) {
         ev.stopPropagation()
         this.$store.commit('toggleCheckbox', { checked: this.checked })
      },
      isCoverBgc(task) {
         if (task.style.bgColor !== '#ffffff') return true
         else return false
      },
      isHeight(task) {
         if (task.style.bgColor !== '#ffffff') return 32
         return 0
      },
      isWatchingBadge(task) {
         this.currLoggedUser = this.$store.getters.currLoggedUser
         const idx = task.members.findIndex(member => member._id === this.currLoggedUser._id)
         if (idx !== -1) return true
      },
      isDatesBadge(task) {
         if (task.startDate || task.dueDate) return true
      },
      organizedDates(task) {
         if (task.startDate.date && task.dueDate.date) {
            const from = task.startDate.date.slice(0, 6)
            const to = task.dueDate.date.slice(0, 6)
            return `${from}-${to}`
         } else if (task.startDate) return task.startDate.date.slice(0, 6)
         return task.dueDate.date.slice(0, 6)
      },
      checklistItems(task) {
         let count = 0
         task.checklists[0].todos.forEach(todo => {
            if (todo.isDone) count++
         })
         return `${count} / ${task.checklists[0].todos.length}`
      },
      isChecklist(task) {
         if (task.checklists[0] && task.checklists[0].id) return true
      },
      async restoreTask(task) {
         try {
            task.isArchived = false
            const groupId = await this.$store.dispatch({ type: 'getGroupIdByTaskId', taskId: task.id })
            await this.$store.dispatch({ type: 'updateTask', groupId, task })
            this.archivedList = this.$store.getters.allBoardTasks.filter(task => task.isArchived)
         } catch (err) {
            console.log(err)
         }
      },
      async removeTask(task) {
         try {
            const groupId = await this.$store.dispatch({ type: 'getGroupIdByTaskId', taskId: task.id })
            await this.$store.dispatch({ type: 'removeTask', groupId, task })
            this.archivedList = this.$store.getters.allBoardTasks.filter(task => task.isArchived)
         } catch (err) {
            console.log(err)
         }
      },
   },
   computed: {
      // archivedList() {
      //    return this.$store.getters.allBoardTasks.filter(task => task.isArchived)
      // },
      getChecked() {
         return this.$store.getters.checked
      },
      labelsHeight() {
         if (this.board.isLabelsShown) return 16
         return 8
      },
   },
}
</script>


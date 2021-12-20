<template>
   <section class="board-app">
      <div
         class="loader-gif"
         v-if="!board"
         :style="{
            display: 'flex',
            'justify-content': 'center',
            'align-self': 'center',
         }"
      >
         <img
            :src="require(`@/assets/img/loader1.gif`)"
            :style="{ width: 200 + 'px', height: 200 + 'px' }"
         />
      </div>
      <div
         v-else
         class="board-wrapper"
         :class="{ 'is-show-menu': isBoardMenuOpen }"
      >
         <div class="task-detail-modal-container">
            <div class="modal-content">
               <router-view :class="{ 'window-up': isModalOpen }" />
            </div>
         </div>
         <task-preview-edit
            @closePreviewEdit="closePreviewEdit"
            v-if="isPreviewEdit"
            :task="this.task"
            :board="board"
            :group="this.group"
            :modalPos="this.modalPos"
            :key="task.id"
         />
         <div class="board-container">
            <div class="board-content">
               <div class="board-content-wrapper">
                  <div class="board-main-content">
                     <board-nav
                        @toggleBoardNavMenu="toggleBoardNavMenu"
                        :board="board"
                        :boardMembers="board.members"
                        :boardBgc="board.style.bgColor"
                     />
                     <div class="groups-container-main">
                        <!-- <Draggable class="board-group" :style="{'display':'inline-block','overflow':'unset'}"  v-for="group in boardGroups" :key="group.id">
                              	<group-preview @onlyOneEdit="onlyOneEdit" @toggleModal="toggleModalClass" :group="group" :board="board" />
                           </Draggable> -->

                        <!-- CONTAINER FOR THE D&D -->
                        <Container
                           v-dragscroll:nochilddrag
                           orientation="horizontal"
                           v-if="onlyOneEdit"
                           :style="{ display: 'block' }"
                           class="groups-container"
                           drag-class="card-ghost"
                           drop-class="card-ghost-drop"
                           group-name="1"
                           :get-child-payload="getChildPayload"
                           @drop="onDrop(board.groups, $event)"
                           :drop-placeholder="dropPlaceholderOptions"
                           drag-handle-selector=".group-header-section"
                           non-drag-area-selector=".is-editing"
                        >
                           <Draggable
                              data-dragscroll
                              class="board-group"
                              :style="{ display: 'inline-block' }"
                              v-for="group in boardGroups"
                              :key="group.id"
                           >
                              <group-preview
                                 @onlyOneEdit="onlyOneEdit"
                                 @toggleModal="toggleModalClass"
                                 :group="group"
                                 :board="board"
                              />
                           </Draggable>

                           <!-- <div class="board-group" v-for="(group, idx) in groupsList" :key="idx">
										<group-preview @onlyOneEdit="onlyOneEdit" @toggleModal="toggleModalClass" :group="group" :board="board" />
									</div> -->
                           <div class="add-list-section">
                              <div
                                 v-if="!isListInputOpen"
                                 @click="toggleInput"
                                 class="add-list-button"
                              >
                                 <a class="list-composer">
                                    <span class="add-task-plus-icon">
                                       <img src="@/assets/img/plus-icon.svg" />
                                    </span>
                                    <span class="add-task-span"
                                       >Add another list</span
                                    >
                                 </a>
                              </div>
                              <!-- list composer section -->
                              <div v-else class="list-composer-open">
                                 <div class="add-list-title-input-section">
                                    <input
                                       type="text"
                                       class="add-list-title-input"
                                       v-model="newListTitleInput"
                                       placeholder="Enter list title..."
                                       @keydown.enter.exact.prevent
                                       @keyup.enter.exact="addGroup"
                                    />
                                 </div>
                                 <div class="add-list-control-section">
                                    <button
                                       @click="addGroup"
                                       class="add-list-confirm-btn"
                                    >
                                       Add list
                                    </button>
                                    <span
                                       @click="toggleInput"
                                       class="cancel-add-list"
                                    >
                                       <img
                                          src="@/assets/img/cancel-icon.svg"
                                       />
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </Container>
                        <!-- </div> -->
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <board-nav-side-menu
            :board="board"
            :isBoardMenuOpen="isBoardMenuOpen"
            :onSideMenuOpen="toggleBoardNavMenu"
         />
      </div>
   </section>
</template>

<script>
import groupPreview from '@/cmps/group-preview'
import boardNav from '@/cmps/board-nav'
import boardNavSideMenu from '@/cmps/board-sidemenu'
// import draggable from 'vuedraggable';
import taskPreviewEdit from '@/cmps/task-preview-edit.vue'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/services/applyDrag.js'

import { socketService } from '../services/socket-service.js'

export default {
   name: 'board-app',
   components: {
      groupPreview,
      boardNav,
      boardNavSideMenu,
      taskPreviewEdit,
      // draggable,
      Container,
      Draggable
   },
   data() {
      return {
         board: null,
         isListInputOpen: false,
         newListTitleInput: '',
         isModalOpen: false,
         isBoardMenuOpen: false,
         isPreviewEdit: false,
         task: null,
         group: null,
         modalPos: {},
         dropPlaceholderOptions: {
            className: "drop-preview",
            animationDuration: "0",
            showOnTop: false
         },
      }
   },
   async created() {
      socketService.on('boardUpdate', this.loadBoard)
   },
   computed: {
      // groupsList: {
      // 	get() {
      // 		return this.$store.getters.boardGroups;
      // 	},
      // 	set(groups) {
      // 		this.$store.dispatch({ type: 'updateGroups', groups });
      // 	}
      // },
      archivedList() {
         return this.$store.getters.allBoardTasks.filter(task => task.isArchived)
      },
      boardGroups() {
         return this.$store.getters.boardGroups
      }
   },
   methods: {
      async addGroup() {
         try {
            if (!this.newListTitleInput) return
            var group = JSON.parse(JSON.stringify(this.$store.getters.getEmptyGroup))
            group.title = this.newListTitleInput
            await this.$store.dispatch({ type: 'addGroup', group })
            this.newListTitleInput = ''
            this.isListInputOpen = false
         } catch (err) {
            console.log(err)
         }
      },
      toggleInput() {
         this.isListInputOpen = !this.isListInputOpen
      },
      toggleModalClass(ev) {
         this.isModalOpen = true
      },
      async loadBoard(boardId) {
         try {
            const currBoard = await this.$store.dispatch({ type: 'getBoardbyId', boardId })
            currBoard.members = this.$store.getters.users
            this.board = currBoard
         } catch (err) {
            console.log(err)
         }
      },
      toggleBoardNavMenu(ev) {
         this.isBoardMenuOpen = !this.isBoardMenuOpen
      },
      onlyOneEdit(group, task, modalPos) {
         this.isPreviewEdit = true
         this.task = task
         this.group = group
         this.modalPos = modalPos
      },
      closePreviewEdit() {
         this.isPreviewEdit = false
      },
      async restoreTask(task) {
         try {
            task.isArchived = false
            const groupId = await this.$store.dispatch({ type: 'getGroupIdByTaskId', taskId: task.id })
            await this.$store.dispatch({ type: 'updateTask', groupId, task })
         } catch (err) {
            console.log(err)
         }
      },
      async onDrop(items, dropResult) {
         const groups = applyDrag(items, dropResult)
         this.board.groups = groups
         this.$store.dispatch({ type: 'updateGroups', groups })
      },
      getChildPayload(index) {
         return this.board.groups[index]
      },
   },
   watch: {
      '$route.params.boardId': {
         immediate: true,
         deep: true,
         async handler() {
            try {
               this.loadBoard(this.$route.params.boardId)
               let taskId = this.$route.params.taskId
               if (taskId) this.isModalOpen = true
            } catch (err) {
               console.log(err)
            }
         }
      }
   }
};
</script>

<template>
   <div class="board-nav clearfix">
      <div class="board-views-btn-container">
         <!-- <button class="btn-board-views" type="button" title="Board views">
            <span class="board-views-icon-container">
               <span class="board-views-icon">
                  <svg
                     width="24"
                     height="24"
                     role="presentation"
                     focusable="false"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
                        fill="#fff"
                     ></path>
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
                        fill="#fff"
                     ></path>
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
                        fill="#fff"
                     ></path>
                  </svg>
               </span>
            </span>
            <span class="board-views-txt">Board</span>
            <span class="board-views-open-icon-container">
               <span class="board-views-open-icon">
                  <svg
                     width="24px"
                     height="24px"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z"
                        fill="currentColor"
                     />
                  </svg>
               </span>
            </span>
         </button> -->
      </div>
      <div class="board-header-btn board-name inline-rename-board">
         <h1 class="board-header-btn-text">{{ board.title }}</h1>
         <input
            class="board-name-input"
            type="text"
            spellcheck="false"
            maxlength="512"
            :value="board.title"
         />
      </div>
      <a
         v-if="showStar"
         @click="toggleBoardStar"
         class="board-header-btn board-header-star-container"
         title="Click to star or unstar this board. Starred board show up at the top of your boards list"
      >
         <span
            class="icon-star board-header-btn-icon"
            :class="{ 'icon-starred': isBoardStarred }"
         >
            <svg
               v-if="isBoardStarred"
               version="1.1"
               id="Capa_1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px"
               y="0px"
               viewBox="0 0 55.867 55.867"
               style="enable-background: new 0 0 55.867 55.867"
               xml:space="preserve"
            >
               <path
                  d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"
               />
            </svg>
            <svg
               v-else
               version="1.1"
               id="Capa_1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px"
               y="0px"
               viewBox="0 0 243.317 243.317"
               style="enable-background: new 0 0 243.317 243.317"
               xml:space="preserve"
            >
               <path
                  fill="currentColor"
                  stroke="currentColor"
                  d="M242.949,93.714c-0.882-2.715-3.229-4.694-6.054-5.104l-74.98-10.9l-33.53-67.941c-1.264-2.56-3.871-4.181-6.725-4.181c-2.855,0-5.462,1.621-6.726,4.181L81.404,77.71L6.422,88.61C3.596,89.021,1.249,91,0.367,93.714c-0.882,2.715-0.147,5.695,1.898,7.688l54.257,52.886L43.715,228.96c-0.482,2.814,0.674,5.658,2.983,7.335c2.309,1.678,5.371,1.9,7.898,0.571l67.064-35.254l67.063,35.254c1.097,0.577,2.296,0.861,3.489,0.861c0.007,0,0.014,0,0.021,0c0,0,0,0,0.001,0c4.142,0,7.5-3.358,7.5-7.5c0-0.629-0.078-1.24-0.223-1.824l-12.713-74.117l54.254-52.885C243.096,99.41,243.832,96.429,242.949,93.714z M173.504,146.299c-1.768,1.723-2.575,4.206-2.157,6.639l10.906,63.581l-57.102-30.018c-2.185-1.149-4.795-1.149-6.979,0l-57.103,30.018l10.906-63.581c0.418-2.433-0.389-4.915-2.157-6.639l-46.199-45.031l63.847-9.281c2.443-0.355,4.555-1.889,5.647-4.103l28.55-57.849l28.55,57.849c1.092,2.213,3.204,3.748,5.646,4.103l63.844,9.281L173.504,146.299z"
               />
            </svg>
         </span>
      </a>
      <div v-if="breakpointBig" class="board-header-btn-org-wrapper">
         <span class="board-header-btn-divider"></span>
         <!-- LINK TO USER'S WORKSPACE -->
         <a class="board-header-btn board-header-btn-org-name open-org-menu">
            <span class="board-header-btn-text"
               >{{ board.createdBy.username }}'s Workspace</span
            >
         </a>
         <span class="board-header-btn-divider"></span>
         <div class="board-header-btns mod-left"></div>
         <!-- <a
            id="permission-level"
            class="board-header-btn perms-btn change-vis"
            title="All members of the Workspace can see and edit this board"
         >
            <span
               class="board-header-btn-icon icon-sm icon-organization-visible"
            ></span>
            <span class="board-header-btn-text">Workspace visible</span>
         </a> -->
      </div>
      <!-- <span class="board-header-btn-divider"></span> -->
      <div class="board-header-btns mod-left">
         <draggable
            v-if="showListMembers"
            class="board-header-facepile board-member-list"
            v-model="memberList"
            group="memberList"
            draggable=".member-draggable"
         >
            <template v-for="(member, idx) in memberList">
               <a
                  class="member member-draggable"
                  :style="{ 'z-index': memberList.length - idx }"
                  :key="member._id"
               >
                  <avatar
                     :src="member.imgUrl"
                     :size="28"
                     :username="member.fullname"
                     :title="`${member.fullname}(${member.username})`"
                  />
                  <span
                     v-show="member.isAdmin"
                     class="member-type admin"
                     :style="{ 'z-index': memberList.length - idx }"
                  ></span>
               </a>
            </template>
         </draggable>
         <div v-if="!breakpointBig && !showListMembers">
            <a
               @click="toggleListMembers"
               class="board-header-btn members-list-svg"
            >
               <svg
                  stroke="white"
                  fill="white"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="16px"
                  width="16px"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"
                  ></path>
               </svg>
            </a>
         </div>
         <a
            v-if="breakpointBig"
            class="board-header-btn-invite manage-board-members"
            title="Invite to board"
         >
            <span class="icon-add-member icon-sm board-header-btn-icon"></span>
            <span class="board-header-btn-text">Invite</span>
         </a>
      </div>
      <div class="board-header-btns mod-right">
         <a
            @click="toggleUserWatchlist"
            v-if="isUserSubbed"
            class="board-header-btn board-header-subscribed"
         >
            <span class="icon-subscribed icon-sm board-header-btn-icon"></span>
            <span class="board-header-btn-text">Watching</span>
         </a>
         <span v-if="breakpointBig" class="board-header-btn-divider"></span>
         <span class="board-header-special-btn-container">
            <div class="board-header-filter-btn">
               <button
                  type="button"
                  class="
                     board-header-btn
                     header-filter-btn
                     board-header-special-btn
                  "
               >
                  <span class="board-header-filter-btn-icon-container">
                     <span class="icon-filter">
                        <svg
                           width="24"
                           height="24"
                           role="presentation"
                           focusable="false"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z"
                              fill="currentColor"
                           ></path>
                        </svg>
                     </span>
                  </span>
                  <span
                     class="board-header-btn-text-filter"
                     v-if="breakpointBig"
                     >Filter</span
                  >
               </button>
            </div>
         </span>
         <a
            @click="toggleBoardNavMenu"
            class="board-header-btn mod-show-menu show-sidebar"
         >
            <span
               class="icon-overflow-menu icon-sm board-header-btn-icon"
            ></span>
            <span class="text" v-if="breakpointBig">Show menu </span>
         </a>
      </div>
   </div>
</template>

<script>
import Avatar from 'vue-avatar'
import draggable from 'vuedraggable'

export default {
   props: ['board'],
   components: {
      Avatar,
      draggable
   },
   data() {
      return {
         loggedUser: this.$store.getters.currLoggedUser,
         starredBoard: false,
         breakpointBig: true,
         showListMembers: true,
         showStar: true
      }
   },
   created() {
      window.addEventListener('resize', this.onResize)
      this.onResize()
   },
   destroyed() {
      window.removeEventListener('resize', this.onResize)
   },
   computed: {
      memberList: {
         get() {
            return this.board.members
         },
         set(memberList) {
            console.log(memberList)
         }
      },
      isBoardStarred() {
         return this.$store.getters.currLoggedUser.starredBoards.some(board => board._id === this.board._id)
      },
      isUserSubbed() {
         return this.$store.getters.currLoggedUser.subscribedTo.some(boardId => boardId === this.board._id)
      }
   },
   methods: {
      addMember(user) {
         this.$store.dispatch({ type: 'addMember', user })
      },
      removeMember(user) {
         this.$store.dispatch({ type: 'removeMember', user })
      },
      changeBoardBgc(ev) {
         this.$store.dispatch({ type: 'changeBoardBgc', bgc: ev.target.value })
      },
      toggleBoardNavMenu(ev) {
         this.$emit('toggleBoardNavMenu', ev)
      },
      async toggleUserWatchlist() {
         try {
            let userToUpdate = this.loggedUser
            const idx = userToUpdate.subscribedTo.findIndex(board => board === this.board._id)
            idx === -1 ? userToUpdate.subscribedTo.push(this.board._id) : userToUpdate.subscribedTo.splice(idx, 1)
            this.$store.dispatch('saveUser', { user: userToUpdate })
         } catch (err) {
            console.log(err)
         }
      },
      async toggleBoardStar() {
         try {
            let userToUpdate = this.loggedUser
            const idx = userToUpdate.starredBoards.findIndex(board => board._id === this.board._id)
            if (idx === -1) {
               this.starredBoard = !this.starredBoard
               const { _id, title, style } = this.board
               userToUpdate.starredBoards.push({ _id, title, ...style })
            } else userToUpdate.starredBoards.splice(idx, 1)
            await this.$store.dispatch({ type: 'saveUser', user: userToUpdate })
         } catch (err) {
            console.log(err)
         }
      },
      onResize() {
         this.breakpointBig = window.innerWidth < 810 ? false : true
         // return window.innerWidth < 768 ? false : true
         this.showListMembers = window.innerWidth < 810 ? false : true
         this.showStar = window.innerWidth < 360 ? false : true
      },
      toggleListMembers() {
         this.showListMembers = !this.showListMembers
      }
   }
}
</script>
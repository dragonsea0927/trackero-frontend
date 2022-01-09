<template>
   <div>
      <ul class="board-menu-navigation">
         <li class="board-menu-navigation-item">
            <a @click="aboutBoard" class="board-menu-navigation-item-link toggle-about-this-board">
               <span class="board-menu-navigation-item-link-icon icon-lg icon-board"></span>
               &nbsp;About this board
               <div class="board-menu-navigation-item-link-summary board-menu-about-this-board-summary">&nbsp;Add a description to your board</div>
            </a>
         </li>
         <li class="board-menu-navigation-item mod-background">
            <a @click="changeBgcMenu" class="board-menu-navigation-item-link change-background">
               <span class="board-menu-navigation-item-link-icon fill-background-preview" :style="{ background: board.style.bgColor }"></span>
               &nbsp;Change background
            </a>
         </li>
         <!-- <li class="board-menu-navigation-item">
            <a @click="labelsMenu" class="board-menu-navigation-item-link open-labels">
               <span class="icon-label icon-lg board-menu-navigation-item-link-icon"></span>
               &nbsp;Labels
            </a>
         </li> -->
         <li class="board-menu-navigation-item">
            <a @click="archivedItems" class="board-menu-navigation-item-link open-archive">
               <span class="icon-archive icon-lg board-menu-navigation-item-link-icon"></span>
               &nbsp;Archived items
            </a>
         </li>
         <li @click="moreOptions" class="board-menu-navigation-item">
            <a class="board-menu-navigation-item-link open-more">
               <span class="icon-overflow-menu-horizontal icon-sm board-menu-navigation-item-link-icon"></span>
               &nbsp;More
            </a>
         </li>
      </ul>
      <hr />
      <a @class="fillActivities" class="board-menu-section-header">
         <span class="board-menu-section-header-icon icon-lg icon-activity"></span>
         <span class="board-menu-section-header-title">Activity</span>
         <span class="board-menu-section-header-count unread-activity-count"></span>
      </a>
      <div class="menu-action-list">
         <template v-for="(activity,idx) in activities">
            <div class="menu-activity mod-attachment-type" :key="idx">
               <div class="activity-creator">
                  <avatar class="user-avatar" :src="activity.byMember.imgUrl" :size="32" :username="activity.byMember.fullname" :title="`${activity.byMember.fullname}(${activity.byMember.username})`" />
               </div>
               <div class="activity-desc">
                  <span class="inline-member" :data-memId="activity.byMember._id">
                     <span class="u-font-weight-bold">{{ activity.byMember.fullname }}</span>
                  </span>
                  <template v-if="activity">
                     <a :href="`/board/${board._id}/${activity.group}`">
                        {{ activity.txt }}
                     </a>
                  </template>
               </div>
               <div class="activity-meta quiet">
                  <a :href="`/board/${board._id}/${activity.group}`" v-if="activity" class="date"> {{ moment(activity.createdAt).fromNow() }} </a>
                  <span class="date" v-else>{{ moment(activity.createdAt).fromNow() }}</span>
               </div>
            </div>
         </template>
      </div>
      <!-- <a @click="fillActivities" class="show-more fill-activity-btn">View all activity...</a> -->
   </div>
</template>

<script>
   import Avatar from 'vue-avatar'

   export default {
      name: 'sidemenu-main-dynamic',
      components: {
         Avatar
      },
      props: {
         board: Object, required: true,
         moreOptions: Function, required: true
      },
      data() {
         return {
            activities: []
         }
      },
      created() {
         this.board.groups.forEach(group => group.tasks.forEach(task => {
            task.activities.forEach(activity => this.activities.push(activity))
         }))
         this.activities.sort((a,b) => b.createdAt - a.createdAt)
      },
      methods: {
         aboutBoard() {
            this.$emit('changeCmp', 'aboutBoardCmp')
         },
         changeBgcMenu() {
            this.$emit('changeCmp', 'changeBgcCmp')
         },
         labelsMenu() {
            this.$emit('changeCmp', 'labelsList')
         },
         archivedItems() {
            this.$emit('changeCmp', 'archiveCmp')
         },
         fillActivities() {
            this.$emit('changeCmp', 'activitiesCmp')
         }
      }
   }
</script>

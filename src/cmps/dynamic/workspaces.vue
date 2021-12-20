<template>
   <section :style="{ left: modalCmp.posX + 'px'}" class="header-modal">
      <header class="header-modal-header">
         <div class="header-modal-title" :title="modalCmp.type">{{modalCmp.type}}</div>
         <button @click="modalToggle" class="header-close-modal-btn">
            <span class="header-close-modal-btn-icon">
               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z" fill="currentColor"></path></svg>
            </span>
         </button>
      </header>
      <div class="header-modal-body" :style="{ padding: 0, 'padding-bottom': 12+'px' }">
         <div class="header-modal-body-content">
            <div class="workspace-title">
               <p>Current Workspace</p>
            </div>
            <div class="workspace-showcase">
               <avatar class="workspace-avatar" :username="modalCmp.user.username" :size="40" :rounded="false" />
               <p class="curr-user">{{ modalCmp.user.username }}'s Workspace</p>
            </div>
            <div class="workspace-modal-divider"></div>
            <div class="all-workspaces-title">
               <p>Your Workspaces</p>
            </div>
            <router-link @click.native="modalToggle" class="workspace-showcase workspace-link" :to="`/user/${modalCmp.user._id}/workspace`">
               <avatar class="workspace-avatar" :username="modalCmp.user.username" :size="40" :rounded="false" />
               <p class="curr-user">{{ modalCmp.user.username }}'s Workspace</p>
            </router-link>
         </div>
      </div>
   </section>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
   name: 'Workspaces',
   components: {
      Avatar
   },
   props: {
      modalCmp: Object, required: true,
      loggedUser: Object, required: true,
   },
   methods: {
      modalToggle() {
         this.$emit('toggleModal')
      }
   }
}
</script>
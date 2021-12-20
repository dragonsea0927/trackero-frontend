<template>
   <div>
      <div class="about-this-board-section">
         <div class="window-module-title window-module-title-no-divider">
            <span class="icon-member icon-lg window-module-title-icon"></span>
            <h3 class="u-inline-block">Board admins</h3>
         </div>
         <div class="js-made-by">
            <div class="mini-profile">
               <avatar class="mini-profile-member member-large" :src="require('@/assets/img/'+board.createdBy.imgUrl)" :size="50" :username="board.createdBy.username" :title="`${board.createdBy.fullname}(${board.createdBy.username})`" />
               <div class="mini-profile-info">
                  <h3 class="mini-profile-info-title">
                     <a class="mini-profile-info-title-link js-profile" :href="`/${board.createdBy._id}/profile`" >{{ board.createdBy.fullname }}</a>
                  </h3>
                  <p class="quiet u-bottom">@{{ board.createdBy.username }}</p>
               </div>
            </div>
         </div>
      </div>
      <div class="about-this-board-section about-this-board-desc">
         <div class="fill-atb-desc about-this-board-description-content">
            <div class="window-module">
               <div class="window-module-title window-module-title-no-divider description-title">
                  <span class="icon-description icon-lg window-module-title-icon"></span>
                  <h3 class="u-inline-block">Description</h3>
                  <div class="editable" :class="{editing: isEditing}">
                     <a class="nch-button ml-4 hide-on-edit edit-desc-button">Edit</a>
                  </div>
               </div>
               <div class="u-gutter">
                  <div class="editable" :class="{editing: isEditing}">
                     <div class="description-content">
                        <div class="current markdown hide-on-edit js-desc show-with-desc">
                           <template v-for="(miniDesc, idx) in board.description">
                              <p :key="idx">{{ miniDesc[idx] }}</p>
                           </template>
                        </div>
                        <div class="description-edit edit">
                           <textarea-autosize placeholder="It’s your board’s time to shine! Let people know what this board is used for and what they can expect to see."
                              class="field field-autosave description-draft description board-description" v-model="board.description" />
                           <div class="edit-controls clearfix">
                              <button type="button" class="nch-button button-primary confirm mod-submit-edit save-edit">Save</button>
                              <a @click="cancelEdit" class="icon-lg icon-close dark-hover cancel"></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import miniProfile from '../user-mini-profile'
import Avatar from 'vue-avatar'

export default {
   name: 'aboutBoardCmp',
   props: ['board'],
   components: {
      miniProfile,
      Avatar
   },
   data() {
      return {

      }
   },
   methods: {
      isEditing() {

      },
      cancelEdit() {

      }
   },
}
</script>
<template>
   <div
      :style="{ left: modalPos.left + 'px', top: modalPos.top + 37 + 'px' }"
      :class="{ 'is-shown': isMiniProfileOpen }"
      class="mod-mini-profile pop-over"
   >
      <div class="no-back">
         <div class="pop-over-header">
            <!-- <span class="pop-over-header-title">Member</span> -->
            <a
               @click="closeMiniProfile"
               class="pop-over-header-close-btn icon-sm icon-close"
            ></a>
         </div>
         <div>
            <div class="pop-over-content">
               <div>
                  <div>
                     <div class="mini-profile">
                        <div class="mini-profile-member member-large">
                           <a class="">
                              <avatar
                                 :src="user.imgUrl"
                                 :size="50"
                                 :username="user.fullname"
                                 :title="`${user.fullname}(${user.username})`"
                              />
                           </a>
                        </div>
                        <div class="mini-profile-info">
                           <h3 class="mini-profile-info-title">
                              <a
                                 href="#"
                                 class="mini-profile-info-title-link"
                                 >{{ user.fullname }}</a
                              >
                           </h3>
                           <p class="u-bottom">@{{ user.username }}</p>
                           <!-- <p class="u-bottom"><a href="#">Edit profile info</a></p> -->
                        </div>
                     </div>
                     <ul class="pop-over-list">
                        <li>
                           <a @click="removeTaskMember(user)"
                              >Remove from card</a
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
import Avatar from 'vue-avatar'

export default {
   name: 'user-mini-profile',
   props: {
      isMiniProfileOpen: Boolean, required: true,
      user: Object, required: true,
      modalPos: Object, required: true,
   },
   components: {
      Avatar,
   },
   methods: {
      closeMiniProfile() {
         this.$emit('closeMiniProfile')
      },
      removeTaskMember(user) {
         this.$emit('removeTaskMember', user)
         this.$emit('closeMiniProfile')
      },
   }
}
</script>
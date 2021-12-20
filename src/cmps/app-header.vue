<template>
   <header >
      <nav>
         <!-- <div>
            <div class="atlassian-btn-wrapper">
               <div class="atlassian-btn-container">
                  <button class="atlassian-app-btn" type="button">
                     <span class="atlassian-app-icon-container">
                        <span class="atlassian-app-switcher">
                           <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="#fff"></path>
                           </svg>
                        </span>
                     </span>
                  </button>
               </div>
            </div>
         </div> -->
         <router-link class="logo-link" to="/">
            <div class="logo-img-container">
               <div class="logo-content">
                  <p>Trackero</p>
               </div>
            </div>
         </router-link>
         <div class="nav-main-wrapper">
            <div class="nav-main-container">
               <template v-if="breakpointBig">
                  <div class="nav-main-links">
                     <a
                        @click.self.stop="modalOpen"
                        data-cmp="Workspaces"
                        class="nav-link-btn"
                        :class="{
                           'modal-active':
                              isModalOpen && modalCmp.type === 'Workspaces',
                        }"
                     >
                        <span
                           @click.self.stop="modalOpen"
                           data-cmp="Workspaces"
                           class="btn-text"
                           >Workspaces</span
                        >
                        <span data-cmp="Workspaces" class="btn-icon-container">
                           <span data-cmp="Workspaces" class="modal-icon">
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
                                 />
                              </svg>
                           </span>
                        </span>
                     </a>
                     <a
                        @click.self.stop="modalOpen"
                        data-cmp="Starred"
                        class="nav-link-btn"
                        :class="{
                           'modal-active':
                              isModalOpen && modalCmp.type === 'Starred',
                        }"
                     >
                        <span
                           @click.self.stop="modalOpen"
                           data-cmp="Starred"
                           class="btn-text"
                           >Starred</span
                        >
                        <span data-cmp="Starred" class="btn-icon-container">
                           <span class="modal-icon">
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
                     </a>
                     <a
                        @click.self.stop="modalOpen"
                        data-cmp="Templates"
                        class="nav-link-btn"
                        :class="{
                           'modal-active':
                              isModalOpen && modalCmp.type === 'Templates',
                        }"
                     >
                        <span
                           @click.self.stop="modalOpen"
                           data-cmp="Templates"
                           class="btn-text"
                           >Templates</span
                        >
                        <span data-cmp="Templates" class="btn-icon-container">
                           <span class="modal-icon">
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
                     </a>
                  </div>
                  <div class="nav-board-create">
                     <a
                        @click.stop="modalOpen"
                        data-cmp="Create"
                        class="nav-item"
                        :class="{
                           'modal-active':
                              isModalOpen && modalCmp.type === 'Create',
                        }"
                     >
                        <p @click.stop="modalOpen" data-cmp="Create">Create</p>
                     </a>
                  </div>
                  <div class="spacer">
                     <div class="spacer-content"></div>
                  </div>
               </template>

               <template v-else>
                  <div class="more-opts-btn-container">
                     <button
                        @click.stop="modalOpen"
                        data-cmp="More"
                        class="nav-link-btn nav-item"
                        :class="{
                           'modal-active':
                              isModalOpen && modalCmp.type === 'More',
                        }"
                     >
                        <span
                           @click.stop="modalOpen"
                           data-cmp="More"
                           class="btn-text"
                           >More</span
                        >
                        <span data-cmp="More" class="btn-icon-container">
                           <span class="modal-icon">
                              <svg
                                 @click.stop="modalOpen"
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
                     </button>
                  </div>
                  <div class="nav-board-create nav-small-more-opts">
                     <a
                        @click.stop="modalOpen"
                        data-cmp="Create"
                        class="nav-item"
                        :class="{
                           'modal-active':
                              isModalOpen && modalCmp.type === 'Create',
                        }"
                     >
                        <span data-cmp="More" class="btn-icon-container">
                           <span class="modal-icon">
                              <svg
                                 @click.stop="modalOpen"
                                 width="24"
                                 height="24"
                                 role="presentation"
                                 focusable="false"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                                    fill="currentColor"
                                 ></path>
                              </svg>
                           </span>
                        </span>
                     </a>
                  </div>
                  <div class="spacer">
                     <div class="spacer-content"></div>
                  </div>
               </template>
            </div>
         </div>
         <div class="nav-reactive-links">
            <!-- <div class="nav-search-bar">
               <label for="search-input-area" class="nav-label">
                  Jump to recent and starred boards, or search
               </label>
               <div role="presentation">
                  <input id="search-input-area" class="search-input" type="search" autocomplete="false" autocorrect="false" spellcheck="false" placeholder="Search" />
               </div>
               <span class="search-icon-wrapper">
                  <label for="search-icon-area">
                     <span class="search-icon-container">
                        <span class="search-icon">
                           <img src="@/assets/img/search-icon.svg" alt="Search menu" />
                        </span>
                     </span>
                  </label>
               </span>
            </div> -->
            <!-- <button class="info-btn" type="button" aria-label="Open information menu">
               <span class="info-icon-container">
                  <span class="info-icon">
                     <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path>
                        <path d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11Z" fill="currentColor"></path>
                        <path d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" fill="currentColor"></path>
                     </svg>
                  </span>
               </span>
            </button> -->
            <button
               class="notifications-btn"
               type="button"
               aria-label="Open notifications center"
            >
               <span class="notifications-icon-container">
                  <span class="notifications-icon">
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
                           d="M12 2C11.4477 2 11 2.44772 11 3V3.078C10.2728 3.19668 9.65318 3.44603 9.1328 3.79295C8.39456 4.28511 7.91489 4.93416 7.60557 5.55279C7.29822 6.1675 7.14952 6.77011 7.07611 7.2106C7.039 7.43322 7.02007 7.62092 7.01035 7.75688C7.00549 7.82503 7.0029 7.88067 7.00153 7.92176C7.00085 7.94232 7.00046 7.95929 7.00025 7.9724L7.00005 7.98916L7.00001 7.99533L7 7.99786L7 7.99898C7 7.9995 7 8 8 8H7V11.723L4.14251 16.4855C3.95715 16.7944 3.95229 17.1792 4.1298 17.4927C4.30731 17.8062 4.63973 18 5 18H19C19.3603 18 19.6927 17.8062 19.8702 17.4927C20.0477 17.1792 20.0429 16.7944 19.8575 16.4855L17 11.723V8H16C17 8 17 7.9995 17 7.99898L17 7.99786L17 7.99533L17 7.98916L16.9997 7.9724C16.9995 7.95929 16.9992 7.94232 16.9985 7.92176C16.9971 7.88067 16.9945 7.82503 16.9896 7.75688C16.9799 7.62092 16.961 7.43322 16.9239 7.2106C16.8505 6.77011 16.7018 6.1675 16.3944 5.55279C16.0851 4.93416 15.6054 4.28511 14.8672 3.79295C14.3468 3.44603 13.7272 3.19668 13 3.078V3C13 2.44772 12.5523 2 12 2ZM9.00042 7.98839L9 8.00435V12C9 12.1812 8.95074 12.3591 8.85749 12.5145L6.76619 16H17.2338L15.1425 12.5145C15.0493 12.3591 15 12.1812 15 12V8.00436L14.9996 7.98839C14.999 7.97089 14.9977 7.9406 14.9947 7.89937C14.9888 7.81658 14.9765 7.69178 14.9511 7.5394C14.8995 7.22989 14.7982 6.8325 14.6056 6.44721C14.4149 6.06584 14.1446 5.71489 13.7578 5.45705C13.3773 5.20338 12.825 5 12 5C11.175 5 10.6227 5.20338 10.2422 5.45705C9.85544 5.71489 9.58511 6.06584 9.39443 6.44721C9.20178 6.8325 9.10048 7.22989 9.04889 7.5394C9.0235 7.69178 9.01118 7.81658 9.00527 7.89937C9.00233 7.9406 9.001 7.97089 9.00042 7.98839ZM14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19H14Z"
                           fill="currentColor"
                        ></path>
                     </svg>
                  </span>
               </span>
            </button>
            <div class="user-btn-spacer"></div>
            <router-link class="user-profile-btn" to="/user">
               <div class="user-avatar-container">
                  <avatar
                     v-if="loggedUser"
                     class="user-avatar"
                     :src="imgSrc"
                     :username="loggedUser.fullname"
                     :title="`${loggedUser.fullname}(${loggedUser.username})`"
                     :size="32"
                  ></avatar>
               </div>
            </router-link>
         </div>
      </nav>
      <component
         @toggleModal="modalClose"
         v-if="isModalOpen"
         :is="modalCmp.type"
         :loggedUser="loggedUser"
         :modalCmp="modalCmp"
      />
   </header>
</template>
<script>
import Avatar from 'vue-avatar'
import Workspaces from './dynamic/workspaces'
import Starred from './dynamic/starred'
import Templates from './dynamic/templates'
import Create from './dynamic/create'
import More from './dynamic/more'

export default {
   components: {
      Avatar,
      Workspaces,
      Starred,
      Templates,
      Create,
      More
   },
   data() {
      return {
         loggedUser: null,
         isModalOpen: false,
         modalCmp: {
            type: null,
            posX: null,
            user: null
         },
         breakpointBig: true
      }
   },
   async created() {
      this.setLoggedUser()
      window.addEventListener('resize', this.onResize)
      if (window.innerWidth < 768) this.breakpointBig = false
   },
   destroyed() {
      window.removeEventListener('resize', this.onResize)
   },
   methods: {
      setLoggedUser() {
          this.loggedUser = this.$store.getters.currLoggedUser
      },
      modalOpen(ev) {
         if (this.isModalOpen && ev.target.dataset.cmp === this.modalCmp.type) return (this.isModalOpen = false)
         this.isModalOpen = true
         this.modalCmp.type = ev.target.dataset.cmp || ''
         this.modalCmp.user = this.loggedUser
         if (ev.x >= 117 && ev.x <= 235) this.modalCmp.posX = 118
         else if (ev.x >= 236 && ev.x <= 330) this.modalCmp.posX = 240
         else if (ev.x >= 334 && ev.x <= 440) this.modalCmp.posX = 334
         else if (ev.x >= 450 && ev.x <= 513) this.modalCmp.posX = 450
      },
      modalClose() {
         this.isModalOpen = false
      },
      onResize() {
         this.breakpointBig = window.innerWidth < 768 ? false : true
      }
   },
   computed: {
      imgSrc() {
        return this.loggedUser.imgUrl
      }
   },
}
</script>

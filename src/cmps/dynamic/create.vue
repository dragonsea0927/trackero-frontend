<template>
   <section :style="{ left: modalCmp.posX + 'px' }" class="header-modal">
      <header class="header-modal-header">
         <div class="header-modal-title" :title="modalCmp.type">Create board</div>
         <button @click="modalToggle" class="header-close-modal-btn">
            <span class="header-close-modal-btn-icon">
               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z" fill="currentColor"></path>
               </svg>
            </span>
         </button>
      </header>
      <div class="header-modal-body">
         <div class="create-board-example-container">
            <div class="create-board-example-img" :style=" setBg ">
               <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="Board example">
            </div>
         </div>
         <div class="bg-selection-container">
            <div class="section-title">
               <label for="background-picker">Background</label>
            </div>
            <div name="background-picker" class="background-options">
               <ul class="image-backgrounds">
                  <li v-for="(img,idx) in suggestedPhotos" :key="idx">
                     <button @click="selectBg(img)" class="bg-select" :class="{ selected: selectedBg===img }" :style="{ 'background-image': `url(${img})` }">
                        <span v-if="selectedBg === img" class="selected-bg-icon-container">
                           <span class="selected-icon">
                              <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.73534 12.3223C6.36105 11.9162 5.72841 11.8904 5.3223 12.2647C4.91619 12.639 4.89039 13.2716 5.26467 13.6777L8.87678 17.597C9.41431 18.1231 10.2145 18.1231 10.7111 17.6264C10.7724 17.5662 10.7724 17.5662 11.0754 17.2683C11.3699 16.9785 11.6981 16.6556 12.0516 16.3075C13.0614 15.313 14.0713 14.3169 15.014 13.3848L15.0543 13.3449C16.7291 11.6887 18.0004 10.4236 18.712 9.70223C19.0998 9.30904 19.0954 8.67589 18.7022 8.28805C18.309 7.90022 17.6759 7.90457 17.2881 8.29777C16.5843 9.01131 15.3169 10.2724 13.648 11.9228L13.6077 11.9626C12.6662 12.8937 11.6572 13.8889 10.6483 14.8825C10.3578 15.1685 10.0845 15.4375 9.83288 15.6851L6.73534 12.3223Z" fill="currentColor"></path></svg>
                           </span>
                        </span>
                     </button>
                  </li>
               </ul>
               <ul class="color-backgrounds">
                  <li v-for="(color,idx) in suggestedColors" :key="idx">
                     <button @click="selectBg(color)" class="bg-select" :class="{ selected: selectedBg===color }" :style="{ background: color }">
                        <span v-if="selectedBg === color" class="selected-bg-icon-container">
                           <span class="selected-icon">
                              <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.73534 12.3223C6.36105 11.9162 5.72841 11.8904 5.3223 12.2647C4.91619 12.639 4.89039 13.2716 5.26467 13.6777L8.87678 17.597C9.41431 18.1231 10.2145 18.1231 10.7111 17.6264C10.7724 17.5662 10.7724 17.5662 11.0754 17.2683C11.3699 16.9785 11.6981 16.6556 12.0516 16.3075C13.0614 15.313 14.0713 14.3169 15.014 13.3848L15.0543 13.3449C16.7291 11.6887 18.0004 10.4236 18.712 9.70223C19.0998 9.30904 19.0954 8.67589 18.7022 8.28805C18.309 7.90022 17.6759 7.90457 17.2881 8.29777C16.5843 9.01131 15.3169 10.2724 13.648 11.9228L13.6077 11.9626C12.6662 12.8937 11.6572 13.8889 10.6483 14.8825C10.3578 15.1685 10.0845 15.4375 9.83288 15.6851L6.73534 12.3223Z" fill="currentColor"></path></svg>
                           </span>
                        </span>
                     </button>
                  </li>
               </ul>
            </div>
         </div>
         <form>
            <label class="board-create-form" :class="{'validation-error': !isValid}">
               <div>
                  Board title
                  <span>*</span>
               </div>
               <input @input="checkValidity" type="text" class="board-creation-input" required v-model="newBoardTitle">
            </label>
            <button :disabled="!isValid" @click="createBoard" class="board-create-btn" type="button">Create</button>
         </form>
      </div>
   </section>
</template>

<script>
import openColors from './sidemenu-colors'

export default {
   props: {
      modalCmp: Object, required: true,
   },
   components: {
      openColors
   },
   data() {
      return {
         selectedBg: null,
         suggestedColors: {'blue':'#0079bf','green':'#519839','red':'#b04632','grayblue':'#838c91','navy':'#172B4D','orange':'#d29034'},
         suggestedPhotos: {
            '1':'https://images.unsplash.com/photo-1637952112301-6090dca83ccb?ixid=2yJhcHBfaWQiOjEyMDd9&&fm=jpg&w=400&fit=max',
            '2':'https://images.unsplash.com/photo-1638735807524-589b3fab1115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjM4OTg3ODMx&ixlib=rb-1.2.1&q=80&w=400',
            '3':'https://images.unsplash.com/photo-1638225117594-5b731a2b5113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjM4OTg3ODMx&ixlib=rb-1.2.1&q=80&w=400',
            '4':'https://images.unsplash.com/photo-1638793770847-54861ae7cdf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM4OTg3ODMx&ixlib=rb-1.2.1&q=80&w=400'
         },
         newBoardTitle: '',
         isValid: false
      }
   },
   created() {
      this.setDefaultBg()
   },
   methods: {
      modalToggle() {
         this.$emit('toggleModal')
      },
      selectBg(data) {
         this.selectedBg = data
      },
      setDefaultBg() {
         this.selectedBg = this.suggestedColors['blue']
         setTimeout(() => this.selectedBg = this.suggestedPhotos['1'], 300)
      },
      checkValidity() {
         return this.isValid = this.newBoardTitle.length > 0 ? true : false
      },
      async createBoard() {
         try {
            const newBoard = await this.$store.dispatch({ type: 'addBoard', boardTitle: this.newBoardTitle })
            this.newBoardTitle = ''
            this.$router.push(`/board/${newBoard._id}`)

            // SOLVE: saving board overwrites chosen bg
         } catch(err) {
            console.log(err)
         }
      }
   },
   computed: {
      setBg() {
         const regexp = new RegExp('https?:\/\/')
         let bg = null
         bg = (this.selectedBg.match(regexp)) 
         ? `backgroundImage: url('${this.selectedBg}')`
         : bg = `background-color: ${this.selectedBg}`
         return bg
      }
   }
}
</script>
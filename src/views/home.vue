<template>
   <section
      class="home-page"
      @scroll.passive="scrollListener"
      :class="{ scrolled: isScroll }"
   >
      <div class="home-header">
         <nav class="nav-header">
            <div class="logo">
               <svg
                  role="img"
                  alt="Trackero"
                  aria-label="Trackero"
                  height="100px"
                  viewBox="0 0 63.4 62.4"
                  width="100px"
                  class="d-block"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
               >
                  <linearGradient
                     id="trello-logo-default"
                     x1="50.048061%"
                     x2="50.048061%"
                     y1="100%"
                     y2="0%"
                  >
                     <stop offset="0" stop-color="#0052cc"></stop>
                     <stop offset="1" stop-color="#2684ff"></stop>
                  </linearGradient>
                  <g fill="none" fill-rule="evenodd">
                     <path
                        d="m55.59.07h-47.59c-4.09405078 0-7.41448241 3.31595294-7.42006073 7.41v47.52c-.00791682 1.9730991.77030774 3.8681213 2.16269326 5.2661365 1.39238553 1.3980151 3.28425224 2.1838635 5.25736747 2.1838635h47.59c1.9713817-.0026407 3.8606757-.7896772 5.250897-2.1874031s2.1670753-3.2912295 2.1591638-5.2625969v-47.52c-.0055694-4.09014608-3.3199147-7.40449138-7.4100608-7.41zm-28.09 44.93c-.0026377.6594819-.2678382 1.2907542-.7369724 1.7542587-.4691341.4635046-1.1035619.721065-1.7630276.7158222h-10.4c-1.3602365-.005588-2.46-1.1098333-2.46-2.4700809v-30.95c0-1.3602476 1.0997635-2.4644929 2.46-2.47h10.4c1.3618668.0054804 2.4645196 1.1081332 2.47 2.47zm24-14.21c0 .6603158-.2642968 1.2931595-.7340204 1.7572465-.4697237.464087-1.1057125.7207735-1.7659796.7129359h-10.4c-1.3618668-.0056628-2.4645196-1.1083156-2.47-2.4701824v-16.74c.0054804-1.3618668 1.1081332-2.4645196 2.47-2.47h10.4c1.3602365.0055071 2.4600111 1.1097524 2.46 2.47z"
                        fill="url(#trello-logo-default)"
                     ></path>
                  </g>
               </svg>
               Trackero
            </div>
            <div class="header-buttons">
               <a href="#/login" class="login-btn nav-button">Log in</a>
               <a href="#/signup" class="signup-btn nav-button">Sign-up</a>
            </div>
         </nav>
      </div>
      <div class="home-container">
         <div class="hero-container">
            <section class="hero">
               <div class="hero-info">
                  <h1>Trackero helps teams move work forward.</h1>
                  <p>
                     Collaborate, manage projects, and reach new productivity
                     peaks. From high rises to the home office, the way your
                     team works is unique - accomplish it all with Trackero.
                  </p>
                  <div class="start-btn-container">
                     <a class="clean-link" href="#/board">Try Demo</a>
                  </div>
               </div>
               <div class="hero-img">
                  <img
                     :src="`https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png`"
                  />
               </div>
            </section>
         </div>
         <div class="product">
            <div class="product-info">
               <h2>It's more than work. It's a way of working together.</h2>
               <p>
                  Start with a Trackero board, lists, and cards. Customize and
                  expand with more features as your teamwork grows. Manage
                  projects, organize tasks, and build team spirit - all in one
                  place.
               </p>
               <a class="start-doing-btn" href="#/board">Start doing →</a>
            </div>
            <div>
               <img
                  :src="`https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png`"
                  alt=""
               />
            </div>
         </div>
         <div class="features">
            <div class="features-info">
               <div class="row py-5">
                  <div class="col-md-5 mb-3 mb-md-0">
                     <img
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/features/b845022d8d738ba8fa5e8b293e434149/card-back.svg"
                        width="339.13"
                        height="275.31"
                        class="img-fluid w-100"
                     />
                  </div>
                  <div class="col-md-7">
                     <h2 class="text-sm-header">
                        Features to help your team succeed
                     </h2>
                     <p class="text-gray">
                        Powering a productive team means using a powerful tool
                        (and plenty of snacks). From meetings and projects to
                        events and goal setting, Trackero’s intuitive features
                        give any team the ability to quickly set up and
                        customize workflows for just about anything.
                     </p>
                  </div>
               </div>
               <div class="row py-5 reversed-row">
                  <div class="col-md-5 mb-3 mb-md-0">
                     <img
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/features/5f90e4a913ac52092f2ac7ff308c45c4/view.svg"
                        width="414.57"
                        height="312.57"
                        class="img-fluid w-100"
                     />
                  </div>
                  <div class="col-md-7">
                     <!-- <h5>Choose a view</h5> -->
                     <h2 class="text-sm-header">
                        The board is just the beginning
                     </h2>
                     <p class="text-gray">
                        Lists and cards are the building blocks of organizing
                        work on a Trackero board. Grow from there with task
                        assignments, timelines, productivity metrics, calendars,
                        and more.
                     </p>
                  </div>
               </div>
               <!-- <div class="row py-5">
                  <div class="col-md-5 order-md-2 mb-3 mb-md-0">
                     <img
                        :src="`https://image.freepik.com/free-vector/task-management-abstract-concept-illustration_335657-2127.jpg`"
                     />
                  </div>
                  <div class="col-md-7">
                     <h2 class="text-sm-header">
                        Cards contain everything you need
                     </h2>
                     <p class="text-gray">
                        Trackero cards are your portal to more organized
                        work—where every single part of your task can be
                        managed, tracked, and shared with teammates. Open any
                        card to uncover an ecosystem of checklists, due dates,
                        attachments, conversations, and more.
                     </p>
                  </div>
               </div> -->
            </div>
         </div>
      </div>
   </section>
</template>

<script>

export default {
   name: 'homePage',
   data() {
      return {
         isScroll: false,

      }
   },
   async created() {
      await this.$store.dispatch({ type: 'loadBoards' })
   },
   methods: {
      scrollListener(ev) {
         if (ev.target.scrollTop !== 0) {
            this.isScroll = true
         } else {
            this.isScroll = false
         }
      },

   },

}
</script>
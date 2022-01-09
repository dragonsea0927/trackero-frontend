import Vue from 'vue'
import Vuex from 'vuex'
import { boardStore } from './board-store.js'
import { userStore } from './user-store.js'
import { photoStore } from './photo-store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import TextareaAutosize from 'vue-textarea-autosize'
import VCalendar from 'v-calendar'
import moment from 'moment'
import VueDragscroll from 'vue-dragscroll'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(VueDragscroll)
Vue.prototype.moment = moment
Vue.use(TextareaAutosize)
Vue.use(Vuex)
Vue.use(ElementUI, { locale })
Vue.use(VCalendar, {
	componentPrefix: 'vc'
})

export default new Vuex.Store({
	modules: {
		boardStore,
		userStore,
		photoStore
	}
})

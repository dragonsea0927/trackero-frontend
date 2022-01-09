<template>
	<div class="board-menu">
		<div class="board-menu-container">
			<div class="board-menu-tab-content">
				<div class="board-menu-header is-in-frame" :class="{ 'is-board-menu-default-view': !innerCmps }">
					<div class="board-menu-header-content">
						<a @click="showMainPage" class="board-menu-header-back-button icon-lg icon-back" title="Go back."></a>
						<h3 class="board-menu-header-title">Menu</h3>
						<a @click="closeMenu" class="board-menu-header-close-button icon-lg icon-close" title="Close the board menu."></a>
					</div>
					<hr class="board-menu-header-divider" />
				</div>
				<div class="board-menu-content custom-scrollbar">
					<div class="board-menu-content-container">
						<menu-main-page
							@mainMenuPage="showMainPage"
							@innerPages="innerPages"
							:isBoardMainPage="isBoardMainPage"
							:moreOptions="moreOptions"
							:board="board"
							v-if="mainCmp"
						/>
						<menu-more-page v-else :board="board" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
import menuMainPage from '@/cmps/board-side-menu/board-sidemenu-main-page'
import menuMorePage from '@/cmps/board-side-menu/board-sidemenu-more-page'

export default {
	name: 'board-side-menu',
	props: {
		onSideMenuOpen: Function,
		required: true,
		isBoardMenuOpen: Boolean,
		required: true,
		board: Object,
		required: true
	},
	components: {
		Avatar,
		menuMainPage,
		menuMorePage
	},
	data() {
		return {
			isBoardMainPage: true,
			mainCmp: true,
			innerCmps: false
		}
	},
	methods: {
		closeMenu() {
			this.onSideMenuOpen()
			this.mainCmp = true
			this.isBoardMainPage = true
		},
		moreOptions() {
			this.mainCmp = false
			this.isBoardMainPage = false
		},
		showMainPage() {
			this.isBoardMainPage = true
			this.mainCmp = true
			this.innerCmps = false
		},
		innerPages(cmp) {
			this.innerCmps = true
			this.isBoardMainPage = false
		}
	}
}
</script>

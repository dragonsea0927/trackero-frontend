<template>
	<section :style="{ left: modalCmp.posX + 'px' }" class="header-modal">
		<header class="header-modal-header">
			<div class="header-modal-title" :title="modalCmp.type">
				{{ modalCmp.type }}
			</div>
			<button @click="modalToggle" class="header-close-modal-btn">
				<span class="header-close-modal-btn-icon">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
							fill="currentColor"
						></path>
					</svg>
				</span>
			</button>
		</header>
		<div class="header-modal-body modal-templates">
			<div class="header-modal-body-content">
				<div class="templates-modal-wrapper">
					<div class="templates-modal-container">
						<div class="templates-modal-title">
							<span class="template-modal-title-content">
								<span class="flex-center"><h3>Top templates</h3></span>
							</span>
							<button @click="toggleList" class="template-modal-toggle-list">
								<span v-if="!listCollapsed" class="collapse-icon toggle-list-icon-container">
									<span class="toggle-list-icon">
										<svg
											width="24"
											height="24"
											role="presentation"
											focusable="false"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12.7071 7.29289L19.7782 14.364C20.1687 14.7545 20.1687 15.3876 19.7782 15.7782C19.3877 16.1687 18.7545 16.1687 18.364 15.7782L12 9.41421L5.63606 15.7782C5.24554 16.1687 4.61237 16.1687 4.22185 15.7782C3.83132 15.3877 3.83132 14.7545 4.22185 14.364L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
												fill="currentColor"
											></path>
										</svg>
									</span>
								</span>
								<span v-else class="collapse-icon toggle-list-icon-container">
									<span class="toggle-list-icon">
										<svg
											width="24"
											height="24"
											role="presentation"
											focusable="false"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
												fill="currentColor"
											></path>
										</svg>
									</span>
								</span>
							</button>
						</div>
						<div class="templates-modal-list" :class="{ collapsed: listCollapsed }">
							<div class="template-board" v-for="board in boards" :key="board._id">
								<router-link @click.native="modalToggle" class="template-board-link" :to="`/board/${board._id}`">
									<div
										class="board-bg-cover"
										:style="{ background: board.style.bgColor, 'background-repeat': 'no-repeat', 'background-size': 'cover' }"
									></div>
									<div class="board-title">{{ board.title }}</div>
								</router-link>
							</div>
						</div>
						<div class="working-on-more-templates-container">
							<span class="logo-container">
								<div class="logo">
									<svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M7 3C7 2.44772 7.44772 2 8 2H9C9.55228 2 10 2.44772 10 3C10 3.55228 9.55228 4 9 4H8C7.44772 4 7 3.55228 7 3Z"
											fill="currentColor"
										></path>
										<path
											d="M3 7C2.44772 7 2 7.44772 2 8V9C2 9.55228 2.44772 10 3 10C3.55228 10 4 9.55228 4 9V8C4 7.44772 3.55228 7 3 7Z"
											fill="currentColor"
										></path>
										<path
											d="M2 12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12V13C4 13.5523 3.55228 14 3 14C2.44772 14 2 13.5523 2 13V12Z"
											fill="currentColor"
										></path>
										<path
											d="M2 16C2 15.4477 2.44772 15 3 15C3.55228 15 4 15.4477 4 16V19C2.89543 19 2 18.1046 2 17V16Z"
											fill="currentColor"
										></path>
										<path
											d="M12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4H13C13.5523 4 14 3.55228 14 3C14 2.44772 13.5523 2 13 2H12Z"
											fill="currentColor"
										></path>
										<path
											d="M15 3C15 2.44772 15.4477 2 16 2H17C18.1046 2 19 2.89543 19 4H16C15.4477 4 15 3.55228 15 3Z"
											fill="currentColor"
										></path>
										<path
											d="M4 2C2.89543 2 2 2.89543 2 4V5C2 5.55228 2.44772 6 3 6C3.55228 6 4 5.55228 4 5V4H5C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2H4Z"
											fill="currentColor"
										></path>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M7 5C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H7ZM8 7C7.44772 7 7 7.44771 7 8V17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17V8C12 7.44772 11.5523 7 11 7H8ZM14 8C14 7.44772 14.4477 7 15 7H18C18.5523 7 19 7.44772 19 8V13C19 13.5523 18.5523 14 18 14H15C14.4477 14 14 13.5523 14 13V8Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</span>
							<p>Right place for the templates that help you stay productive</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Templates',
	props: {
		modalCmp: Object,
		required: true,
		loggedUser: Object,
		required: true
	},
	data() {
		return {
			boards: null,
			listCollapsed: false
		}
	},
	async created() {
		try {
			await this.$store.dispatch({ type: 'loadBoards' })
			this.boards = this.$store.getters.boardsForDisplay
		} catch (err) {
			console.log(err)
		}
	},
	methods: {
		modalToggle() {
			this.$emit('toggleModal')
		},
		toggleList() {
			this.listCollapsed = !this.listCollapsed
		}
	}
}
</script>

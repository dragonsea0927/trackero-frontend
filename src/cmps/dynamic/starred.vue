<template>
	<section :style="{ left: modalCmp.posX + 'px' }" class="header-modal">
		<header class="header-modal-header">
			<div class="header-modal-title" :title="modalCmp.type">Starred boards</div>
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
		<div class="header-modal-body" :style="{ paddingBottom: 0 }">
			<div class="header-modal-body-content">
				<div class="starred-boards-container">
					<ol class="starred-boards-list" v-if="starredBoards.length > 0">
						<template v-for="board in starredBoards">
							<li class="starred-board" :key="board._id">
								<div>
									<router-link @click.native="modalToggle" class="starred-board-link" :to="`/board/${board._id}`">
										<div
											class="board-bg-color template-cover"
											:style="{ background: board.bgColor, 'background-repeat': 'no-repeat', 'background-size': 'cover' }"
										></div>
										<div class="starred-board-info">
											<div class="starred-board-title">{{ board.title }}</div>
										</div>
										<div class="modal-toggle-star-btn-container">
											<div class="modal-toggle-star-btn">
												<a
													@click="unstarBoard(board._id)"
													class="header-btn header-star-container"
													title="Click to star or unstar this board. Starred board show up at the top of your boards list"
												>
													<span class="icon-star header-btn-icon icon-starred">
														<svg
															version="1.1"
															id="Capa_1"
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink"
															x="0px"
															y="0px"
															viewBox="0 0 55.867 55.867"
															style="enable-background: new 0 0 55.867 55.867"
															xml:space="preserve"
														>
															<path
																d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"
															/>
														</svg>
													</span>
												</a>
											</div>
										</div>
									</router-link>
								</div>
							</li>
						</template>
					</ol>
					<template v-else>
						<img src="https://a.trellocdn.com/prgb/dist/images/starred-boards-menu/starred-board.cc47d0a8c646581ccd08.svg" />
						<p class="no-starred-boards-desc">Star important board to access them quickly and easily.</p>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Starred',
	props: {
		modalCmp: Object,
		required: true
	},
	data() {
		return {
			starredBoards: null,
			loggedUser: this.$store.getters.currLoggedUser
		}
	},
	created() {
		this.starredBoards = this.loggedUser.starredBoards
	},
	methods: {
		modalToggle() {
			this.$emit('toggleModal')
		},
		async unstarBoard(boardId) {
			try {
				const userToUpdate = JSON.parse(JSON.stringify(this.loggedUser))
				const idx = userToUpdate.starredBoards.findIndex(board => board._id === boardId)
				userToUpdate.starredBoards.splice(idx, 1)
				await this.$store.dispatch({ type: 'updateUser', user: userToUpdate })
			} catch (err) {
				console.log(err)
			}
		}
	}
}
</script>

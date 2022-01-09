<template>
	<div>
		<ul class="board-menu-navigation">
			<li class="board-menu-navigation-item mod-background">
				<a @click="toggleBoardWatch" class="board-menu-navigation-item-link change-background">
					<span class="board-menu-navigation-item-link-icon fill-background-preview"></span>
					&nbsp;Watch
				</a>
			</li>
		</ul>
		<hr />
		<ul class="board-menu-navigation">
			<li class="board-menu-navigation-item">
				<a @click="leaveBoard" class="board-menu-navigation-item-link open-archive"> &nbsp;Leave board... </a>
			</li>
			<li class="board-menu-navigation-item">
				<a @click="removeBoard" class="board-menu-navigation-item-link open-more"> &nbsp;Delete board... </a>
			</li>
		</ul>
		<hr />
		<form class="board-link">
			<label for="id-short-url">Link to this board</label>
			<input @click="$event.target.select()" type="text" id="id-short-url" class="short-url" readonly="readonly" :value="boardUrl" />
			<p class="quiet">
				<span class="icon-organization-visibility" title="All members of the Workspace can see and edit this board"></span>
				All members of the Workspace can see and edit this board
			</p>
		</form>
	</div>
</template>

<script>
export default {
	name: 'sidemenu-more-dynamic',
	props: {
		board: Object,
		required: true
	},
	data() {
		return {
			loggedUser: null
		}
	},
	created() {
		this.loggedUser = this.$store.getters.currLoggedUser
	},
	methods: {
		toggleBoardWatch() {
			let userToUpdate = this.loggedUser
			const idx = userToUpdate.subscribedTo.findIndex(board => board === this.board._id)
			idx === -1 ? userToUpdate.subscribedTo.push(this.board._id) : userToUpdate.subscribedTo.splice(idx, 1)
			this.$store.dispatch('saveUser', { user: userToUpdate })
		},
		leaveBoard() {
			let userToUpdate = this.loggedUser
			const idx = this.board.members.indexOf(member => member._id === userToUpdate._id)
			if (idx !== -1) {
				this.board.members.splice(idx, 1)
				this.$store.dispatch('updateBoard', { board: this.board })
			} else return
		},
		removeBoard() {
			let userToUpdate = this.loggedUser
			const idx = userToUpdate.starredBoards.findIndex(board => board._id === this.board._id)
			if (idx !== -1) userToUpdate.starredBoards.splice(idx, 1)
			this.$store.dispatch('updateUser', { user: userToUpdate })
			this.$store.dispatch({ type: 'removeBoard', boardId: this.board._id })
			this.$router.push('/board')
		}
	},
	computed: {
		boardUrl() {
			return window.location
		}
	}
}
</script>

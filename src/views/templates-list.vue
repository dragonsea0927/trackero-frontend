<template>
	<section class="workspace-container-wrapper">
		<div class="workspace-container">
			<loaderSpinner v-if="!boards || !starred"/>
			<div class="boards-wrapper" v-if="boards && starred">
				<div class="starred-boards">
					<div class="preview-title" v-if="boards">
						<h3>
							<span class="icon-lg icon-star board-star-btn-icon"></span>
							STARRED WORKSPACES
						</h3>
					</div>
					<div class="board-list" v-if="starred.length">
						<router-link v-for="(board, idx) in starred" :key="idx" class="board-link" :to="`board/${board._id}`">
							<div class="board-preview" :style="{ background: board.bgColor, 'background-repeat': 'no-repeat', 'background-size': 'cover' }">
								<div class="board-preview-details">
									<h3>{{ board.title }}</h3>
									<span @click.prevent="toggleIsStarred(board)" class="icon-lg icon-star board-star-btn-icon is-on"></span>
								</div>
							</div>
						</router-link>
						<!-- <button @click="removeBoard(boardId)">Delete</button> -->
					</div>
				</div>
				<div class="workspaces-boards">
					<div class="preview-title" v-if="boards">
						<h3>
							<span class="board-menu-navigation-item-link-icon icon-lg icon-board"></span>
							YOUR WORKSPACES
						</h3>
					</div>
					<div class="board-list">
						<router-link v-for="(board, idx) in boards" :key="idx" class="board-link" :to="`/board/${board._id}`">
							<div
								class="board-preview"
								:style="{ background: board.style.bgColor, 'background-repeat': 'no-repeat', 'background-size': 'cover' }"
							>
								<div class="board-preview-details">
									<h3>{{ board.title }}</h3>
									<span class="icon-lg icon-star board-star-btn-icon" @click.prevent="toggleIsStarred(board)"></span>
								</div>
							</div>
							<!-- <button @click.prevent="removeBoard(board._id)">
                        Delete
                     </button> -->
						</router-link>
						<form class="add-board-section" @submit.prevent="addBoard">
							<div @click="toggleInput" v-if="!isInputOpen" class="add-board-input-closed">
								<h2>Create new board</h2>
							</div>
							<div v-if="isInputOpen" class="add-board-form-section">
								<div class="add-board-input-section">
									<input class="add-board-input" type="text" placeholder="Board title" v-model="newBoard.title" />
								</div>
								<div class="add-board-control-section">
									<button class="add-board-confirm-btn">Add Board</button>
									<span @click="toggleInput" class="icon-lg icon-close"></span>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { boardService } from './../services/board-service.js'
import loaderSpinner from '@/cmps/loader-spinner'

export default {
	name: 'templates-list',
	components: {
		loaderSpinner
	},
	data() {
		return {
			newBoard: {
				title: '',
				bgColor: '#0079bf'
			},
			boards: null,
			currBoard: null,
			starred: null,
			isInputOpen: false,
			loggedUser: null
		}
	},
	async created() {
		await this.$store.dispatch({ type: 'loadBoards' })
		this.loggedUser = await this.$store.getters.currLoggedUser
		if (this.loggedUser) this.starred = this.loggedUser.starredBoards
		this.boards = this.$store.getters.boardsForDisplay
	},
	methods: {
		async addBoard() {
			try {
				if (!this.newBoard.title) return
				let boardToSave = boardService.getEmptyBoard()
				const { _id, username, fullname, imgUrl } = this.loggedUser
				const { title, bgColor } = this.newBoard
				boardToSave.title = title
				if (boardToSave.style.bgColor !== '') boardToSave.style.bgColor = bgColor
				else boardToSave.style.bgColor = this.newBoard.bgColor
				boardToSave.createdBy = { _id, username, fullname, imgUrl }
				await this.$store.dispatch({ type: 'addBoard', board: boardToSave })
				this.boards = this.$store.getters.boardsForDisplay
				this.newBoard.title = ''
				this.toggleInput()
			} catch (err) {
				console.log(err)
			}
		},
		async removeBoard(boardId) {
			try {
				await this.$store.dispatch({ type: 'removeBoard', boardId })
				await this.$store.dispatch({ type: 'loadBoards' })
				this.boards = this.$store.getters.boardsForDisplay
			} catch (err) {
				console.log(err)
			}
		},
		async toggleIsStarred(board) {
			try {
				const boardId = board._id
				if (this.loggedUser.starredBoards.length) {
					var idx = this.loggedUser.starredBoards.findIndex(board => board._id === boardId)
					if (idx === -1) {
						const { _id, title, style } = board
						this.loggedUser.starredBoards.push({ _id, title, ...style })
					} else this.loggedUser.starredBoards.splice(idx, 1)
				} else {
					const { _id, title, style } = board
					this.loggedUser.starredBoards.push({ _id, title, ...style })
				}
				await this.$store.dispatch({ type: 'updateUser', user: this.loggedUser })
				await this.$store.dispatch({ type: 'loadBoards' })
			} catch (err) {
				console.log(err)
			}
		},
		async toggleInput() {
			try {
				this.isInputOpen = !this.isInputOpen
			} catch (err) {
				console.log(err)
			}
		}
	},
}
</script>

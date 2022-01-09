<template>
	<!-- <section class="list-card-preview"> -->

	<article role="button" class="list-card" v-if="!task.isArchived">
		<router-link :to="`/board/${board._id}/${group.id}/${task.id}`">
			<div v-if="taskCover" class="list-card-cover" :style="taskCover" :class="{ img: task.style.url }">
				<span class="icon-edit icon-sm list-card-operation" @click.prevent="openPreviewEdit($event)"></span>
			</div>
			<!-- pencil-edit -->
			<div v-if="!taskCover" @click.prevent="openPreviewEdit($event)" class="list-card-edit-pencil">
				<span class="icon-sm icon-edit list-card-operation"></span>
			</div>
			<!-- list-card-details -->
			<div class="list-card-details">
				<div v-if="task.labels && task.labels.length" class="list-card-labels">
					<label-checkboxes :checked="getChecked" />
					<label for="label-toggler" class="label-toggler" @click.self.prevent="toggle">
						<span v-for="label in task.labels" :key="label.id" class="card-label" :class="'label-' + label.color">
							<span class="label-text">{{ label.title }}</span>
						</span>
					</label>
				</div>

				<div class="list-card-title">
					<span class="task-id hide">{{ task.id }}</span>
					<span>{{ task.title }}</span>
				</div>
				<!-- badges -->
				<div class="badges">
					<span class="js-badges">
						<div v-if="isWatchingBadge" class="badge" title="You are watching this card.">
							<span class="badge-icon icon-sm icon-subscribe"></span>
						</div>
						<div v-if="isDatesBadge" class="badge is-due-soon" title="This card is due in less than twenty-four hours.">
							<span class="badge-icon icon-sm icon-clock"></span>
							<span class="badge-text js-due-date-text">
								{{ organizedDates }}
							</span>
						</div>
						<div v-if="task.description" class="badge" title="This card has a description.">
							<span class="badge-icon icon-sm icon-description"></span>
						</div>
						<div v-if="task.comments && task.comments.length" class="badge" title="Comments">
							<span class="badge-icon icon-sm icon-comment"></span>
							<span class="badge-text">{{ task.comments.length }}</span>
						</div>
						<div v-if="task.attachments && task.attachments.length" class="badge" title="Attachments">
							<span class="badge-icon icon-sm icon-attachment"></span>
							<span class="badge-text">{{ task.attachments.length }}</span>
						</div>
						<div v-if="task.location.id" class="badge" title="This card has a location.">
							<span class="badge-icon icon-sm icon-location"></span>
						</div>
						<div v-if="task.checklists.length" class="badge" title="Checklist items">
							<span class="badge-icon icon-sm icon-checklist"></span>
							<span class="badge-text">{{ checklistItems }}</span>
						</div>
						<!-- <div class="badge hide" title="This card is archived">
                  <span class="badge-icon icon-sm icon-archive"></span>
                  <span class="badge-text">Archived</span>
               </div> -->
					</span>
				</div>

				<!-- task-members -->
				<div div v-if="task.members && task.members.length" class="task-detail-members-list list-card-members">
					<a class="member" v-for="member in task.members" :key="member._id" style="float: left">
						<avatar :src="member.imgUrl" :size="28" :username="member.fullname" :title="`${member.fullname}(${member.username})`" />
					</a>
				</div>
			</div>
		</router-link>
	</article>
	<!-- </section> -->
</template>
<script>
import Avatar from 'vue-avatar'
import labelCheckboxes from './task-preview-label-checkboxes'

export default {
	props: ['task', 'group', 'board'],
	components: {
		Avatar,
		labelCheckboxes
	},
	data() {
		return {
			currLoggedUser: null,
			modalPos: {}
		}
	},
	methods: {
		openPreviewEdit(ev) {
			const { top } = ev.target.parentElement.getBoundingClientRect()
			const { left } = ev.target.offsetParent.offsetParent.getBoundingClientRect()
			this.modalPos.left = left
			if (top > window.innerHeight - 150) this.modalPos.bottom = 50
			else this.modalPos.top = top
			this.$emit('openPreviewEdit', this.group, JSON.parse(JSON.stringify(this.task)), this.modalPos)
		},
		toggle(ev) {
			ev.stopPropagation()
			this.$store.commit('toggleCheckbox', { checked: this.checked })
		}
	},
	computed: {
		getChecked() {
			return this.$store.getters.checked
		},
		taskCover() {
			const cover = this.task.style
			var style = ''
			if (cover.bgColor !== '#ffffff') style += `background-color:${cover.bgColor}; `
			if (cover.url) style += `background-image: url('${cover.url}');`
			return style
		},
		isWatchingBadge() {
			this.currLoggedUser = this.$store.getters.currLoggedUser
			const idx = this.task.members.findIndex(member => member._id === this.currLoggedUser._id)
			if (idx !== -1) return true
		},
		isDatesBadge() {
			if (this.task.startDate.date || this.task.dueDate.date) return true
		},
		organizedDates() {
			if (this.task.startDate.date && this.task.dueDate.date) {
				const from = this.task.startDate.date.slice(0, 6)
				const to = this.task.dueDate.date.slice(0, 6)
				return `${from}-${to}`
			} else if (this.task.startDate.date) return this.task.startDate.date.slice(0, 6)
			return this.task.dueDate.date.slice(0, 6)
		},
		checklistItems() {
			let count = 0
			let totalTodos = 0
			this.task.checklists.forEach(checklist => {
				checklist.todos.forEach(todo => {
					totalTodos++
					if (todo.isDone) count++
				})
			})
			return `${count} / ${totalTodos}`
		}
	}
}
</script>

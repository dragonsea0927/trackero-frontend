<template>
	<div class="task-detail-item" v-if="startDate.date || dueDate.date">
		<h3 class="task-detail-item-header">{{ titleToShow }}</h3>
		<div class="task-detail-dates-badge">
			<a class="complete-box" href="#" role="button">
				<span class="complete-icon">
					<!-- <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg> -->
				</span>
			</a>
			<div class="content-container">
				<button class="dates-btn" @click="toggleListCmp($event, 'date-picker')">
					<span>{{ dateToShow }}</span>
					<span class="icon-container">
						<span class="open-dates-icon">
							<svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
									fill="currentColor"
								></path>
							</svg>
						</span>
					</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'date-list',
	props: {
		startDate: Object,
		required: true,
		dueDate: Object,
		required: true
	},
	methods: {
		toggleListCmp(ev, cmpName) {
			this.$emit('toggleListCmp', ev, cmpName)
		}
	},
	computed: {
		dateToShow() {
			const startDate = this.startDate.date
			const dueDate = this.dueDate.date
			if (startDate && dueDate) {
				const from = startDate.slice(0, 6)
				const to = dueDate.slice(0, 6)
				return `${from} - ${to}`
			}
			if (startDate) return startDate.slice(0, 6)
			return dueDate.slice(0, 6)
		},
		titleToShow() {
			const startDate = this.startDate.date
			const dueDate = this.dueDate.date
			if (startDate && dueDate) return 'Dates'
			if (dueDate && !startDate) return 'Due date'
			if (startDate && !dueDate) return 'Start date'
		}
	}
}
</script>

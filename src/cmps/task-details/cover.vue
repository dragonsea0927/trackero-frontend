<template>
	<section class="task-details-cover">
		<a @click="closeDetails" class="dialog-close-button" :class="[taskCover ? 'dark' : '']">
			<span class="icon-close icon-sm"></span>
		</a>
		<div v-if="taskCover" :class="{ img: task.style.url }" class="task-cover" :style="taskCover">
			<div class="task-cover-menu">
				<a @click="toggleListCmp($event, 'cover-menu')" class="task-cover-menu-button">
					<span class="icon-sm cover-menu-btn-icon"></span>
					Cover
				</a>
			</div>
		</div>
		<div v-if="task.isArchived" class="card-is-archived">
			<span class="icon-lg icon-archive"></span>
			<span class="sidebar-action-text">This card is archived</span>
		</div>
	</section>
</template>

<script>
export default {
	name: 'task-cover',
	props: {
		task: Object,
		required: true
	},
	methods: {
		closeDetails() {
			this.$emit('closeDetails')
		},
		toggleListCmp(ev, cmpName) {
			this.$emit('toggleListCmp', ev, cmpName)
		}
	},
	computed: {
		taskCover() {
			const cover = this.task.style
			var style = ''
			if (cover.bgColor !== '#ffffff') style += `background-color:${cover.bgColor}; `
			if (cover.url) style += `background-image: url('${cover.url}');`
			return style
		}
	}
}
</script>

<template>
	<div class="window-header">
		<span class="window-header-icon icon-lg"></span>
		<div class="window-title">
			<textarea-autosize v-model="newTitle" @blur.native="changeTaskTitle" class="task-detail-title-input" rows="1" />
		</div>
		<div class="window-header-inline-content">
			<p class="u-bottom">
				in list <a href="#">{{ groupTitle }}</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'task-title',
	props: {
		task: Object,
		required: true
	},
	created() {
		const { groupId } = this.$route.params
		const group = this.$store.getters.currBoard.groups.find(currGroup => currGroup.id === groupId)
		this.groupTitle = group.title
		this.newTitle = this.task.title
	},
	data() {
		return {
			groupTitle: '',
			newTitle: ''
		}
	},
    methods:{
        changeTaskTitle(){
            if (this.task.title === this.newTitle) return
            this.$emit('changeTaskTitle',this.newTitle)
        }
    }
}
</script>

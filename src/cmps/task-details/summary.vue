<template>
	<div class="task-detail-data clearfix">
		<memberList :members="task.members" @removeTaskMember="removeTaskMember" @toggleListCmp="toggleListCmp" />
		<labelList :labels="task.labels" @toggleListCmp="toggleListCmp" />
		<dateList :startDate="task.startDate" :dueDate="task.dueDate" @toggleListCmp="toggleListCmp" />
	</div>
</template>

<script>
import memberList from './member-list'
import labelList from './label-list'
import dateList from './date-list'

export default {
	name: 'task-summary',
	components: {
		memberList,
		labelList,
		dateList
	},
	props: {
		task: Object,
		required: true
	},
	methods: {
		removeTaskMember(user) {
			this.$emit('removeTaskMember', user)
		},
		toggleListCmp(ev, cmpName) {
			this.$emit('toggleListCmp', ev, cmpName)
		}
	}
}
</script>

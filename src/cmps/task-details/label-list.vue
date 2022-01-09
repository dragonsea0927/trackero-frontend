<template>
	<div v-if="labels.length" class="task-detail-item clearfix">
		<h3 class="task-detail-item-header">Labels</h3>
		<div v-if="labels && labels.length" class="task-detail-labels-list">
			<span
				v-for="label in labels"
				:key="label.id"
				@click="toggleListCmp($event, 'labels-list')"
				class="card-label task-detail-label"
				:class="'label-' + label.color"
			>
				<span class="label-text">{{ label.title }}</span>
			</span>
			<a class="task-detail-add-button">
				<span @click="toggleListCmp($event, 'labels-list')" class="add-btn-icon icon-lg">
					<img src="@/assets/img/plus-icon.svg" />
				</span>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'task-label-list',
	props: {
		labels: Array,
		required: true
	},
	methods: {
		toggleListCmp(ev, cmpName) {
			this.$emit('toggleListCmp', ev, cmpName)
		}
	}
}
</script>

<template>
	<div class="task-detail-desc">
		<div class="window-module">
			<div class="window-module-title">
				<span class="icon-description icon-lg"></span>
				<h3>Description</h3>
				<div v-show="!isEditing" class="editable">
					<a @click="toggleEdit" href="#" class="nch-button edit-btn">Edit</a>
				</div>
			</div>
			<div class="add-desc-area">
				<div class="desc">
					<div class="desc-content">
						<p @click="toggleEdit" v-show="taskDesc && !isEditing">
							{{ task.description }}
						</p>
						<p class="u-bottom">
							<a @click="toggleEdit" v-show="!taskDesc && !isEditing" class="description-fake-text-area no-box-sizing" href="#">
								Add a more detailed description…
							</a>
						</p>
					</div>
					<div v-show="isEditing" class="edit-container">
						<textarea-autosize ref="descinput" class="edit-input" v-model="taskDesc" type="textarea"> </textarea-autosize>
						<div class="action-btns">
							<button @click="saveTaskDesc" class="nch-button save-btn">Save</button>
							<a @click="toggleEdit" class="cancel-btn icon-lg"> </a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'task-description',
    props:{
        task:Object, required: true,
    },
	data() {
		return {
			isEditing: false,
            taskDesc: '',
		};
	},
    created(){
        this.taskDesc = this.task.description;  
    },
	methods: {
		toggleEdit() {
			this.isEditing = !this.isEditing;
			this.$nextTick(() => {
				this.$refs.descinput.$el.focus();
			});
		},
       	saveTaskDesc() {
			this.isEditing = false;
			this.$emit('saveTaskDesc', this.taskDesc)
		},
	}
};
</script>

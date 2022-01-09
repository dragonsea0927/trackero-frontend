<template>
	<div class="check-list-modal pop-over is-shown details-popup">
		<div class="no-back">
			<div class="pop-over-header">
				<span class="pop-over-header-title">Add checklist</span>
				<a class="pop-over-header-close-btn icon-sm icon-close" @click="closeList"></a>
			</div>
			<div class="pop-over-content">
				<div>
					<div class="pop-over-section">
						<form>
							<label for="id-checklist">Title</label>
							<input ref="titleinp" id="id-checklist" class="checklist-input" v-model="title" type="text" dir="auto" maxlength="512" />
							<input @click="addCheckList" class="nch-button add-btn" type="submit" value="Add" />
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'check-list',
	props: ['info'],
	data() {
		return {
			title: 'Checklist'
		};
	},
	methods: {
		closeList() {
			this.$emit('closeList');
		},
		addCheckList() {
			if (this.title.length) {
				this.$emit('addCheckList', this.title);
				this.$emit('closeList');
			} else {
				this.$refs.titleinp.focus();
			}
		}
	}
};
</script>

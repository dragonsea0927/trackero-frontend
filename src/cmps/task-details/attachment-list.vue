<template>
	<div v-if="task.attachments.length" class="task-detail-attachments">
		<div class="window-module">
			<div class="window-module-title">
				<span class="icon-attachment icon-lg"></span>
				<h3>Attachments</h3>
			</div>
			<div class="attachments-area clearfix">
				<div class="attachment-list">
					<template v-for="attachment in task.attachments">
						<attachmentPreview
							:key="attachment.id"
							:attachment="attachment"
							:currTaskCover="task.style.url"
							@removeAttachment="removeAttachment"
							@toggleTaskImg="toggleTaskImg"
						/>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import attachmentPreview from './attachment-preview.vue'
export default {
	name: 'attachment-list',
	props: {
		task: Object,
		required: true
	},
	components: {
		attachmentPreview
	},
	methods: {
		removeAttachment(attachment) {
			this.$emit('removeAttachment',attachment)
		},
		toggleTaskImg(ev, url) {
			this.$emit('toggleTaskImg', ev, url)
		}
	}
}
</script>

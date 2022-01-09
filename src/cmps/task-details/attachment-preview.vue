<template>
	<div class="attachment-thumbnail" :key="attachment.id">
		<a :href="attachment.url" target="_blank" class="attachment-thumbnail-preview">
			<img :src="attachment.url" alt="Search menu" />
		</a>
		<p class="attachment-thumbnail-details">
			<span class="attachment-thumbnail-name">{{ attachment.title }}</span>
			<span class="attachment-thumbnail-details-title-options">
				<span>
					Added
					<span class="date">
						{{ attachment.uploadDate }}
					</span></span
				>
				<span>
					<a class="attachment-thumbnail-details-title-options-item" href="#">
						<span @click="removeAttachment(attachment)" class="attachment-thumbnail-details-options-item-text delete-btn"> Delete </span>
					</a>
				</span>
			</span>
			<span class="attachment-thumbnail-details-options">
				<span class="icon-sm icon-card-cover"></span>
				<span
					v-show="currTaskCover !== attachment.url"
					@click="toggleTaskImg($event, attachment.url)"
					class="attachment-thumbnail-details-options-item-text"
					>Make cover</span
				>
				<span @click="toggleTaskImg($event)" v-show="currTaskCover === attachment.url" class="attachment-thumbnail-details-options-item-text"
					>Remove cover</span
				>
			</span>
		</p>
	</div>
</template>

<script>
export default {
	name: 'attachment-preview',
	props: {
		attachment: Object,
		required: true,
		currTaskCover: null
	},
	methods: {
		removeAttachment(attachment) {
			this.$emit('removeAttachment', attachment)
		},
		toggleTaskImg(ev, url) {
			this.$emit('toggleTaskImg', ev, url)
		}
	}
}
</script>

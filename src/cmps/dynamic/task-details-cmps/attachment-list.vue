<template>
	<div class="attachments-list-modal pop-over is-shown details-popup">
		<div class="no-back">
			<div class="pop-over-header">
				<span class="pop-over-header-title">Attach from...</span>
				<a class="pop-over-header-close-btn icon-sm icon-close" @click="closeList"></a>
			</div>
			<div class="pop-over-content">
				<!-- <input class="search-attachments" type="text" placeholder="Paste any link here" v-model="addedLink"> -->
				<div class="pop-over-section">
					<div class="attach-from">
						<label for="upload">
							<span>Computer</span>
							<input name="upload" class="choose-file" type="file" @click.self.stop @change="onUploadImg" />
						</label>
					</div>
					<form class="attach-link">
						<label class="label">Attach a link</label>
						<input class="search-input" placeholder="Paste any link here..." v-model="linkUrl" @click.once="changeIsEmpty" />
						<div v-if="!linkIsEmpty">
							<label class="label">link name (optional) </label>
							<input class="name-input" placeholder="Paste any link here..." v-model="linkUrlName" />
						</div>

						<button @click="saveLink" class="card-edit-btn">Attach</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { uploadImg } from '@/services/imgUpload.service.js';
import utilService from '../../../services/util-service.js';

export default {
	name: 'attachment-list',
	components: {},
	props: ['info'],
	data() {
		return {
			filterBy: {
				title: ''
			},
			imgUrls: [],
			linkUrlS: [],
			newLink: '',
			linkIsEmpty: true,
			linkUrl: '',
			linkUrlName: '',
			task: this.info.task
		};
	},
	methods: {
		async onUploadImg(ev) {
			try {
				let res = await uploadImg(ev);
				this.saveImg(res);
			} catch (err) {
				console.log(err);
			}
		},
		attachmentEnter(ev) {
			ev.target.classList.add('attachment-hover');
		},
		attachmentLeave(ev) {
			ev.target.classList.remove('attachment-hover');
		},

		isLabel(id) {
			const attachmentIdx = this.info.task.attachments.findIndex(attachment => attachment.id === id);
			if (attachmentIdx !== -1) return 'icon-check';
			else return '';
		},
		closeList() {
			this.$emit('closeList');
		},
		addActivity(txt) {
			const activity = {
				txt,
				byMember: this.$store.getters.currLoggedUser,
				createdAt: Date.now()
			};
			this.task.activities.unshift(activity);
		},
		saveImg(res) {
			this.task.attachments.push({ id: res.asset_id, url: res.url, title: res.original_filename + '.' + res.format });
			this.addActivity(`Added new attachment ${res.original_filename}`);
			this.$store.dispatch({ type: 'updateTask', groupId: this.info.groupId, task: this.task });
		},
		saveLink() {
			const id = this.makeId();
			this.task.attachments.push({ id, url: this.linkUrl, title: this.linkUrlName });
			this.$store.dispatch({ type: 'updateTask', groupId: this.info.groupId, task: this.task });
		},
		changeIsEmpty() {
			this.linkIsEmpty = !this.linkIsEmpty;
		},
		makeId(length = 12) {
			var txt = '';
			var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for (var i = 0; i < length; i++) {
				txt += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return txt;
		}
	},
	computed: {}
};
</script>

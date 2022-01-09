<template>
	<aside class="window-sidebar no-box-sizing">
		<div v-if="!showSuggested" class="window-module suggested-actions-module">
			<div class="suggested-actions-settings">
				<span class="settings-icon icon-sm"></span>
			</div>
			<h3>Suggested</h3>
			<div class="clearfix">
				<a @click="emitAction('joinTask')" class="button-link" title="Join" href="#">
					<span class="icon-sm icon-member"></span>
					<span class="sidebar-action-text">Join</span>
				</a>
			</div>
		</div>
		<div class="window-module clearfix">
			<div class="u-clearfix">
				<h3>Add to card</h3>
				<template v-for="(option, idx) in options.cmps">
					<a  @click="toggleListCmp($event, option.cmp)" class="button-link" :title="option.title" :key="option + idx">
						<span class="icon-sm" :class="option.icon"></span>
						<span class="sidebar-action-text">{{ option.title }}</span>
					</a>
				</template>
			</div>
		</div>
		<div class="window-module clearfix action-buttons">
			<h3 class="no-top-margin">Actions</h3>
			<div class="clearfix u-clearfix">
				<!-- <a class="button-link" title="Watch the card to get notifications when something changes." href="#">
					<span class="icon-sm icon-watch"></span>
					<span class="sidebar-action-text">Watch</span>
				</a> -->
				<a class="button-link" title="Share" href="#">
					<span class="icon-sm icon-share"></span>
					<span @click="shareViaWebShare" class="sidebar-action-text">Share</span>
				</a>
				<a v-if="!task.isArchived" @click="handleTask('toggleArhive', task)" class="button-link" title="Archive">
					<span class="icon-sm icon-archive"></span>
					<span class="sidebar-action-text">Archive</span>
				</a>
				<div v-if="task.isArchived">
					<a @click="handleTask('toggleArhive', task)" class="button-link" title="Send to board">
						<span class="icon-sm icon-restore"></span>
						<span class="sidebar-action-text">Send to board</span>
					</a>
					<a @click="handleTask('removeTask', task)" class="button-link card-delete-btn" title="Delete">
						<span class="icon-sm icon-remove" :style="{ color: 'white' }"></span>
						<span class="sidebar-action-text">Delete</span>
					</a>
				</div>
			</div>
		</div>
	</aside>
</template>

<script>
export default {
	name: 'task-sidebar',
	components: {},
	props: {
		task: Object,
		required: true
	},
	data() {
		return {
			loggedInUser: null,
			options: {
				cmps: [
					{ title: 'Members', icon: 'icon-member', cmp: 'members-list' },
					{ title: 'Labels', icon: 'icon-label', cmp: 'labels-list' },
					{ title: 'Checklist', icon: 'icon-checklist', cmp: 'check-list' },
					{ title: 'Dates', icon: 'icon-clock', cmp: 'date-picker' },
					{ title: 'Attachment', icon: 'icon-attachment', cmp: 'attachment-list' },
					{ title: 'Cover', icon: 'icon-cover', cmp: 'cover-menu' }
				]
			}
		}
	},
	created() {
		this.loggedInUser = this.$store.getters.currLoggedUser
	},
	methods: {
		shareViaWebShare() {
			navigator.share({
				title: this.task.title,
				text: 'Check out my board!',
				url: this.$route.path
			})
		},
		emitAction(action) {
			this.$emit(action)
		},
		handleTask(action, task) {
			this.$emit(action, task)
		},
		toggleListCmp(ev, cmpName) {
			this.$emit('toggleListCmp', ev, cmpName)
		}
	},
	computed: {
		showSuggested() {
			const loggedInUserId = this.loggedInUser._id
			var isShowSuggest = false
			this.task.members.forEach(member => {
				if (member._id === loggedInUserId) {
					isShowSuggest = true
				}
			})
			return isShowSuggest
		}
	}
}
</script>

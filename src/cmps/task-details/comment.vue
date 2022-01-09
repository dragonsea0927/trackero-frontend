<template>
	<div>
		<div class="new-comment-section">
			<div v-show="loggedInUser" class="member">
				<avatar
					:src="loggedInUser.imgUrl"
					:size="30"
					:username="loggedInUser.fullname"
					:title="`${loggedInUser.fullname}(${loggedInUser.username})`"
				/>
			</div>
			<form>
				<div class="comment-frame" :class="{ focused: isCommenting }">
					<div class="comment-box" :class="{ focused: isCommenting }">
						<textarea-autosize
							class="comment-box-input"
							@click.native="isCommenting = true"
							:class="{ focused: isCommenting }"
							rows="1"
							v-model="newCommentTxt"
							aria-label="Write a comment"
							placeholder="Write a comment…"
							dir="auto"
						>
						</textarea-autosize>
						<div
							v-show="isCommenting"
							class="comment-controls"
							:style="[
								isCommenting
									? {
											opacity: 1,
											transform: 'translateY(0)'
									  }
									: ''
							]"
						>
							<input
								ref="commentinput"
								@click="saveComment"
								class="nch-button save-btn"
								:class="{ primary: newCommentTxt }"
								type="submit"
								value="Save"
							/>
							<a @click="isCommenting = false" class="cancel-btn icon-lg"> </a>
						</div>
					</div>
				</div>
			</form>
		</div>
		<template v-if="task.comments.length">
			<template v-for="comment in task.comments">
				<div class="comment-container" :key="comment.id">
					<div class="comment-creator">
						<div class="member">
							<avatar :src="loggedInUser.imgUrl" :size="30" :username="comment.byMember.fullname" :title="`${comment.byMember.fullname}`" />
						</div>
					</div>
					<div class="comment-desc">
						<span :style="{ 'font-weight': 'bold' }">{{ comment.byMember.fullname }} </span>
						<span :style="{ 'font-size': '12px' }">{{ moment(comment.createdAt).fromNow() }}</span>
						<div class="comment-content">
							<div class="action-comment">
								<div class="current-comment">
									{{ comment.txt }}
								</div>
							</div>
						</div>
					</div>
					<div class="comment-actions">
						<a @click="removeComment(comment)" class="comment-delete-btn" href="#">Delete</a>
					</div>
				</div>
			</template>
		</template>
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
	name: 'task-comment',
	components: {
		Avatar
	},
	props: {
		task: Object,
		required: true
	},
	data() {
		return {
			loggedInUser: null,
			isCommenting: false,
			newCommentTxt: ''
		}
	},
	created() {
		this.loggedInUser = this.$store.getters.currLoggedUser
	},
	methods: {
		saveComment() {
			if (!this.newCommentTxt.length) {
				this.$refs.commentinput.focus()
				return
			}
			this.$emit('saveComment', this.newCommentTxt)
			this.newCommentTxt = ''
		},
		removeComment(comment) {
			this.$emit('removeComment', comment)
		}
	}
}
</script>

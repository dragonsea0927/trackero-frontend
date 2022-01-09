<template>
	<div class="task-detail-activity window-module">
		<div class="window-module-title">
			<span class="icon-activity icon-lg"></span>
			<h3>Activity</h3>
			<div class="window-module-title-options">
				<a v-if="isShowActivity" @click="toggleActivity" class="show-details-btn" href="#">Show details</a>
				<a v-else @click="toggleActivity" class="hide-details-btn" href="#">Hide details</a>
			</div>
		</div>
		<div v-show="!isShowActivity">
			<template v-for="(activity, idx) in task.activities">
				<div class="activity-container" :key="idx">
					<div class="activity">
						<div class="activity-creator">
							<div class="member">
								<avatar
									:src="loggedInUser.imgUrl"
									:size="30"
									:username="activity.byMember.fullname"
									:title="`${activity.byMember.fullname}`"
								/>
							</div>
						</div>
						<div class="activity-desc">
							<span :style="{ 'font-weight': 'bold' }">{{ activity.byMember.fullname }} </span>
							<span>{{ activity.txt }} </span>
						</div>
						<div>
							<span>{{ moment(activity.createdAt).fromNow() }}</span>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
	name: 'task-activity',
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
			isShowActivity: true
		};
	},
	created() {
		this.loggedInUser = this.$store.getters.currLoggedUser;
	},
	methods: {
		toggleActivity() {
			this.isShowActivity = !this.isShowActivity;
		}
	}
};
</script>
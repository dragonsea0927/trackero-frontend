<template>
	<div class="members-list-modal pop-over is-shown details-popup">
		<div class="no-back">
			<div class="pop-over-header">
				<span class="pop-over-header-title">Members</span>
				<a class="pop-over-header-close-btn icon-sm icon-close" @click="closeList"></a>
			</div>
			<div class="pop-over-content">
				<div>
					<div class="pop-over-section">
						<input class="search-members" type="text" placeholder="Search members" v-model="filterBy.name" />
						<div class="board-members">
							<ul v-if="membersToDisplay.length" class="pop-over-member-list">
								<h4>Board members</h4>
								<li class="member-item" v-for="member in membersToDisplay" :key="member._id">
									<a @click="toggleMember(member)" class="name">
										<span class="member">
											<avatar
												:src="member.imgUrl"
												:size="32"
												:username="member.fullname"
												:title="`${member.fullname}(${member.username})`"
											/>
										</span>
										<span class="full-name" :title="member.fullname">
											{{ member.fullname }}
											<span class="username">({{ member.username }})</span>
										</span>
										<span :class="isMember(member._id)" class="checked-icon icon-sm"></span>
									</a>
								</li>
							</ul>
							<span v-else class="empty empty-error"
								>Looks like that person isn't a member yet. Enter their email address to add them to the card and board.</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
	name: 'members-list',
	props: ['info'],
	components: {
		Avatar
	},
	data() {
		return {
			filterBy: {
				name: ''
			}
		}
	},
	methods: {
		toggleMember(user) {
			const memberIdx = this.info.task.members.findIndex(member => member._id === user._id)
			if (memberIdx !== -1) {
				this.$emit('removeMember', user)
			} else {
				this.$emit('addMember', user)
			}
		},
		isMember(id) {
			const memberIdx = this.info.task.members.findIndex(member => member._id === id)
			if (memberIdx !== -1) return 'icon-check'
			else return ''
		},
		closeList() {
			this.$emit('closeList')
		}
	},
	computed: {
		membersToDisplay() {
			const { name } = this.filterBy
			const regex = new RegExp(name, 'i')
			const members = this.$store.getters.boardMembers
			var filteredMembers = members.filter(member => regex.test(member.fullname))
			return filteredMembers
		}
	}
}
</script>

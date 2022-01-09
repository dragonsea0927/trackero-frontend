<template>
	<div v-if="members.length" class="task-detail-item clearfix here">
		<h3 class="task-detail-item-header">Members</h3>
		<div v-if="members && members.length" class="task-detail-members-list">
			<a class="member task-detail-member" v-for="member in members" :key="member._id" @click="toggleMiniProfile($event, member)">
				<avatar :src="member.imgUrl" :size="32" :username="member.fullname" :title="`${member.fullname}(${member.username})`" />
			</a>
			<a @click="toggleListCmp($event, 'members-list')" class="task-detail-add-button">
				<span class="add-btn-icon icon-lg">
					<img src="@/assets/img/plus-icon.svg" />
				</span>
			</a>
		</div>
		<mini-profile
			v-if="profileOfUser"
			:isMiniProfileOpen="isMiniProfileOpen"
			:modalPos="modalPos"
			:user="profileOfUser"
			@closeMiniProfile="closeMiniProfile"
			@removeTaskMember="removeTaskMember"
		/>
	</div>
</template>

<script>
import Avatar from 'vue-avatar'
import miniProfile from '@/cmps/user-mini-profile'
import { eventBusService } from '@/services/event-bus-service.js'

export default {
	name: 'task-member-list',
	components: {
		Avatar,
		miniProfile
	},
	props: {
		members: Array,
		required: true
	},
	data() {
		return {
			profileOfUser: null,
			isMiniProfileOpen: false,
			modalPos: {}
		}
	},
	created() {
		eventBusService.$on('closeMiniProfile', () => this.closeMiniProfile())
	},
	methods: {
		toggleMiniProfile(ev, user) {
			if (this.isMiniProfileOpen && user._id === this.profileOfUser._id) {
				this.closeMiniProfile()
				return
			}
			eventBusService.$emit('closeList')
			this.isMiniProfileOpen = true
			const { left, top } = ev.target.offsetParent.getBoundingClientRect()
			this.modalPos.left = Math.ceil(left)
			this.modalPos.top = Math.ceil(top)
			this.profileOfUser = user
		},
		closeMiniProfile() {
			this.isMiniProfileOpen = false
			this.profileOfUser = null
		},
		removeTaskMember(user) {
			this.$emit('removeTaskMember', user)
		},
		toggleListCmp(ev, cmpName) {
			this.$emit('toggleListCmp', ev, cmpName)
		}
	}
}
</script>

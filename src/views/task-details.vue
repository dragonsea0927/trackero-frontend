<template>
	<div class="window-overlay" @click.prevent.self="closeDetails">
		<div class="window">
			<div class="window-wrapper">
				<div class="task-detail clearfix">
					<taskCover :task="task" @toggleListCmp="toggleListCmp" @closeDetails="closeDetails" />
					<taskTitle :task="task" @changeTaskTitle="changeTaskTitle" />
					<div class="window-main-col no-box-sizing">
						<taskSummary :task="task" @removeTaskMember="removeTaskMember" @toggleListCmp="toggleListCmp" />
						<taskDescription :task="task" @updateTask="updateTask" @addActivity="addActivity" @saveTaskDesc="saveTaskDesc" />
						<attachmentList :task="task" @removeAttachment="removeAttachment" @toggleTaskImg="toggleTaskImg" />
						<template v-if="task.checklists.length">
							<template v-for="checklist in task.checklists">
								<checkList :key="checklist.id" @updateTask="updateTask" @addTodo="addTodo" :task="task" :checklist="checklist" />
							</template>
						</template>
						<taskComment
							:task="task"
							@updateTask="updateTask"
							@addActivity="addActivity"
							@saveComment="saveComment"
							@removeComment="removeComment"
						/>
						<taskActivity :task="task" />
					</div>
					<taskSidebar :task="task" @joinTask="joinTask" @toggleListCmp="toggleListCmp" @toggleArhive="toggleArhive" />
				</div>
			</div>
		</div>
		<task-opts-list
			v-if="isListOpen"
			:info="info"
			:style="{
				top: info.modalPos.posY + 'px',
				left: info.modalPos.posX + 'px'
			}"
			ref="optsList"
			@removeMember="removeTaskMember"
			@addMember="addTaskMember"
			@removeLabel="removeTaskLabel"
			@addLabel="addTaskLabel"
			@closeList="closeList"
			@addCheckList="addCheckList"
			@changeTaskCover="toggleTaskCover"
			@removeTaskCover="toggleTaskCover"
		/>
	</div>
</template>

<script>
import { eventBusService } from '@/services/event-bus-service.js'
import Avatar from 'vue-avatar'
import taskOptsList from '@/cmps/task-opts-list'
import checkList from '@/cmps/checklist-list'
import taskDescription from '@/cmps/task-details/description'
import taskComment from '@/cmps/task-details/comment'
import taskActivity from '@/cmps/task-details/activity'
import taskSidebar from '@/cmps/task-details/sidebar'
import taskCover from '@/cmps/task-details/cover'
import taskTitle from '@/cmps/task-details/title'
import taskSummary from '@/cmps/task-details/summary'
import attachmentList from '@/cmps/task-details/attachment-list'

export default {
	name: 'task-details',
	components: {
		Avatar,
		taskOptsList,
		checkList,
		taskDescription,
		taskComment,
		taskActivity,
		taskSidebar,
		taskCover,
		taskTitle,
		taskSummary,
		attachmentList
	},
	data() {
		return {
			task: null,
			loggedInUser: null,
			isListOpen: false,
			info: {
				type: null,
				task: this.task,
				groupId: null,
				modalPos: {
					posX: null,
					posY: null
				}
			}
		}
	},
	created() {
		const { taskId } = this.$route.params
		const { groupId } = this.$route.params
		this.getTask(taskId)
		this.info.groupId = groupId
		this.info.task = this.task
		this.loggedInUser = this.$store.getters.currLoggedUser
		eventBusService.$on('closeList', () => this.closeList())
	},
	methods: {
		updateTask() {
			const { groupId } = this.$route.params
			this.$store.dispatch({ type: 'updateTask', groupId, task: this.task })
		},
		closeDetails() {
			const { boardId } = this.$route.params
			const url = `/board/${boardId}`
			this.$router.push(url)
		},
		closeList() {
			this.isListOpen = false
			this.info.type = null
		},
		addActivity(txt) {
			const activity = {
				txt,
				byMember: this.loggedInUser,
				createdAt: Date.now()
			}
			this.task.activities.unshift(activity)
		},
		toggleListCmp(ev, cmpName) {
			if (cmpName === this.info.type) {
				this.closeList()
				return
			} else {
				this.$nextTick(() => {
					this.isListOpen = true
					eventBusService.$emit('closeMiniProfile')
					this.$nextTick(() => {
						const { width, height } = this.$refs.optsList.$el.getBoundingClientRect()
						const popOverPos = this.getPopoverPos(ev.pageX, ev.pageY, width, height)
						this.info.modalPos = popOverPos
					})
					this.info.type = cmpName
				})
			}
		},
		getPopoverPos(pageX, pageY, width, height) {
			let posX = pageX - 200
			let posY = window.innerHeight - pageY > 200 ? pageY + 20 : pageY - 200
			posX = posX + width > window.innerWidth ? window.innerWidth - width - 15 : posX
			posY = posY + height > window.innerHeight ? window.innerHeight - height - 20 : posY
			if (posX < 0) posX = 15
			return { posY, posX }
		},
		getTask(taskId) {
			const currBoard = this.$store.getters.currBoard
			currBoard.groups.forEach(group =>
				group.tasks.find(task => {
					if (task.id === taskId) this.task = task
				})
			)
		},
		joinTask() {
			const user = this.loggedInUser
			const memberIdx = this.task.members.findIndex(member => member._id === user._id)
			if (memberIdx !== -1) return
			if (user) this.task.members.push(user)
			this.addActivity(`joined this task`)
			this.updateTask()
		},
		addTaskMember(user) {
			const memberIdx = this.task.members.findIndex(member => member._id === user._id)
			if (memberIdx !== -1) return
			if (user) this.task.members.push(user)
			this.addActivity(`added ${user.fullname} to this task`)
			this.updateTask()
		},
		removeTaskMember(user) {
			const memberIdx = this.task.members.findIndex(member => member._id === user._id)
			if (memberIdx === -1) return
			if (user) this.task.members.splice(memberIdx, 1)
			this.addActivity(`removed ${user.fullname} from this task`)
			this.updateTask()
		},
		addTaskLabel(label) {
			const labelIdx = this.task.labels.findIndex(currLabel => currLabel.id === label.id)
			if (labelIdx !== -1) return
			if (label) this.task.labels.push(label)
			this.addActivity(`Labeled this task as ${label.title}`)
			this.updateTask()
		},
		removeTaskLabel(label) {
			const labelIdx = this.task.labels.findIndex(currLabel => currLabel.id === label.id)
			if (labelIdx === -1) return
			if (label) this.task.labels.splice(labelIdx, 1)
			this.addActivity(`Removed label ${label.title} from this task`)
			this.updateTask()
		},
		removeAttachment(attachment) {
			const attachmentIdx = this.task.attachments.findIndex(currAttach => currAttach.id === attachment.id)
			if (attachmentIdx !== -1) {
				if (attachment) this.task.attachments.splice(attachmentIdx, 1)
				this.task.style.url = ''
				this.addActivity(`Removed attachment ${attachment.title}`)
				this.updateTask()
			} else {
				return
			}
		},
		toggleTaskCover(color) {
			if (this.task.style.bgColor === color) return
			if (color !== '#ffffff') {
				this.task.style.bgColor = color
				this.addActivity(`Changed this task cover`)
			} else {
				this.task.style.bgColor = '#ffffff'
				this.task.style.url = ''
				this.addActivity(`Removed this task cover`)
			}
			this.updateTask()
		},
		toggleTaskImg(ev, url = '') {
			if (url) this.task.style.url = url
			else this.task.style.url = ''
			this.updateTask()
		},
		changeTaskTitle(title) {
			this.task.title = title
			this.addActivity(`Changed this task title`)
			this.updateTask()
		},
		saveTaskDesc(desc) {
			this.task.description = desc
			this.addActivity(`Updated the description`)
			this.updateTask()
		},
		async saveComment(commentTxt) {
			try {
				var newComment = await this.$store.dispatch({ type: 'getEmptyComment' })
				newComment.txt = commentTxt
				newComment.byMember.fullname = this.loggedInUser.fullname
				this.task.comments.push(newComment)
				this.updateTask()
			} catch (err) {
				console.log(err)
			}
		},
		removeComment(comment) {
			const commentIdx = this.task.comments.findIndex(currComment => currComment.id === comment.id)
			if (commentIdx === -1) return
			this.task.comments.splice(commentIdx, 1)
			this.addActivity(`Removed comment '${comment.txt}'`)
			this.updateTask()
		},
		async addTodo(todo, checklistId) {
			try {
				var newTodo = await this.$store.dispatch({ type: 'getEmptyTodo' })
				newTodo.text = todo.text
				const checklist = this.task.checklists.find(currChecklist => currChecklist.id === checklistId)
				checklist.todos.push(newTodo)
				this.updateTask()
			} catch (err) {
				console.log(err)
			}
		},
		async addCheckList(title) {
			try {
				var newCheckList = await this.$store.dispatch({ type: 'getEmptyChecklist' })
				newCheckList.title = title
				this.addActivity(`Added new '${title}' checklist to this task`)
				this.task.checklists.push(newCheckList)
				this.updateTask()
			} catch (err) {
				console.log(err)
			}
		},
		toggleArhive(task) {
			task.isArchived = !task.isArchived
			if (!task.isArchived) this.addActivity(`Restored this task from archive`)
			else this.addActivity(`Archived this task`)
			this.updateTask()
		},
		removeTask(task) {
			this.$store.dispatch({ type: 'removeTask', groupId: this.info.groupId, task })
			this.closeDetails()
		}
	}
}
</script>

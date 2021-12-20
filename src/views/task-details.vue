<template>
	<div class="window-overlay" @click.prevent.self="closeDetails">
		<div class="window">
			<div class="window-wrapper">
				<a @click="closeDetails" class="dialog-close-button" :class="[taskCover ? 'dark' : '']">
					<span class="icon-close icon-sm"></span>
				</a>
				<div class="task-detail clearfix">
					<div v-if="taskCover" :class="{ img: task.style.url }" class="task-cover" :style="taskCover">
						<div class="task-cover-menu">
							<a @click="toggleListCmp($event, 'cover-menu')" class="task-cover-menu-button">
								<span class="icon-sm cover-menu-btn-icon"></span>
								Cover
							</a>
						</div>
					</div>
					<div v-if="taskIsArchived" class="card-is-archived">
						<span class="icon-lg archive-icon"></span>
						<span class="sidebar-action-text">This card is archived</span>
					</div>
					<div class="window-header">
						<span class="window-header-icon icon-lg"></span>
						<div class="window-title">
							<textarea-autosize v-model="newTitle" @blur.native="changeTaskTitle" class="task-detail-title-input" rows="1" />
						</div>
						<div class="window-header-inline-content">
							<p class="u-bottom">
								in list <a href="#">{{ groupTitle }}</a>
							</p>
						</div>
					</div>
					<div class="window-main-col no-box-sizing">
						<div class="task-detail-data clearfix">
							<div class="task-detail-item hide">
								<h3 class="task-detail-item-header">List</h3>
								<div class="task-detail-list-badge">
									<button class="task-detail-list-badge-btn badge-button button-link"></button>
								</div>
							</div>
							<div v-if="task.members.length" class="task-detail-item clearfix">
								<h3 class="task-detail-item-header">Members</h3>
								<div v-if="task.members && task.members.length" class="task-detail-members-list">
									<a
										class="member task-detail-member"
										v-for="member in task.members"
										:key="member._id"
										@click="toggleMiniProfile($event, member)"
									>
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
							<div v-if="task.labels.length" class="task-detail-item clearfix">
								<h3 class="task-detail-item-header">Labels</h3>
								<div v-if="task.labels && task.labels.length" class="task-detail-labels-list">
									<span v-for="label in task.labels" :key="label.id" class="card-label task-detail-label" :class="'label-' + label.color">
										<span class="label-text">{{ label.title }}</span>
									</span>
									<a class="task-detail-add-button">
										<span @click="toggleListCmp($event, 'labels-list')" class="add-btn-icon icon-lg">
											<img src="@/assets/img/plus-icon.svg" />
										</span>
									</a>
								</div>
							</div>
							<!-- <div
                        class="task-detail-item"
                        v-if="task.startDate.date && !task.dueDate.date"
                     >
                        <h3 class="task-detail-item-header">Start date</h3>
                        <div class="start-date-badge">
                           <div class="content-container">
                              <button class="dates-btn">
                                 <span>{{
                                    task.startDate.date.slice(0, 6)
                                 }}</span>
                                 <span class="icon-container">
                                    <span class="open-dates-icon">
                                       <svg
                                          width="24"
                                          height="24"
                                          role="presentation"
                                          focusable="false"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                       >
                                          <path
                                             d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                                             fill="currentColor"
                                          ></path>
                                       </svg>
                                    </span>
                                 </span>
                              </button>
                           </div>
                        </div>
                     </div> -->
							<div class="task-detail-item" v-if="task.startDate.date || task.dueDate.date">
								<h3 v-if="task.startDate.date && task.dueDate.date" class="task-detail-item-header">Dates</h3>

								<h3 v-if="task.dueDate.date && !task.startDate.date" class="task-detail-item-header">Due date</h3>
								<h3 v-if="task.startDate.date && !task.dueDate.date" class="task-detail-item-header">Start date</h3>
								<div class="task-detail-dates-badge">
									<a class="complete-box" href="#" role="button">
										<span class="complete-icon">
											<!-- <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg> -->
										</span>
									</a>
									<div class="content-container">
										<button class="dates-btn">
											<span>{{ dateToShow }}</span>
											<span class="icon-container">
												<span class="open-dates-icon">
													<svg
														width="24"
														height="24"
														role="presentation"
														focusable="false"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
															fill="currentColor"
														></path>
													</svg>
												</span>
											</span>
										</button>
									</div>
								</div>
							</div>
							<div class="task-detail-item hide">
								<h3 class="task-detail-item-header">Votes</h3>
								<a class="task-detail-badge"></a>
							</div>
							<div class="task-detail-item hide">
								<h3 class="task-detail-item-header">Last updated</h3>
								<div class="task-detail-badge task-detail-last-updated"></div>
							</div>
						</div>
						<div class="task-detail-desc">
							<div class="window-module">
								<div class="window-module-title">
									<span class="description-icon icon-lg"></span>
									<h3>Description</h3>
									<div v-show="!isEditing" class="editable">
										<a @click="toggleEdit" href="#" class="nch-button edit-btn">Edit</a>
									</div>
								</div>
								<div class="add-desc-area">
									<div class="desc">
										<div class="desc-content">
											<p @click="toggleEdit" v-show="taskDesc && !isEditing">
												{{ task.description }}
											</p>
											<p class="u-bottom">
												<a @click="toggleEdit" v-show="!taskDesc && !isEditing" class="description-fake-text-area no-box-sizing" href="#">
													Add a more detailed description…
												</a>
											</p>
										</div>
										<div v-show="isEditing" class="edit-container">
											<textarea-autosize ref="descinput" class="edit-input" v-model="taskDesc" type="textarea"> </textarea-autosize>
											<div class="action-btns">
												<button @click="saveTaskDesc" class="nch-button save-btn">Save</button>
												<a @click="toggleEdit" class="cancel-btn icon-lg"> </a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="task.attachments.length" class="task-detail-attachments">
							<div class="window-module">
								<div class="window-module-title">
									<span class="attachments-icon icon-lg"></span>
									<h3>Attachments</h3>
								</div>
								<div class="attachments-area clearfix">
									<div class="attachment-list">
										<template v-for="attachment in task.attachments">
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
																<span
																	@click="removeAttachment(attachment)"
																	class="attachment-thumbnail-details-options-item-text delete-btn"
																>
																	Delete
																</span>
															</a>
														</span>
													</span>
													<span class="attachment-thumbnail-details-options">
														<span class="icon-sm icon-card-cover"></span>
														<span
															v-show="task.style.url !== attachment.url"
															@click="toggleTaskImg($event, attachment.url)"
															class="attachment-thumbnail-details-options-item-text"
															>Make cover</span
														>
														<span
															@click="toggleTaskImg($event)"
															v-show="task.style.url === attachment.url"
															class="attachment-thumbnail-details-options-item-text"
															>Remove cover</span
														>
													</span>
												</p>
											</div>
										</template>
									</div>
								</div>
							</div>
						</div>
						<template v-if="checkLists">
							<template v-for="checklist in task.checklists">
								<checkListPreview :key="checklist.id" @updateTask="updateTask" @addTodo="addTodo" :task="task" :checklist="checklist" />
							</template>
						</template>
						<div class="new-comment-section">
							<div class="member">
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
											<avatar
												:src="loggedInUser.imgUrl"
												:size="30"
												:username="comment.byMember.fullname"
												:title="`${comment.byMember.fullname}`"
											/>
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
						<div class="task-detail-activity window-module">
							<div class="window-module-title">
								<span class="activity-icon icon-lg"></span>
								<h3>Activity</h3>
								<div class="window-module-title-options">
									<a v-if="!isShowActivity" @click="toggleActivity" class="show-details-btn" href="#">Show details</a>
									<a v-else @click="toggleActivity" class="hide-details-btn" href="#">Hide details</a>
								</div>
							</div>
							<div v-show="isShowActivity">
								<template v-for="(activity,idx) in task.activities">
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
					</div>
					<div class="window-sidebar no-box-sizing">
						<task-opts-list
							v-if="isListOpen"
							:info="info"
							:style="{
								top: info.modalPos.posY + 'px',
								left: info.modalPos.posX + 'px'
							}"
							@removeMember="removeTaskMember"
							@addMember="addTaskMember"
							@removeLabel="removeTaskLabel"
							@addLabel="addTaskLabel"
							@closeList="closeList"
							@addCheckList="addCheckList"
							@changeTaskCover="toggleTaskCover"
							@removeTaskCover="toggleTaskCover"
						/>
						<div v-if="!showSuggested" class="window-module suggested-actions-module">
							<div class="suggested-actions-settings">
								<span class="settings-icon icon-sm"></span>
							</div>
							<h3>Suggested</h3>
							<div class="clearfix">
								<a @click="joinTask" class="button-link" title="Join" href="#">
									<span class="icon-sm icon-member"></span>
									<span class="sidebar-action-text">Join</span>
								</a>
							</div>
						</div>
						<div class="window-module clearfix">
							<h3>Add to card</h3>
							<div class="u-clearfix">
								<a @click="toggleListCmp($event, 'members-list')" class="button-link" title="Members">
									<span class="icon-sm icon-member"></span>
									<span class="sidebar-action-text">Members</span>
								</a>
								<a @click="toggleListCmp($event, 'labels-list')" class="button-link" title="Labels">
									<span class="icon-sm icon-label"></span>
									<span class="sidebar-action-text">Labels</span>
								</a>
								<a @click="toggleListCmp($event, 'check-list')" class="button-link" title="Checklist">
									<span class="icon-sm icon-checklist"></span>
									<span class="sidebar-action-text">Checklist</span>
								</a>
								<a @click="toggleListCmp($event, 'date-picker')" class="button-link" title="Dates">
									<span class="badge-icon icon-sm icon-clock badge-due-icon is-due-soon-span"></span>
									<span class="sidebar-action-text">Dates</span>
								</a>
								<a @click="toggleListCmp($event, 'attachment-list')" class="button-link" title="Attachment">
									<span class="icon-sm icon-attachment"></span>
									<span class="sidebar-action-text">Attachment</span>
								</a>
								<!-- <a class="button-link" title="Location">
									<span class="icon-sm icon-location"></span>
									<span class="sidebar-action-text">Location</span>
								</a> -->
								<a @click="toggleListCmp($event, 'cover-menu')" v-if="!taskCover" class="button-link" href="#" title="Cover">
									<span class="icon-sm icon-cover"></span>
									<span class="sidebar-action-text">Cover</span>
								</a>
								<!-- <a class="button-link" href="#" title="Custom Fields">
                        <span class="icon-sm">

                        </span>
                        <span class="sidebar-action-text">Custom Fields</span>
                     </a> -->
							</div>
						</div>

						<!-- UnDone features -->
						<!-- <div class="powerups-buttons">
                  <div class="window-module clearfix">
                     <h3 class="no-top-margin">Power-Ups</h3>
                     <div>
                        <a class="button-link add-button-link" href="#" title="Add Power-Ups">
                            <span class="add-task-plus-icon icon-sm">
                              <img src="@/assets/img/plus-icon.svg" />
                           </span>
                           Add Power-Ups
                        </a>
                     </div>
                  </div>
               </div> -->
						<!-- <div class="automation-buttons">
                   <div class="window-module">
                      <div class="automation-title">
                        <h3 class="no-top-margin">Automation</h3>
                        <a class="button-link" href="#" role="button">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 50 50" width="16px" height="16px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"/></svg>
                        </a>
                      </div>
                     <div>
                        <a class="button-link add-button-link" href="#" title="Add button">
                           <span class="add-task-plus-icon icon-sm">
                              <img src="@/assets/img/plus-icon.svg" />
                           </span>
                           Add button
                        </a>
                     </div>
                  </div>
               </div> -->
						<div class="window-module clearfix action-buttons">
							<h3 class="no-top-margin">Actions</h3>
							<div class="clearfix u-clearfix">
								<!-- <a class="button-link" title="Move" href="#">
                           <span class="icon-sm move-icon"></span>
                           <span class="sidebar-action-text">Move</span>
                        </a>
                        <a class="button-link" title="Copy" href="#">
                           <span class="icon-sm copy-icon"></span>
                           <span class="sidebar-action-text">Copy</span>
                        </a> -->
								<!-- <a class="button-link" title="Make template" href="#">
                           <span class="icon-sm">
                           </span>
                           <span class="sidebar-action-text">Make template</span>
                        </a> -->
								<a class="button-link" title="Watch the card to get notifications when something changes." href="#">
									<span class="icon-sm watch-icon"></span>
									<span class="sidebar-action-text">Watch</span>
								</a>
								<!-- <hr /> -->
								<a v-if="!taskIsArchived" @click="archiveTask(task)" class="button-link" title="Archive">
									<span class="icon-sm archive-icon"></span>
									<span class="sidebar-action-text">Archive</span>
								</a>
								<a v-if="taskIsArchived" @click="restoreTask(task)" class="button-link" title="Send to board">
									<span class="icon-sm restore-icon"></span>
									<span class="sidebar-action-text">Send to board</span>
								</a>
								<a v-if="taskIsArchived" @click="removeTask(task)" class="button-link card-delete-btn" title="Delete">
									<span class="icon-sm remove-icon"></span>
									<span class="sidebar-action-text">Delete</span>
								</a>

								<a class="button-link" title="Share" href="#">
									<span class="icon-sm share-icon"></span>
									<span @click="shareViaWebShare" class="sidebar-action-text">Share</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Avatar from 'vue-avatar';
import miniProfile from '@/cmps/user-mini-profile';
import taskOptsList from '@/cmps/task-opts-list';
import checkListPreview from '@/cmps/checklist-preview';

export default {
	name: 'task-details',
	components: {
		Avatar,
		miniProfile,
		taskOptsList,
		checkListPreview
	},
	data() {
		return {
			task: null,
			groupTitle: '',
			newTitle: '',
			newCommentTxt: '',
			loggedInUser: null,
			profileOfUser: null,
			isMiniProfileOpen: false,
			modalPos: {},
			isListOpen: false,
			isEditing: false,
			isCommenting: false,
			taskDesc: '',
			isShowActivity: true,
			info: {
				type: null,
				task: this.task,
				groupId: null,
				modalPos: {
					posX: null,
					posY: null
				}
			}
		};
	},
	created() {
		const { taskId } = this.$route.params;
		const { groupId } = this.$route.params;
		this.getTask(taskId);
		this.info.groupId = groupId;
		this.info.task = this.task;
		this.newTitle = this.task.title;
		this.taskDesc = this.task.description;
		this.loggedInUser = this.$store.getters.currLoggedUser;
	},
	methods: {
		shareViaWebShare() {
			navigator.share({
				title: this.task.title,
				text: 'Check out my board!',
				url: this.$route.path
			});
		},
		closeDetails() {
			const { boardId } = this.$route.params;
			const url = `/board/${boardId}`;
			this.$router.push(url);
			// this.$router.go(-1);
		},
		toggleMiniProfile(ev, user) {
			if (this.isMiniProfileOpen && user._id === this.profileOfUser._id) {
				this.closeMiniProfile();
				return;
			}
			this.isMiniProfileOpen = true;
			if (this.isListOpen) this.closeList();
			const { left, top } = ev.target.offsetParent.getBoundingClientRect();
			this.modalPos.left = Math.ceil(left);
			this.modalPos.top = Math.ceil(top);
			this.profileOfUser = user;
		},
		closeMiniProfile() {
			this.isMiniProfileOpen = false;
			this.profileOfUser = null;
		},
		toggleListCmp(ev, cmpName) {
			if (cmpName === this.info.type) {
				this.closeList();
				return;
			} else {
				this.$nextTick(() => {
					this.isListOpen = true;
					if (this.isMiniProfileOpen) this.closeMiniProfile();
					this.info.modalPos.posY = ev.pageY + 20; // top
					this.info.modalPos.posX = ev.pageX - 15; // left
					this.info.type = cmpName;
				});
			}
		},
		closeList() {
			this.isListOpen = false;
			this.info.type = null;
		},
		toggleActivity() {
			this.isShowActivity = !this.isShowActivity;
		},
		getTask(taskId) {
			const currBoard = this.$store.getters.currBoard;
			currBoard.groups.forEach(group =>
				group.tasks.find(task => {
					if (task.id === taskId) {
						this.task = task;
						this.groupTitle = group.title;
					}
				})
			);
		},
		joinTask() {
			const user = this.loggedInUser;
			const memberIdx = this.task.members.findIndex(member => member._id === user._id);
			if (memberIdx !== -1) {
				return;
			} else {
				if (user) this.task.members.push(user);
				this.addActivity(`joined this task`);
				this.updateTask();
			}
		},
		updateTask() {
			const { groupId } = this.$route.params;
			this.$store.dispatch({ type: 'updateTask', groupId, task: this.task });
		},
		addActivity(txt) {
			const activity = {
				txt,
				byMember: this.loggedInUser,
				createdAt: Date.now()
			};
			this.task.activities.unshift(activity);
		},
		addTaskMember(user) {
			const memberIdx = this.task.members.findIndex(member => member._id === user._id);
			if (memberIdx !== -1) {
				return;
			} else {
				if (user) this.task.members.push(user);
				this.addActivity(`added ${user.fullname} to this task`);
				this.updateTask();
			}
		},
		removeTaskMember(user) {
			const memberIdx = this.task.members.findIndex(member => member._id === user._id);
			if (memberIdx !== -1) {
				if (user) this.task.members.splice(memberIdx, 1);
				this.addActivity(`removed ${user.fullname} from this task`);
				this.updateTask();
			} else {
				return;
			}
		},
		addTaskLabel(label) {
			const labelIdx = this.task.labels.findIndex(currLabel => currLabel.id === label.id);
			if (labelIdx !== -1) {
				return;
			} else {
				if (label) this.task.labels.push(label);
				this.addActivity(`Labeled this task as ${label.title}`);
				this.updateTask();
			}
		},
		removeTaskLabel(label) {
			const labelIdx = this.task.labels.findIndex(currLabel => currLabel.id === label.id);
			if (labelIdx !== -1) {
				if (label) this.task.labels.splice(labelIdx, 1);
				this.addActivity(`Removed label ${label.title} from this task`);
				this.updateTask();
			} else {
				return;
			}
		},
		removeAttachment(attachment) {
			const attachmentIdx = this.task.attachments.findIndex(currAttach => currAttach.id === attachment.id);
			if (attachmentIdx !== -1) {
				if (attachment) this.task.attachments.splice(attachmentIdx, 1);
				this.task.style.url = '';
				this.addActivity(`Removed attachment ${attachment.title}`);
				this.updateTask();
			} else {
				return;
			}
		},
		toggleTaskCover(color) {
			if (this.task.style.bgColor === color) return;
			if (color !== '#ffffff') {
				this.task.style.bgColor = color;
				this.addActivity(`Changed this task cover`);
			} else {
				this.task.style.bgColor = '#ffffff';
				this.task.style.url = '';
				this.addActivity(`Removed this task cover`);
			}
			this.updateTask();
		},
		toggleTaskImg(ev, url = '') {
			if (url) this.task.style.url = url;
			else this.task.style.url = '';
			this.updateTask();
		},
		changeTaskTitle(ev) {
			this.task.title = ev.target.value;
			this.addActivity(`Changed this task title`);
			this.updateTask();
		},
		saveTaskDesc() {
			this.isEditing = false;
			this.task.description = this.taskDesc;
			this.addActivity(`Updated the description`);
			this.updateTask();
		},
		toggleEdit() {
			this.isEditing = !this.isEditing;
			this.$nextTick(() => {
				this.$refs.descinput.$el.focus();
			});
		},
		closeList() {
			this.isListOpen = false;
			this.info.type = null;
		},
		toggleActivity() {
			this.isShowActivity = !this.isShowActivity;
		},
		getTask(taskId) {
			const currBoard = this.$store.getters.currBoard;
			currBoard.groups.forEach(group =>
				group.tasks.find(task => {
					if (task.id === taskId) {
						this.task = task;
						this.groupTitle = group.title;
					}
				})
			);
		},
		joinTask() {
			const user = this.loggedInUser;
			const memberIdx = this.task.members.findIndex(member => member._id === user._id);
			if (memberIdx !== -1) {
				return;
			} else {
				if (user) this.task.members.push(user);
				this.addActivity(`joined this task`);
				this.updateTask();
			}
		},
		updateTask() {
			const { groupId } = this.$route.params;
			this.$store.dispatch({ type: 'updateTask', groupId, task: this.task });
		},
		addActivity(txt) {
			const activity = {
				txt,
				byMember: this.loggedInUser,
				createdAt: Date.now()
			};
			this.task.activities.unshift(activity);
		},
		addTaskMember(user) {
			const memberIdx = this.task.members.findIndex(member => member._id === user._id);
			if (memberIdx !== -1) {
				return;
			} else {
				if (user) this.task.members.push(user);
				this.addActivity(`added ${user.fullname} to this task`);
				this.updateTask();
			}
		},
		removeTaskMember(user) {
			const memberIdx = this.task.members.findIndex(member => member._id === user._id);
			if (memberIdx !== -1) {
				if (user) this.task.members.splice(memberIdx, 1);
				this.addActivity(`removed ${user.fullname} from this task`);
				this.updateTask();
			} else {
				return;
			}
		},
		addTaskLabel(label) {
			const labelIdx = this.task.labels.findIndex(currLabel => currLabel.id === label.id);
			if (labelIdx !== -1) {
				return;
			} else {
				if (label) this.task.labels.push(label);
				this.addActivity(`Labeled this task as ${label.title}`);
				this.updateTask();
			}
		},
		removeTaskLabel(label) {
			const labelIdx = this.task.labels.findIndex(currLabel => currLabel.id === label.id);
			if (labelIdx !== -1) {
				if (label) this.task.labels.splice(labelIdx, 1);
				this.addActivity(`Removed label ${label.title} from this task`);
				this.updateTask();
			} else {
				return;
			}
		},
		removeAttachment(attachment) {
			const attachmentIdx = this.task.attachments.findIndex(currAttach => currAttach.id === attachment.id);
			if (attachmentIdx !== -1) {
				if (attachment) this.task.attachments.splice(attachmentIdx, 1);
				this.addActivity(`Removed attachment ${attachment.title}`);
				this.updateTask();
			} else {
				return;
			}
		},
		toggleTaskCover(color) {
			if (color) {
				this.task.style.bgColor = color;
				this.addActivity(`Changed this task cover`);
			} else {
				this.task.style.bgColor = '#ffffff';
				this.task.style.url = '';
				this.addActivity(`Removed this task cover`);
			}
			this.updateTask();
		},
		toggleTaskImg(ev, url = '') {
			if (url) this.task.style.url = url;
			else this.task.style.url = '';
			this.updateTask();
		},
		changeTaskTitle(ev) {
			this.task.title = ev.target.value;
			this.addActivity(`Changed this task title`);
			this.updateTask();
		},
		saveTaskDesc() {
			this.isEditing = false;
			this.task.description = this.taskDesc;
			this.addActivity(`Updated the description`);
			this.updateTask();
		},
		toggleEdit() {
			this.isEditing = !this.isEditing;
			this.$nextTick(() => {
				this.$refs.descinput.$el.focus();
			});
		},
		async saveComment() {
			try {
				if (!this.newCommentTxt.length) {
					this.$refs.commentinput.focus();
					return;
				}
				var newComment = await this.$store.dispatch({ type: 'getEmptyComment' });
				newComment.txt = this.newCommentTxt;
				newComment.byMember.fullname = this.loggedInUser.fullname;
				this.task.comments.push(newComment);
				this.addActivity(`Added new comment '${newComment.txt}'`);
				this.newCommentTxt = '';
				this.updateTask();
			} catch (err) {
				console.log(err);
			}
		},
		removeComment(comment) {
			const commentIdx = this.task.comments.findIndex(currComment => currComment.id === comment.id);
			if (commentIdx !== -1) {
				this.task.comments.splice(commentIdx, 1);
				this.addActivity(`Removed comment '${comment.txt}'`);
				this.updateTask();
			} else {
				return;
			}
		},
		async addTodo(todo, checklistId) {
			try {
				var newTodo = await this.$store.dispatch({ type: 'getEmptyTodo' });
				newTodo.text = todo.text;
				const checklist = this.task.checklists.find(currChecklist => currChecklist.id === checklistId);
				checklist.todos.push(newTodo);
				this.updateTask();
			} catch (err) {
				console.log(err);
			}
		},
		async addCheckList(title) {
			try {
				var newCheckList = await this.$store.dispatch({ type: 'getEmptyChecklist' });
				newCheckList.title = title;
				this.addActivity(`Added new '${title}' checklist to this task`);
				this.task.checklists.push(newCheckList);
				this.updateTask();
			} catch (err) {
				console.log(err);
			}
		},
		async archiveTask(task) {
			try {
				task.isArchived = true;
				this.addActivity(`Archived this task`);
				await this.$store.dispatch({ type: 'updateTask', groupId: this.info.groupId, task });
			} catch (err) {
				console.log(err);
			}
		},
		async restoreTask(task) {
			try {
				task.isArchived = false;
				this.addActivity(`Restored this task from archive`);
				await this.$store.dispatch({ type: 'updateTask', groupId: this.info.groupId, task });
			} catch (err) {
				console.log(err);
			}
		},
		async removeTask(task) {
			try {
				await this.$store.dispatch({ type: 'removeTask', groupId: this.info.groupId, task });
				this.closeDetails();
			} catch (err) {
				console.log(err);
			}
		}
	},
	computed: {
		taskCover() {
			const cover = this.task.style;
			var style = '';
			if (cover.bgColor !== '#ffffff') style += `background-color:${cover.bgColor}; `;
			if (cover.url) style += `background-image: url('${cover.url}');`;
			return style;
		},
		dateToShow() {
			if (this.task.startDate.date && this.task.dueDate.date) {
				const from = this.task.startDate.date.slice(0, 6);
				const to = this.task.dueDate.date.slice(0, 6);
				return `${from} - ${to}`;
			} else if (this.task.startDate) return this.task.startDate.date.slice(0, 6);
			return this.task.dueDate.date.slice(0, 6);
		},
		showSuggested() {
			const loggedInUserId = this.loggedInUser._id;
			var isShowSuggest = false;
			this.task.members.forEach(member => {
				if (member._id === loggedInUserId) {
					isShowSuggest = true;
				}
			});
			return isShowSuggest;
		},
		checkLists() {
			return this.task.checklists.length;
		},
		taskIsArchived() {
			return this.task.isArchived;
		}
	}
};
</script>

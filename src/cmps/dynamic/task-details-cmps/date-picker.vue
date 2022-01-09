<template>
	<div class="dates-list-modal pop-over is-shown details-popup">
		<div class="no-back">
			<div class="pop-over-header">
				<span class="pop-over-header-title">Dates</span>
				<a class="pop-over-header-close-btn icon-sm icon-close" @click="closeList"></a>
			</div>
			<div class="pop-over-content">
				<div class="pop-over-section">
					<vc-date-picker v-model="value" :masks="masks" ref="picker" />
				</div>
				<div class="checkboxes-dates">
					<div class="start-date-checkbox">
						<button @click="isStartShow = true" class="btn-start-date">Start date</button>
						<div v-if="isStartShow" class="start-date-section">
							<!-- <label class="label-start" for="strt-date"
                        >Start date</label
                     > -->
							<div class="start-date-box">
								<input v-model="valueString" type="text" placeholder="MM/DD/YYYY" class="input-start-date" />
							</div>
						</div>
					</div>
					<div class="due-date-checkbox">
						<button @click="isStartShow = false" class="btn-due-date">Due date</button>
						<div v-if="!isStartShow" class="due-date-section">
							<!-- <label class="label-start" for="strt-date">Due date</label> -->
							<div class="start-date-box">
								<input v-model="valueString" type="text" placeholder="MM/DD/YYYY" class="input-start-date" />
							</div>
						</div>
					</div>
					<div class="total-dates">
						<span class="total-dates-text">
							Task dates: <span>{{ totalDates }}</span>
						</span>
					</div>
					<div class="btns-action">
						<button @click="saveDates" class="btn-save">Save</button>
						<button @click="removeDates" class="btn-remove">Remove</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Locale } from 'v-calendar';
const locale = new Locale();
const mask = 'MMM DD YYYY';
export default {
	name: 'datePicker',
	props: ['info'],
	components: {},
	async created() {
		this.firstStartDate = this.info.task.startDate.date || '';
		this.firstdueDate = this.info.task.dueDate.date || '';
		this.groupId = await this.$store.dispatch({ type: 'getGroupIdByTaskId', taskId: this.info.task.id });
	},
	data() {
		return {
			task: this.info.task,
			valueString: this.info.task.dueDate.date || 'MMM DD YYYY',
			// valueString: this.info.task.dueDate.date || "12/14/2021",
			masks: {
				input: mask
			},
			startChecked: false,
			isStartShow: false,
			firstStartDate: null,
			firstdueDate: null,
			groupId: null
		};
	},
	computed: {
		value: {
			get() {
				return this.valueString ? locale.parse(this.valueString, mask) : null;
			},
			set(val) {
				this.valueString = val ? locale.format(val, mask) : '';
			}
		},
		taskStart() {
			return this.task.startDate.date || '';
		},
		taskDue() {
			return this.task.dueDate.date || '';
		},
		// startChecked() {
		//    return this.task.startDate.date || false
		// },
		dueChecked() {
			return this.task.dueDate.date || false;
		},
		valueStringTemp() {
			if (this.isStartShow && this.task.startDate.date) return this.task.startDate.date;
			else if (!this.isStartShow && !this.task.startDate.date) return this.task.dueDate.date;
			else return false;
		},
		totalDates() {
			let str = '';
			str += this.task.startDate.date + ' - ' + this.task.dueDate.date;
			return str;
		}
	},
	methods: {
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
		saveDates() {
			this.closeList();
		},
		async removeDates() {
			try {
				this.task.startDate.date = '';
				this.task.dueDate.date = '';
				this.addActivity(`Removed new dates`);
				await this.$store.dispatch({ type: 'updateTask', groupId: this.groupId, task: this.task });
				this.closeList();
			} catch (err) {
				console.log(err);
			}
		}
	},
	watch: {
		async valueString(val) {
			try {
				if (this.isStartShow) {
					this.task.startDate.date = val;
					this.addActivity(`Added new start date ${val}`);
				} else {
					this.task.dueDate.date = val;
					this.addActivity(`Added new due date ${val}`);
				}
				await this.$store.dispatch({ type: 'updateTask', groupId: this.groupId, task: this.task });
			} catch (err) {
				console.log(err);
			}
		}
	}
};
</script>

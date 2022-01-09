import { utilService } from './util-service.js';
import { socketService } from './socket-service.js';
import { httpService } from './http-service.js';
// Requiring lodash library
const _ = require('lodash');

export const boardService = {
	//BOARD
	query,
	getById,
	remove,
	save,
	getEmptyBoard,
	changeBoardBgc,
	//GROUP
	addGroup,
	removeGroup,
	removeTask,
	saveGroups,
	updateGroup,
	//TASK
	getEmptyTask,
	updateTasks,
	saveTask,
	updateSingleTask,
	getEmptyTodo,
	getEmptyChecklist,
	getEmptyComment,
	//MEMBER
	addMember,
	removeMember
};

// Util Function to make deep copy

function _deep(board) {
	return JSON.parse(JSON.stringify(board));
}

//----------------------------------------------------------- */
//********************BOARD*********************************
//----------------------------------------------------------- */

async function query(filterBy = {}) {
	try {
		const res = await httpService.get('board', { params: filterBy });
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function save(board) {
	try {
		if (board._id) {
			socketService.emit('boardUpdate', board._id);
			const res = await httpService.put('board/' + board._id, board);
			return res;
		} else {
			const res = await httpService.post('board/', board);
			return res;
		}
	} catch (err) {
		console.log(err);
	}
}

async function getById(boardId) {
	try {
		const res = await httpService.get('board/' + boardId);
		return res;
	} catch (err) {
		console.log(err);
	}
}

async function remove(boardId) {
	try {
		const res = await httpService.delete('board/' + boardId);
		return res;
	} catch (err) {
		console.log(err);
	}
}

function getEmptyBoard() {
	const board = {
		title: '',
		createdAt: Date.now(),
		createdBy: '',
		style: {
			bgColor: ''
		},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: 'green'
			},
			{
				id: 'l102',
				title: 'Attention',
				color: 'yellow'
			},
			{
				id: 'l103',
				title: 'Critical',
				color: 'orange'
			},
			{
				id: 'l104',
				title: 'Bug',
				color: 'red'
			},
			{
				id: 'l105',
				title: 'On it',
				color: 'purple'
			},
			{
				id: 'l106',
				title: 'Idea',
				color: 'blue'
			},
			{
				id: 'l107',
				title: 'Urgent',
				color: 'navy'
			}
		],
		members: [],
		groups: [
			{
				id: utilService.makeId(),
				title: 'Start here by creating your first list!',
				tasks: []
			}
		],
		activities: []
	};
	return board;
}

function changeBoardBgc(bgc, board) {
	const currBoard = _deep(board);
	currBoard.style.bgColor = bgc;
	save(currBoard);
}

//----------------------------------------------------------- */
//***********************GROUPS********************************
//----------------------------------------------------------- */

function _getGroupById(groupId, board) {
	const currBoard = _deep(board);
	const currGroup = currBoard.groups.find(group => group.id === groupId);
	return currGroup;
}

function addGroup(group, board) {
	if (!group.id) {
		group.id = utilService.makeId();
		const currBoard = _deep(board);
		currBoard.groups.push(group);
		save(currBoard);
		return group;
	}
}

function removeGroup(id, board) {
	const currBoard = _deep(board);
	let currGroups = currBoard.groups;
	let idx = currGroups.findIndex(group => group.id === id);
	currGroups.splice(idx, 1);
	save(currBoard);
	return idx;
}

function saveGroups(groups, board) {
	const deepBoard = _deep(board);
	deepBoard.groups = groups;
	const savedBoard = save(deepBoard);
	return savedBoard;
}

function updateGroup(updatedGroup, groupId, board) {
	const currBoard = _deep(board);
	const idx = currBoard.groups.findIndex(currGroup => currGroup.id === groupId);
	currBoard.groups.splice(idx, 1, updatedGroup);
	save(currBoard);
	return updatedGroup;
}

//----------------------------------------------------------- */
//***********************TASKS********************************
//----------------------------------------------------------- */

function getEmptyTask(title) {
	const task = {
		id: utilService.makeId(),
		title,
		description: '',
		attachments: [],
		location: {},
		style: {
			bgColor: '#ffffff',
			url: ''
		},
		members: [],
		labels: [],
		byUser: {
			_id: 'u100',
			fullname: 'Guest',
			username: 'guest',
			imgUrl: ''
		},
		startDate: {
			date: '',
			isComplete: false
		},
		dueDate: {
			date: '',
			isComplete: false
		},
		comments: [],
		isArchived: false,
		checklists: [],
		activities: []
	};
	return task;
}

function saveTask(task, groupId, board) {
	const currGroup = _getGroupById(groupId, board);
	currGroup.tasks.push(task);
	updateGroup(currGroup, groupId, board);
}

function updateSingleTask(task, board, groupId) {
	const currGroup = _getGroupById(groupId, board);
	const taskIdx = currGroup.tasks.findIndex(currTask => currTask.id === task.id);
	currGroup.tasks[taskIdx] = task;
	const updatedGroup = updateGroup(currGroup, currGroup.id, board);
	return updatedGroup.tasks[taskIdx];
}

function updateTasks(tasks, group, board) {
	const currGroup = _getGroupById(group.id, board);
	currGroup.tasks = tasks;
	return updateGroup(currGroup, currGroup.id, board);
}

function removeTask(task, groupId, board) {
	let currGroup = _getGroupById(groupId, board);
	let taskIdx = currGroup.tasks.findIndex(currTask => currTask.id === task.id);
	currGroup.tasks.splice(taskIdx, 1);
	updateGroup(currGroup, groupId, board);
	return taskIdx;
}

function getEmptyComment() {
	const comment = {
		txt: '',
		id: utilService.makeId(),
		createdAt: Date.now(),
		byMember: {
			fullname: '',
			_id: ''
		}
	};
	return comment;
}

function getEmptyTodo() {
	const todo = {
		id: utilService.makeId(),
		text: '',
		isDone: false
	};
	return todo;
}

function getEmptyChecklist() {
	const todo = {
		id: utilService.makeId(),
		title: '',
		todos: []
	};
	return todo;
}

//----------------------------------------------------------- */
//***********************MEMBERS********************************
//----------------------------------------------------------- */

function addMember(user, board) {
	const deepBoard = _deep(board);
	const idx = deepBoard.members.findIndex(member => member._id === user._id);
	if (idx !== -1) {
		return;
	} else {
		deepBoard.members.push(user);
		save(deepBoard);
		return user;
	}
}

function removeMember(user, board) {
	const deepBoard = _deep(board);
	const idx = deepBoard.members.findIndex(member => member._id === user._id);
	deepBoard.members.splice(idx, 1);
	save(deepBoard);
}

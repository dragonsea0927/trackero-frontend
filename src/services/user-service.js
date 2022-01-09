import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { httpService } from './http-service.js'
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket-service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// var gWatchedUser = null

// const STORAGE_KEY = 'user'
// const KEY = 'users_db'

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	getUsers,
	getById,
	remove,
	update,
	googleLogin
}

// var gUsers = _createUsers()

// window.loginDiff = login;
// login('guest', 'Best Guest')

async function googleLogin(tokenId, imgUrl) {
	try {
		const res = await httpService.post('auth/googlelogin', { tokenId, imgUrl })
		return _saveLocalUser(res)
	} catch (err) {
		console.log(err)
	}
}

async function login(username, password) {
	try {
		const res = await httpService.post('auth/login', { username, password })
		return _saveLocalUser(res)
	} catch (err) {
		console.log(err)
	}
}
async function signup(username, password, fullname) {
	try {
		const res = await httpService.post('auth/signup', { username, password, fullname })
		return _saveLocalUser(res)
	} catch (err) {
		console.log(err)
	}
}

async function logout() {
	try {
		const res = await httpService.post('auth/logout', null)
		sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, null)
		return res.data
	} catch (err) {
		console.log(err)
	}
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) || login('guest', 'Best Guest')
}

function _saveLocalUser(user) {
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getUsers() {
	// return storageService.query('user')
	return httpService.get(`user`)
}

async function getById(userId) {
	// const user = await storageService.get('user', userId)
	const user = await httpService.get(`user/${userId}`)
	gWatchedUser = user
	return user
}

function remove(userId) {
	// return storageService.remove('user', userId)
	return httpService.delete(`user/${userId}`)
}

async function update(user) {
	// await storageService.put('user', user)
	user = await httpService.put(`user/${user._id}`, user)
	// Handle case in which admin updates other user's details
	if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
	return user
}

;(async () => {
	var user = getLoggedinUser()
	if (user) socketService.emit('set-user-socket', user._id)
})()

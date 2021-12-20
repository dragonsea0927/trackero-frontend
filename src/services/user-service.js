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
   update
}

// var gUsers = _createUsers()

// window.loginDiff = login;
login('guest', 'Best Guest')

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
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) || null
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

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// ;(async () => {
//    var user = getLoggedinUser()
//    // Dev Helper: Listens to when localStorage changes in OTHER browser

//    // Here we are listening to changes for the watched user (comming from other browsers)
//    window.addEventListener('storage', async () => {
//       if (!gWatchedUser) return
//       const freshUsers = await storageService.query('user')
//       const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//       if (!watchedUser) return
//       if (gWatchedUser.score !== watchedUser.score) {
//          console.log('Watched user score changed - localStorage updated from another browser')
//          // socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//       }
//       gWatchedUser = watchedUser
//    })
// })()

;(async () => {
   var user = getLoggedinUser()
   if (user) socketService.emit('set-user-socket', user._id)
})()

//
//
//
//************************ONLY-FRONT-END*********************************** */
// async function query() {
// 	try {
// 		return await storageService.query(KEY);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function getUserById(userId) {
// 	try {
// 		const users = await query();
// 		return users.find(user => user._id === userId);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function save(user) {
// 	try {
// 		const savedUser = user._id ? await _update(user) : await _add(user);
// 		return savedUser;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function _add(user) {
// 	try {
// 		return await storageService.post(KEY, user);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// async function _update(user) {
// 	try {
// 		return await storageService.put(KEY, user);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// function _createUsers() {
// 	var users = JSON.parse(localStorage.getItem(KEY));
// 	if (!users || !users.length) {
// 		users = [
// 			_createUser('u100', 'guest', 'guest', ''),
// 			_createUser('u101', 'baselB', 'Basel Boulos', 'baseluser.png'),
// 			_createUser('u102', 'ArtiomB', 'Artiom Bukati', 'artiomuser.png'),
// 			_createUser('u103', 'NoaN', 'Noa Nissim', 'noauser.png')
// 		];
// 		localStorage.setItem(KEY, JSON.stringify(users));
// 		return users;
// 	}
// }

// function _createUser(id, username, fullname, imgUrl = '') {
// 	const user = {
// 		_id: id,
// 		username,
// 		fullname,
// 		password: '',
// 		imgUrl,
// 		mentions: [
// 			{
// 				id: '',
// 				boardId: '',
// 				taskId: ''
// 			}
// 		],
// 		subscribedTo: [],
// 		starredBoards: []
// 	};
// 	return user;
// }

// function getEmptyUser() {
// 	const user = {
// 		username,
// 		fullname,
// 		password,
// 		imgUrl,
// 		mentions: [],
// 		subscribedTo: [],
// 		starredBoards: []
// 	};
// 	return user;
// }

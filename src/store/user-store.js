import { userService } from '@/services/user-service.js'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const userStore = {
   state: {
      users: [],
      loggedUser: null,
      watchedUser: null
   },
   getters: {
      users(state) {
         return state.users
      },
      currLoggedUser(state) {
         return state.loggedUser
      },
      starredBoards(state) {
         return state.loggedUser.starredBoards
      },
      getIsLoggedUserAdmin(state) {
         return state.loggedUser?.isAdmin || false
      },
      loggedUserName(state) {
         return state.loggedUser.fullname
      },
      loggedUserId(state) {
         return state.loggedUser._id
      },
      watchedUser({ watchedUser }) {
         return watchedUser
      }
   },
   mutations: {
      setUsers(state, { users }) {
         state.users = users
         state.loggedUser = users[0]
      },
      saveUser(state, { userToSave }) {
         const idx = state.users.findIndex(user => user.id === userToSave.id)
         state.users.splice(idx, 1, userToSave)
         state.loggedUser = userToSave // TEMP - NEEDS TO BE CHANGED
      },
      setLoggedUser(state, { user }) {
         state.loggedUser = user ? { ...user } : null
      },
      setWatchedUser(state, { user }) {
         state.watchedUser = user
      },
      setNewUser(state, { user }) {
         state.loggedUser = user
      },
      saveNewUser(state, { user }) {
         state.users.push(user)
      },
      removeUser(state, { userId }) {
         state.users = state.users.filter(user => user._id !== userId)
      }
   },
   actions: {
      //FRONTEND
      // async loadUsers({ state, commit }) {
      //    try {
      //       const users = await userService.query()
      //       commit({ type: 'setUsers', users })
      //    } catch (err) {
      //       console.error(err)
      //    }
      // },
      // async saveUser({ state, commit }, { user }) {
      //    try {
      //       const userToSave = await userService.update(user)
      //       commit({ type: 'saveUser', userToSave })
      //    } catch (err) {
      //       console.log(err)
      //    }
      // },
      //BACKEND
      async setLoggedUser({ commit }, { user }) {
         try {
            commit({ type: 'setLoggedUser', user })
         } catch (err) {
            console.log(err)
         }
      },
      async login({ commit }, { username, password }) {
         try {
            const user = await userService.login(username, password)
            commit({ type: 'setLoggedUser', user })
            return user
         } catch (err) {
            console.log('userStore: Error in login', err)
            throw err
         }
      },
      async signup({ commit }, { username, password, fullname }) {
         try {
            const user = await userService.signup(username, password, fullname)
            commit({ type: 'setLoggedUser', user })
            return user
         } catch (err) {
            console.log('userStore: Error in signup', err)
            throw err
         }
      },
      async logout({ commit }) {
         try {
            await userService.logout()
            commit({ type: 'setLoggedUser', user: null })
         } catch (err) {
            console.log('userStore: Error in logout', err)
            throw err
         }
      },
      async loadUsers({ commit }) {
         // TODO: loading
         try {
            const users = await userService.getUsers()
            const LoggedUser = await userService.getLoggedinUser()
            commit({ type: 'setUsers', users })
            commit({ type: 'setLoggedUser', user: LoggedUser })
            return users
         } catch (err) {
            console.log('userStore: Error in loadUsers', err)
            throw err
         }
      },
      async loadAndWatchUser({ commit }, { userId }) {
         try {
            const user = await userService.getById(userId)
            commit({ type: 'setWatchedUser', user })
            // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
            // socketService.off(SOCKET_EVENT_USER_UPDATED)
            // socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
            // commit({ type: 'setWatchedUser', user })
            // })
         } catch (err) {
            console.log('userStore: Error in loadAndWatchUser', err)
            throw err
         }
      },
      async removeUser({ commit }, { userId }) {
         try {
            await userService.remove(userId)
            commit({ type: 'removeUser', userId })
         } catch (err) {
            console.log('userStore: Error in removeUser', err)
            throw err
         }
      },
      async updateUser({ commit }, { user }) {
         try {
            const userToSave = await userService.update(user)
            commit({ type: 'saveUser', userToSave })
         } catch (err) {
            console.log('userStore: Error in updateUser', err)
            throw err
         }
      }
   }
}

import { boardService } from '@/services/board-service.js'

export const boardStore = {
   state: {
      boards: [],
      currBoardId: null,
      currBoard: null,
      groups: [],
      currGroup: null,
      checked: false
   },
   getters: {
      //----------------------------------------------------------- */
      //************************BOARD*****************************
      //----------------------------------------------------------- */
      boardsForDisplay(state) {
         return state.boards
      },
      currBoardId(state) {
         return state.currBoardId
      },
      currBoard(state) {
         return state.currBoard
      },
      boardGroups(state) {
         return state.currBoard.groups
      },
      getBoardBgc(state) {
         return state.currBoard.style.bgColor
      },
      labels(state) {
         return state.currBoard.labels
      },
      allBoardTasks(state) {
         const tasks = []
         state.currBoard.groups.forEach(group => {
            group.tasks.forEach(task => {
               tasks.push(task)
            })
         })
         return tasks
      },
      //----------------------------------------------------------- */
      //************************MEMBERS*****************************
      //----------------------------------------------------------- */
      boardMembers(state) {
         return state.currBoard.members
      },
      checked(state) {
         return state.checked
      },
      getEmptyGroup() {
         const group = {
            title: '',
            tasks: []
         }
         return group
      }
   },
   mutations: {
      //----------------------------------------------------------- */
      //**************************BOARD*****************************
      //----------------------------------------------------------- */
      setBoards(state, { boards }) {
         state.boards = boards
      },
      addBoard(state, { board }) {
         state.boards.push(board)
      },
      removeBoard(state, { boardId }) {
         state.boards = state.boards.filter(board => board._id !== boardId)
      },
      updateBoard(state, { board }) {
         const idx = state.boards.findIndex(currBoard => currBoard._id === board._id)
         state.boards.splice(idx, 1, board)
      },
      setCurrBoard(state, { currBoard }) {
         state.currBoard = currBoard
         state.groups = currBoard.groups
      },
      setBoardBgc(state, { bgc }) {
         state.currBoard.style.bgColor = bgc
      },
      //----------------------------------------------------------- */
      //********************GROUPS*******************************
      //----------------------------------------------------------- */
      addGroup(state, { group }) {
         state.groups.push(group)
      },
      removeGroup(state, { groupId }) {
         const idx = state.groups.findIndex(group => group.id === groupId)
         state.groups.splice(idx, 1)
      },
      updateGroup(state, { group }) {
         const idx = state.groups.findIndex(currGroup => currGroup.id === group.id)
         state.groups.splice(idx, 1, group)
      },
      //----------------------------------------------------------- */
      //***********************TASKS********************************
      //----------------------------------------------------------- */
      addTask(state, { savedTask, groupId }) {
         const currGroup = state.groups.find(currGroup => currGroup.id === groupId)
         currGroup.tasks.push(savedTask)
      },
      removeTask(state, { groupId, removedTaskIdx }) {
         const currGroup = state.groups.find(currGroup => currGroup.id === groupId)
         currGroup.tasks.splice(removedTaskIdx, 1)
      },
      updateTask(state, { updatedTask, groupId }) {
         const currGroup = state.groups.find(currGroup => currGroup.id === groupId)
         const taskIdx = currGroup.tasks.findIndex(currTask => currTask.id === updatedTask.id)
         currGroup.tasks.splice(taskIdx, 1, updatedTask)
      },
      updateTaskPositions(state, { updatedGroup }) {
         const idx = state.groups.findIndex(group => group.id === updatedGroup.id)
         state.currBoard.groups.splice(idx, 1, updatedGroup)
      },
      //----------------------------------------------------------- */
      //***********************MEMBERS********************************
      //----------------------------------------------------------- */
      addMember(state, { user }) {
         state.currBoard.members.push(user)
      },
      removeMember(state, { user }) {
         const idx = state.currBoard.members.findIndex(member => member._id === user._id)
         state.currBoard.members.splice(idx, 1)
      },
      toggleCheckbox(state, { checked }) {
         state.checked = !state.checked
      }
   },
   actions: {
      //----------------------------------------------------------- */
      //********************BOARD*********************************
      //----------------------------------------------------------- */
      async loadBoards({ state, commit }) {
         try {
            const boards = await boardService.query()
            commit({ type: 'setBoards', boards })
         } catch (err) {
            console.log(err)
         }
      },
      async removeBoard({ commit }, { boardId }) {
         try {
            await boardService.remove(boardId)
            commit({ type: 'removeBoard', boardId })
         } catch (err) {
            console.log(err)
         }
      },
      async updateBoard({ commit }, { board }) {
         try {
            const updatedBoard = await boardService.save(board)
            commit({ type: 'updateBoard', updatedBoard })
            return updatedBoard
         } catch (err) {
            console.log(err)
         }
      },
      async addBoard({ commit }, { board }) {
         try {
            const savedBoard = await boardService.save(board)
            commit({ type: 'addBoard', board: savedBoard })
            return savedBoard
         } catch (err) {
            console.log(err)
         }
      },
      async getBoardbyId({ commit }, { boardId }) {
         try {
            const board = await boardService.getById(boardId)
            commit({ type: 'setCurrBoard', currBoard: board })
            return board
         } catch (err) {
            console.log(err)
         }
      },
      async changeBoardBgc({ state, commit }, { bgc }) {
         try {
            await boardService.changeBoardBgc(bgc, state.currBoard)
            commit({ type: 'setBoardBgc', bgc })
         } catch (err) {
            console.log(err)
         }
      },
      //----------------------------------------------------------- */
      //***********************GROUPS********************************
      //----------------------------------------------------------- */
      async updateGroups({ state, commit }, { groups }) {
         try {
            const board = await boardService.saveGroups(groups, state.currBoard)
            // This function is used for D&D..no need for commit
            // commit({ type: 'setCurrBoard', currBoard: board })
            return board
         } catch (err) {
            console.log(err)
         }
      },
      async addGroup({ state, commit }, { group }) {
         try {
            const newGroup = await boardService.addGroup(group, state.currBoard)
            const idx = state.currBoard.groups.findIndex(currGroup => currGroup.id === newGroup.id)
            if (idx === -1) {
               commit({ type: 'addGroup', group: newGroup })
               return newGroup
            } else {
               console.log('cannot remove')
            }
         } catch (err) {
            console.log(err)
         }
      },
      async removeGroup({ state, commit }, { groupId }) {
         try {
            const idx = await boardService.removeGroup(groupId, state.currBoard)
            if (idx >= 0) {
               commit({ type: 'removeGroup', groupId })
               return idx
            }
         } catch (err) {
            console.log(err)
         }
      },
      async updateGroup({ state, commit }, { group }) {
         try {
            const updatedGroup = await boardService.updateGroup(group, group.id, state.currBoard)
            commit({ type: 'updateGroup', group: updatedGroup })
         } catch (err) {
            console.log(err)
         }
      },
      async getGroupIdByTaskId({ state, commit }, { taskId }) {
         try {
            var groupId = null
            state.currBoard.groups.forEach(group => {
               group.tasks.find(task => {
                  if (task.id === taskId) {
                     groupId = group.id
                  }
               })
            })
            return groupId
         } catch (err) {
            console.log(err)
         }
      },

      //----------------------------------------------------------- */
      //***********************TASKS********************************
      //----------------------------------------------------------- */
      async updateTaskPositions({ state, commit }, { tasks, group }) {
         try {
            const updatedGroup = await boardService.updateTasks(tasks, group, state.currBoard)
            commit({ type: 'updateTaskPositions', updatedGroup })
         } catch (err) {
            console.log(err)
         }
      },
      async addTask({ state, commit }, { groupId, title }) {
         try {
            const newTask = await boardService.getEmptyTask(title)
            await boardService.saveTask(newTask, groupId, state.currBoard)
            commit({ type: 'addTask', savedTask: newTask, groupId })
            return newTask
         } catch (err) {
            console.log(err)
         }
      },
      async updateTask({ state, commit }, { groupId, task }) {
         try {
            const updatedTask = await boardService.updateSingleTask(task, state.currBoard, groupId)
            if (updatedTask) commit({ type: 'updateTask', updatedTask, groupId })
         } catch (err) {
            console.log(err)
         }
      },
      async removeTask({ state, commit }, { groupId, task }) {
         try {
            const removedTaskIdx = await boardService.removeTask(task, groupId, state.currBoard)
            commit({ type: 'removeTask', groupId, removedTaskIdx })
         } catch (err) {
            console.log(err)
         }
      },
      async getEmptyTodo({ state, commit }) {
         try {
            return boardService.getEmptyTodo()
         } catch (err) {
            console.log(err)
         }
      },
      async getEmptyComment({ state, commit }) {
         try {
            return boardService.getEmptyComment()
         } catch (err) {
            console.log(err)
         }
      },
      async getEmptyChecklist({ state, commit }) {
         try {
            return boardService.getEmptyChecklist()
         } catch (err) {
            console.log(err)
         }
      },
      //----------------------------------------------------------- */
      //***********************MEMBERS********************************
      //----------------------------------------------------------- */
      async addMember({ state, commit }, { user }) {
         try {
            const savedMember = await boardService.addMember(user, state.currBoard)
            if (savedMember) commit({ type: 'addMember', user: savedMember })
         } catch (err) {
            console.log(err)
         }
      },
      async removeMember({ state, commit }, { user }) {
         try {
            await boardService.removeMember(user, state.currBoard)
            commit({ type: 'removeMember', user })
         } catch (err) {
            console.log(err)
         }
      }
   }
}

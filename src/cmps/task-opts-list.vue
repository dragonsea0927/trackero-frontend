<template>
   <component
      :is="info.type"
      :info="info"
      @removeMember="removeMember"
      @addMember="addMember"
      @removeLabel="removeLabel"
      @addLabel="addLabel"
      @closeList="closeList"
      @addCheckList="addCheckList"
      @changeTaskCover="changeTaskCover"
      @removeTaskCover="removeTaskCover"
   >
   </component>
</template>

<script>
import membersList from '@/cmps/dynamic/task-details-cmps/members-list'
import labelsList from '@/cmps/dynamic/task-details-cmps/labels-list'
import checkList from '@/cmps/dynamic/task-details-cmps/check-list'
import coverMenu from '@/cmps/dynamic/task-details-cmps/cover-menu'
import attachmentList from '@/cmps/dynamic/task-details-cmps/attachment-list'
import datePicker from '@/cmps/dynamic/task-details-cmps/date-picker'

export default {
   name: "task-opts-list",
   props: ['info'],
   components: {
      membersList,
      labelsList,
      checkList,
      coverMenu,
      attachmentList,
      datePicker
   },
   created() {
   },
   methods: {
      removeMember(user) {
         this.$emit('removeMember', user)
      },
      addMember(user) {
         this.$emit('addMember', user)
      },
      removeLabel(label) {
         this.$emit('removeLabel', label)
      },
      addLabel(label) {
         this.$emit('addLabel', label)
      },
      addCheckList(title) {
         this.$emit('addCheckList', title)
      },
      changeTaskCover(color) {
         this.$emit('changeTaskCover', color)
      },
      removeTaskCover() {
         this.$emit('removeTaskCover','#ffffff')
      },
      closeList() {
         this.$emit('closeList')
      },
   }
}
</script>
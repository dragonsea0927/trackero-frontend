<template>
  <div class="checklist-item">
      <div class="checklist-item-checkbox" @click="toggleTodo(todo)">
          <span v-if="todo.isDone" class="checklist-item-checkbox-check"></span>
      </div>
      <div class="checklist-item-details">
          <div class="checklist-item-row">
              <div class="checklist-item-text-and-controls">
                  <span class="checklist-item-details-text" :class="{completed : todo.isDone}">
                      {{todo.text}}
                  </span>
                  <div class="checklist-item-controls">
                      <a @click="remove(todo.id)" class="icon-lg icon-close"></a>
                      <!-- <button >X</button> -->
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'todo-preview',
    props:['todo'],
    methods:{
        remove(id){
            this.$emit('removeTodo',id)
        },
        toggleTodo(todo){
           todo.isDone = !todo.isDone
           this.$emit('saveTodo',todo)
        }
    }
}
</script>

<template>
<div class="labels-list-modal pop-over is-shown details-popup">
    <div class="no-back">
        <div class="pop-over-header">
            <span class="pop-over-header-title">Labels</span>
            <a class="pop-over-header-close-btn icon-sm icon-close" @click="closeList"></a>
        </div>
        <div class="pop-over-content">
            <input class="search-labels" type="text" placeholder="Search labels" v-model="filterBy.title">
            <div>
                <div class="pop-over-section">
                    <ul v-if="labelsToDisplay.length"  class="pop-over-labels-list">
                        <h4>Labels</h4>
                        <li class="label-item" v-for="label in labelsToDisplay" :key="label.id">
                            <a class="icon-sm icon-edit"></a>
                            <span
                            class="card-label pop-over-label" 
                            @click="toggleLabel(label)"
                            @mouseenter="labelEnter($event)"
                            @mouseleave="labelLeave($event)"
                            :class="'label-' + label.color"
                            >
                                {{label.title}}
                                <span :class="isLabel(label.id)" class="checked-icon icon-sm"></span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:"labels-list",
    props:['info'],
    data(){
        return{
          filterBy:{
                title:''
            },
        }
    },
    methods: {
        labelEnter(ev){
            ev.target.classList.add('label-hover')
        },
        labelLeave(ev){
            ev.target.classList.remove('label-hover')
        },
        toggleLabel(label){
            const labelIdx = this.info.task.labels.findIndex(currLabel => currLabel.id === label.id)
            if (labelIdx !== -1) {
                this.$emit('removeLabel',label)
            } else {
                this.$emit('addLabel',label)
            }
        },
        isLabel(id){
            const labelIdx = this.info.task.labels.findIndex(label => label.id === id)
            if (labelIdx !== -1) return 'icon-check'
            else return ''
        },
        closeList(){
            this.$emit('closeList')
        },
    },
    computed:{
        labelsToDisplay(){
            const {title} = this.filterBy
            const regex = new RegExp(title, 'i')
            const labels = this.$store.getters.labels
            var filteredLabels = labels.filter((label) => regex.test(label.title))
            return filteredLabels
        }
    }
}
</script>
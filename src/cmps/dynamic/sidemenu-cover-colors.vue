<template>
	<div>
		<template v-for="(color, idx) in colors">
			<div class="board-backgrounds-section-tile board-backgrounds-section-tile-large" :key="idx">
				<div class="image" @click="selectColor(idx)" :style="{ backgroundColor: color }"></div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'openColors',
	props: {
		board: Object,
		required: true,
		info: Object
	},
	data() {
		return {
			colors: {
				blue: '#5BA4CF',
				orange: '#FFAF3F',
				green: '#7BC86C',
				red: '#EF7564',
				purple: '#CD8DE5',
				pink: '#FF8ED4',
				lightgreen: '#4bbf6b',
				cyan: '#29CCE5',
				yellow: '#F5DD29',
				navy: '#172B4D'
			}
		};
	},
	methods: {
		selectColor(color) {
			if (!this.info) this.$store.dispatch('changeBoardBgc', { bgc: this.colors[color] });
			else this.$emit('changeTaskCover', this.colors[color]);
		}
	}
};
</script>

<template>
	<section :style="{ left: modalCmp.posX + 'px' }" class="header-modal">
		<header class="header-modal-header">
			<div class="header-modal-title" :title="modalCmp.type"><!-- {{ modalCmp.type }} -->Menu</div>
			<button @click="modalToggle" class="header-close-modal-btn">
				<span class="header-close-modal-btn-icon">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
							fill="currentColor"
						></path>
					</svg>
				</span>
			</button>
		</header>
		<div class="header-modal-body mobile-nav" :style="{ padding: 0, 'padding-bottom': 12 + 'px' }">
			<div class="nav-main-links mobile-nav">
				<a
					@click.self.stop="modalOpen"
					data-cmp="Workspaces"
					class="nav-link-btn mobile-nav btn-option-mobile"
					:class="{
						'modal-active': isModalOpen && modalCmp.type === 'Workspaces'
					}"
				>
					<span @click.self.stop="modalOpen" data-cmp="Workspaces" class="btn-text">Workspaces</span>
					<!-- <span data-cmp="Workspaces" class="btn-icon-container">
                  <span data-cmp="Workspaces" class="modal-icon">
                     <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z"
                           fill="currentColor"
                        />
                     </svg>
                  </span>
               </span> -->
				</a>
				<a
					@click.self.stop="modalOpen"
					data-cmp="Starred"
					class="nav-link-btn mobile-nav btn-option-mobile"
					:class="{
						'modal-active': isModalOpen && modalCmp.type === 'Starred'
					}"
				>
					<span @click.self.stop="modalOpen" data-cmp="Starred" class="btn-text">Starred</span>
					<!-- <span data-cmp="Starred" class="btn-icon-container">
                  <span class="modal-icon">
                     <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z"
                           fill="currentColor"
                        />
                     </svg>
                  </span>
               </span> -->
				</a>
				<a
					@click.self.stop="modalOpen"
					data-cmp="Templates"
					class="nav-link-btn mobile-nav btn-option-mobile"
					:class="{
						'modal-active': isModalOpen && modalCmp.type === 'Templates'
					}"
				>
					<span @click.self.stop="modalOpen" data-cmp="Templates" class="btn-text">Templates</span>
					<!-- <span data-cmp="Templates" class="btn-icon-container">
                  <span class="modal-icon">
                     <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z"
                           fill="currentColor"
                        />
                     </svg>
                  </span>
               </span> -->
				</a>
			</div>
			<div class="nav-board-create">
				<a
					@click.stop="modalOpen"
					data-cmp="Create"
					class="nav-item mobile-nav"
					:class="{
						'modal-active': isModalOpen && modalCmp.type === 'Create'
					}"
				>
					<p class="btn-option-mobile" @click.stop="modalOpen" data-cmp="Create">Create</p>
				</a>
			</div>
		</div>
		<component @toggleModal="modalClose" v-if="isModalOpen" :is="modalCmp.type" :loggedUser="loggedUser" :modalCmp="modalCmp" />
	</section>
</template>

<script>
import Avatar from 'vue-avatar';
import Workspaces from './workspaces';
import Starred from './starred';
import Templates from './templates';
import Create from './create';
export default {
	name: 'more',
	components: {
		Avatar,
		Workspaces,
		Starred,
		Templates,
		Create
	},
	props: {
		// modalCmp: Object, required: true,
		// loggedUser: Object, required: true,
	},
	data() {
		return {
			loggedUser: null,
			isModalOpen: false,
			modalCmp: {
				type: null,
				posX: null,
				user: null
			},
			breakpointBig: true
		};
	},
	created() {
		this.setLoggedUser();
		window.addEventListener('resize', this.onResize);
	},
	destroyed() {
		window.removeEventListener('resize', this.onResize);
	},
	methods: {
		modalToggle() {
			this.$emit('toggleModal');
		},
		setLoggedUser() {
			this.loggedUser = this.$store.getters.currLoggedUser;
		},
		modalOpen(ev) {
			if (this.isModalOpen && ev.target.dataset.cmp === this.modalCmp.type) return (this.isModalOpen = false);
			this.isModalOpen = true;
			this.modalCmp.type = ev.target.dataset.cmp || '';
			this.modalCmp.user = this.loggedUser;
			if (ev.x >= 117 && ev.x <= 235) this.modalCmp.posX = 118;
			else if (ev.x >= 236 && ev.x <= 330) this.modalCmp.posX = 240;
			else if (ev.x >= 334 && ev.x <= 440) this.modalCmp.posX = 334;
			else if (ev.x >= 450 && ev.x <= 513) this.modalCmp.posX = 450;
		},
		modalClose() {
			this.isModalOpen = false;
		},
		onResize() {
			this.breakpointBig = window.innerWidth < 768 ? false : true;
			// return window.innerWidth < 768 ? false : true
		}
	}
};
</script>

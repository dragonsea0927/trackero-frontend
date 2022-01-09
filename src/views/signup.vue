<template>
	<section class="login-signup-page main-container">
		<div class="login-signup-header">
			<svg
				role="img"
				alt="Trackero"
				aria-label="Trackero"
				height="40px"
				viewBox="0 0 63.4 62.4"
				width="40px"
				class="d-block"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<linearGradient id="trello-logo-default" x1="50.048061%" x2="50.048061%" y1="100%" y2="0%">
					<stop offset="0" stop-color="#0052CC"></stop>
					<stop offset="1" stop-color="#2684FF"></stop>
				</linearGradient>
				<g fill="none" fill-rule="evenodd">
					<path
						d="m55.59.07h-47.59c-4.09405078 0-7.41448241 3.31595294-7.42006073 7.41v47.52c-.00791682 1.9730991.77030774 3.8681213 2.16269326 5.2661365 1.39238553 1.3980151 3.28425224 2.1838635 5.25736747 2.1838635h47.59c1.9713817-.0026407 3.8606757-.7896772 5.250897-2.1874031s2.1670753-3.2912295 2.1591638-5.2625969v-47.52c-.0055694-4.09014608-3.3199147-7.40449138-7.4100608-7.41zm-28.09 44.93c-.0026377.6594819-.2678382 1.2907542-.7369724 1.7542587-.4691341.4635046-1.1035619.721065-1.7630276.7158222h-10.4c-1.3602365-.005588-2.46-1.1098333-2.46-2.4700809v-30.95c0-1.3602476 1.0997635-2.4644929 2.46-2.47h10.4c1.3618668.0054804 2.4645196 1.1081332 2.47 2.47zm24-14.21c0 .6603158-.2642968 1.2931595-.7340204 1.7572465-.4697237.464087-1.1057125.7207735-1.7659796.7129359h-10.4c-1.3618668-.0056628-2.4645196-1.1083156-2.47-2.4701824v-16.74c.0054804-1.3618668 1.1081332-2.4645196 2.47-2.47h10.4c1.3602365.0055071 2.4600111 1.1097524 2.46 2.47z"
						fill="url(#trello-logo-default)"
					></path>
				</g>
			</svg>
			<h3 class="logo-text">Trackero</h3>
		</div>
		<div class="login-signup flex column">
			<h3>Sign up to your account</h3>
			<form @submit.prevent="doLogin" class="login-form flex column">
				<input name="fullname" type="fullname" placeholder="Enter full name" autocomplete="off" v-model="fullnameInput" />
				<input name="username" type="username" placeholder="Enter user name" autocomplete="off" v-model="usernameInput" /><input
					name="password"
					type="password"
					placeholder="Enter password"
					autocomplete="off"
					v-model="passwordInput"
				/><button type="submit" class="login-signup-btn nav-button" style="color: rgb(23, 43, 77)">Sign up</button>
			</form>
			<a class="signup-link" href="#/login">Alredy have an account? Log In</a>
		</div>
		<div class="right-svg">
			<img :src="require(`@/assets/img/login-right.svg`)" />
		</div>
		<div class="left-svg">
			<img :src="require(`@/assets/img/login-left.svg`)" />
		</div>
	</section>
</template>
<script>
export default {
	data() {
		return {
			username: '',
			password: '',
			user: null,
			reviews: [],
			userId: null,
			usernameInput: '',
			fullnameInput: '',
			passwordInput: ''
		}
	},
	created() {
		this.loadUsers()
		this.userId = this.$store.getters.loggedinUserId || null
	},
	methods: {
		async doLogin() {
			try {
				const user = await this.$store.dispatch({
					type: 'signup',
					username: this.usernameInput,
					password: this.passwordInput,
					fullname: this.fullnameInput
				})
				this.user = user
				this.$store.commit({ type: 'setLoggedUser', user })
				this.userId = this.$store.getters.loggedUserId
				this.$router.push('/board')
			} catch (err) {
				console.log(err)
			}
		},
		async doLogout() {
			try {
				this.$store.dispatch({ type: 'logout' })
				this.user = null
				this.userId = null
				this.$router.go()
			} catch (err) {
				console.log(err)
			}
		},
		loadUsers() {
			this.$store.dispatch({ type: 'loadUsers' })
		},
		async removeUser(userId) {
			try {
				await this.$store.dispatch({ type: 'removeUser', userId })
			} catch (err) {
				console.log('Failed to remove user')
			}
		}
	},
	computed: {
		getLoggedinUser() {
			return this.$store.getters.loggedinUser || ''
		},
		users() {
			return this.$store.getters.users
		}
	}
}
</script>

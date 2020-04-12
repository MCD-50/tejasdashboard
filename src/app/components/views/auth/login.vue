<template>
	<div class="login-div">
		<md-card>
			<md-card-area>
				<md-card-header>
					<div class="md-title">Login</div>
				</md-card-header>

				<md-card-content>
					<form style="width:350px">
						<md-input-container>
							<label>User Id</label>
							<md-input v-model="payload.userId"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Password</label>
							<md-input type="password" v-model="payload.password"></md-input>
						</md-input-container>
					</form>
				</md-card-content>
			</md-card-area>
			<md-card-actions>
				<md-button @click="login">LOGIN</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>

<script>
import * as device from '../../../../helper/deviceType';
import * as internet from "../../../../helper/internet";

export default {
	beforeMount() {
		this.$store.dispatch('setCurrentRoute', '/login');
	},

	mounted() {
		this.$store.dispatch('setIsProgressVisible', false);
		if (this.$auth.redirect()) {
			this.redirect = this.$auth.redirect().from.name
		}

		this.$store.dispatch('setSidebarMargin', 0);
		this.$events.emit('forceShow', false);
	},

	data() {
		return {
			payload: {
				userId: '',
				password: '',
				redirect: ''
			},
			error: {
				title: 'Something went wrong',
				message: 'Please check the network tab for more info.',
				okText: 'OK',
				cancelText: 'CANCEL'
			}
		}
	},

	methods: {
		deviceType() {
			return this.$store.getters.appDeviceType;
		},

		sendRequest(endPoint, method = "POST", token = null, data = null, callback) {
			internet.makeRequest(endPoint, method, token, data)
				.then(result => {
					callback && callback(result);
				})
				.catch(reject => callback && callback(null));
		},

		login() {
			const { userId, password, redirect } = this.payload;
			const _redirect = (redirect != null && redirect != '') ? redirect : '/viewCustomers';

			if (!userId || !password) return this.flashError("Something went wrong");

			this.$auth.login({
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						payload: {
							userId,
							password,
						}
					},
					rememberMe: true,
					redirect: _redirect,
					success(res) {
						if (this.deviceType == device.DeviceType.PHONE) {
							this.$store.dispatch('setSidebarMargin', 0);
						} else {
							this.$store.dispatch('setSidebarMargin', 300);
							this.$events.emit('forceShow', true);
						}
					},
					error(error) {
						this.error.title = "Invalid Otp";
						this.error.message = "Please check the network tab for more info.";
						// this.flashError("Data pushed to server.");
						// this.openDialog();
					}
				})
		},
	}
}
</script>


<style>
.login-div {
  max-width: 400px;
  margin: auto;
  margin-top: 100px;
}

.wiAccount-card {
  padding: 10px;
}
</style>


<template>
	<div class="base-div">
		<md-card class="dashboard-card">
			<md-card-area>
				<md-card-header>
					<div class="md-title">Add User or Admin</div>
				</md-card-header>
				<md-card-content>
					<form>
						<md-input-container>
							<label>Password</label>
							<md-input required v-model="payload.password"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Type</label>
							<md-select v-model="payload.type">
								<md-option value="user">USER</md-option>
								<md-option value="admin">ADMIN</md-option>
							</md-select>
						</md-input-container>

						<md-input-container>
							<label>Limit</label>
							<md-input v-model="payload.limit"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Allowed</label>
							<md-input v-model="payload.allowed"></md-input>
						</md-input-container>
					</form>
				</md-card-content>
			</md-card-area>
			<md-card-actions>
				<md-button @click="submitadd">SUBMIT</md-button>
			</md-card-actions>
		</md-card>

		<md-card class="dashboard-card">
			<md-card-area>
				<md-card-header>
					<div class="md-title">Update Password</div>
				</md-card-header>
				<md-card-content>
					<form>
						<md-input-container>
							<label>Customer Id</label>
							<md-input required v-model="payload.customerId"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Password</label>
							<md-input required v-model="payload.password"></md-input>
						</md-input-container>
					</form>
				</md-card-content>
			</md-card-area>
			<md-card-actions>
				<md-button @click="submitpassword">SUBMIT</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>


<script>
import * as internet from '../../../../helper/internet';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/addCustomer");
	},

	data() {
		return {
			payload: {
				customerId: "",
				password: "",
				type: "user",
				limit: "20",
				allowed: "mcx",
			},
			helper: {
				item: null,
				itemId: ""
			},
			error: {
				title: "Something went wrong",
				message: "Please check the network tab for more info.",
				okText: "OK",
				cancelText: "CANCEL"
			}
		};
	},

	methods: {
		sendRequest(endPoint, method = "POST", token = null, data = null, callback) {
			internet.makeRequest(endPoint, method, token, data)
				.then(result => {
					callback && callback(result);
				})
				.catch(reject => callback && callback(null));
		},


		submitadd(e) {
			const { password, type, limit, allowed } = this.payload;
			
			const data = {};
			if(password) data.password = password;
			if(type) data.type = type;
			if(limit) data.limit = limit;
			if(allowed) data.allowed = allowed;
		
			if (Object.keys(data).length > 0) {
				this.sendRequest(`/admin/register`, "POST", null, data, result => {
					if (result && !result.error && result.value && result.value.result && result.value.result) {
						this.error.title = "Done";
						this.error.message = "Data pushed to server";
						this.flashSuccess("Data pushed to server.");
						// this.openDialog();
					} else {
						this.error.title = "Something went wrong";
						this.error.message = "Please check the network tab for more info.";
						// this.openDialog();
					}
				});
			}
		},

		submitpassword(e) {
			const { customerId, password } = this.payload;
			
			const data = {};
			if(password) data.password = password;

			if (Object.keys(data).length > 0) {
				this.sendRequest(`/admin/customers/update/${customerId}`, "PUT", null, data, result => {
					if (result && !result.error && result.value && result.value.result && result.value.result) {
						this.error.title = "Done";
						this.error.message = "Data pushed to server";
						this.flashSuccess("Data pushed to server.");
						// this.openDialog();
					} else {
						this.error.title = "Something went wrong";
						this.error.message = "Please check the network tab for more info.";
						// this.openDialog();
					}
				});
			}
		},
	}
};
</script>

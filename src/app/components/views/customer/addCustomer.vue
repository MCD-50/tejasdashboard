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
							<label>Name</label>
							<md-input v-model="payload.name"></md-input>
						</md-input-container>

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
							<label>Mobile</label>
							<md-input v-model="payload.mobile"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Email</label>
							<md-input v-model="payload.email"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Amount</label>
							<md-input v-model="payload.amount"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Location</label>
							<md-input v-model="payload.location"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Handler</label>
							<md-input v-model="payload.handler"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Limit</label>
							<md-input v-model="payload.limit"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Allowed</label>
							<md-input v-model="payload.allowed"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Device</label>
							<md-select v-model="payload.device">
								<md-option value="mobile">MOBILE</md-option>
								<md-option value="web">WEB</md-option>
								<md-option value="all">ALL</md-option>
							</md-select>
						</md-input-container>

						<label>Start</label>
						<DatePicker v-model="payload.start"></DatePicker>

						<label>End</label>
						<DatePicker v-model="payload.end"></DatePicker>


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
import DatePicker from 'vuejs-datepicker';

import * as internet from '../../../../helper/internet';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/addCustomer");
	},

	data() {
		return {
			payload: {
				customerId: "",
				name: "",
				password: "",
				type: "user",
				mobile: "",
				email: "",
				amount: "",
				location: "",
				handler: "",
				start: new Date(),
				end: new Date(),
				limit: "20",
				allowed: "mcx",
				device: "all"
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
	components: {
		DatePicker,
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
			const { name, password, type, mobile, email, amount, location, handler, start, end, limit, allowed, device } = this.payload;
			
			const data = {};
			if(name) data.name = name;
			if(password) data.password = password;
			if(type) data.type = type;
			if(mobile) data.mobile = mobile;
			if(email) data.email = email;
			if(amount) data.amount = amount;
			if(location) data.location = location;
			if(handler) data.handler = handler;
			if(start) data.start = start;
			if(end) data.end = end;

			if(limit) data.limit = limit;
			if(allowed) data.allowed = allowed;
			if(device) data.device = device;
		
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

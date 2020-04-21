<template>
	<div class="base-div">
		<md-card class="dashboard-card">
			<md-card-area>
				<md-card-header>
					<div class="md-title">Edit Customer</div>
				</md-card-header>
				<md-card-content>
					<form>
						<md-input-container>
							<label>Object Id</label>
							<md-input disabled v-model="payload._id"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Customer Id</label>
							<md-input disabled v-model="payload.customerId"></md-input>
						</md-input-container>

						<md-input-container>
							<label>User Id</label>
							<md-input disabled v-model="payload.userId"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Name</label>
							<md-input v-model="payload.name"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Type</label>
							<md-input disabled v-model="payload.type"></md-input>
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

						<label>Start</label>
						<datepicker v-model="payload.start"></datepicker>

						<label>End</label>
						<datepicker v-model="payload.end"></datepicker>

						<md-input-container>
							<label>Allowed (Must be seprated by the ,)</label>
							<md-input v-model="payload.allowed"></md-input>
						</md-input-container>

						<label>Freeze</label>
						<md-checkbox v-model="payload.freeze"></md-checkbox>

						<md-input-container>
							<label>Created At</label>
							<md-input disabled v-model="payload.createdAt"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Updated At</label>
							<md-input disabled v-model="payload.updatedAt"></md-input>
						</md-input-container>

					</form>
				</md-card-content>
			</md-card-area>
			<md-card-actions>
				<md-button @click="submit">SUBMIT</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>


<script>
import DatePicker from 'vuejs-datepicker';

import * as internet from '../../../../helper/internet';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/editCustomer");
	},
	mounted() {
		const customerId = this.$route.params.customerId;
		if (customerId) {
			this.sendRequest(`/admin/customers/get/${customerId}`, "GET", null, null, result => {
					if (result && !result.error && result.value && result.value.result && result.value.result) {
						//set item and item id
						const item = result.value.result;
						this.helper.item = item;
						this.helper.itemId = item._id;
						let _ = {};

						Object.keys(item).map(key => {
							if (key in this.payload) {
								_[key] = item[key];
							}
						});

						this.payload = Object.assign(this.payload, _);
						this.$store.dispatch("setIsProgressVisible", false);
					}
				}
			);
		}
	},

	data() {
		return {
			payload: {
				_id: "",
				customerId: "",
				userId: "",
				
				name: "",
				type: "",
				mobile: "",
				email: "",
				amount: "",
				location: "",
				handler: "",
				start: null,
				end: null,
				limit: "",
				allowed: "",

				freeze: false,
				
				createdAt: "",
				updatedAt: ""
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


		submit(e) {
			const { customerId, name, mobile, email, amount, location, handler, start, end, limit, allowed, freeze } = this.payload;
			
			const data = {};
			if(name != this.helper.item.name) data.name = name;
			if(mobile != this.helper.item.mobile) data.mobile = mobile;
			if(email != this.helper.item.email) data.email = email;
			if(amount != this.helper.item.amount) data.amount = amount;
			if(location != this.helper.item.location) data.location = location;
			if(handler != this.helper.item.handler) data.handler = handler;
			if(start != this.helper.item.start) data.start = start;
			if(end != this.helper.item.end) data.end = end;

			if(limit != this.helper.item.limit) data.limit = limit;
			if(allowed != this.helper.item.allowed) data.allowed = allowed;
			if(freeze != this.helper.item.freeze) data.freeze = freeze;
		
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

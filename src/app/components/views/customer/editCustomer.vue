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

						<label>Subscription Start *</label>
						<DatePicker v-model="payload.start"></DatePicker>

						<label>Subscription End *</label>
						<DatePicker v-model="payload.end"></DatePicker>

						<md-input-container>
							<label>Amount</label>
							<md-input v-model="payload.amount"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Location</label>
							<md-input v-model="payload.location"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Info</label>
							<md-input v-model="payload.info"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Relationship Manager</label>
							<md-select v-model="payload.handler">
								<md-option value="tejas">TEJAS</md-option>
								<md-option value="shekhar">SHEKHAR</md-option>
								<md-option value="naresh">NARESH</md-option>
							</md-select>
						</md-input-container>

						<md-input-container>
							<label>Limit</label>
							<md-input required v-model="payload.limit"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Market</label>
							<md-select required v-model="payload.allowed" multiple>
								<md-option v-for="(value, index) in Markets" :key="index" :value="value"> {{String(value).toUpperCase()}}</md-option>
							</md-select>
						</md-input-container>

						<md-input-container>
							<label>Device</label>
							<md-select required v-model="payload.device">
								<md-option value="mobile">MOBILE</md-option>
								<md-option value="web">WEB</md-option>
								<md-option value="all">ALL</md-option>
							</md-select>
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
								if (key == "allowed") {
									_[key] = item[key].split(",");
								} else {
									_[key] = item[key];
								}
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
				info: "",
				handler: "",
				start: "",
				end: "",
				limit: "20",
				allowed: [],
				device: "all",

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
	computed: {
		Markets() {
			const meta = this.$store.getters.appMetaDetail;
			if(meta && meta.markets) {
				return meta.markets;
			}
			return [];
		}
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
			const { customerId, name, mobile, email, amount, location, info, handler, start, end, limit, allowed, device, freeze } = this.payload;
			
			const data = {};
			if(name != this.helper.item.name) data.name = name;
			if(mobile != this.helper.item.mobile) data.mobile = mobile;
			if(email != this.helper.item.email) data.email = email;
			if(amount != this.helper.item.amount) data.amount = amount;
			if(location != this.helper.item.location) data.location = location;
			if(info != this.helper.item.info) data.info = info;
			if(handler != this.helper.item.handler) data.handler = handler;
			if(start != this.helper.item.start) data.start = start.toISOString();
			if(end != this.helper.item.end) data.end = end.toISOString();

			if(limit != this.helper.item.limit) data.limit = limit;
			if(allowed != this.helper.item.allowed) data.allowed = allowed.join(",");
			if(device != this.helper.item.device) data.device = device;
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

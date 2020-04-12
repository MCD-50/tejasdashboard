<template>
	<div class="base-div">
	<md-card class="dashboard-card">
			<md-card-area>
				<md-card-header>
					<div class="md-title">View Market</div>
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
							<label>Market</label>
							<md-input disabled v-model="payload.market"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Target</label>
							<md-input disabled v-model="payload.target"></md-input>
						</md-input-container>

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
		</md-card>
	</div>
</template>


<script>
import * as internet from '../../../../helper/internet';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/viewMarket");
	},
	mounted() {
		const objectId = this.$route.params.objectId;
		const customerId = this.$route.params.customerId;
		if (objectId && customerId) {
			this.sendRequest(`/admin/markets/get/${customerId}/${objectId}`, "GET", null, null, result => {
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
				market: "",
				target: "",
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

	methods: {
		sendRequest(endPoint, method = "POST", token = null, data = null, callback) {
			internet.makeRequest(endPoint, method, token, data)
				.then(result => {
					callback && callback(result);
				})
				.catch(reject => callback && callback(null));
		},
	}
};
</script>

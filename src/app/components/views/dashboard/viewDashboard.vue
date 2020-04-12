<template>
	<div class="base-div">
		<md-card class="dashboard-card">
			<label>Hello {{this.payload.customerId}}</label>
		</md-card>
	</div>
</template>

<script>
import * as internet from '../../../../helper/internet';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/dashboard");
	},

	mounted() {
		this.sendRequest(`/admin/admins/get`, "GET", null, null, result => {
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
	},

	data() {
		return {
		payload: {
			customerId: "",
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

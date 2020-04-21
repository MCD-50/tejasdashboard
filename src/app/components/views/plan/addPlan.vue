<template>
	<div class="base-div">
		<md-card class="dashboard-card">
			<md-card-area>
				<md-card-header>
					<div class="md-title">Add Plan</div>
				</md-card-header>
				<md-card-content>
					<form>
						<md-input-container>
							<label>Name</label>
							<md-input v-model="payload.name"></md-input>
						</md-input-container>
						
						<md-input-container>
							<label>Price</label>
							<md-input v-model="payload.price"></md-input>
						</md-input-container>
					</form>
				</md-card-content>
			</md-card-area>
			<md-card-actions>
				<md-button @click="submitadd">SUBMIT</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>


<script>
import * as internet from '../../../../helper/internet';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/addPlan");
	},

	data() {
		return {
			payload: {
				name: "",
				price: "",
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
			const { name, plan } = this.payload;
			
			const data = {};
			if(name) data.name = name;
			if(plan) data.plan = plan;

			if (Object.keys(data).length > 0) {
				this.sendRequest(`/admin/plans/create`, "POST", null, data, result => {
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

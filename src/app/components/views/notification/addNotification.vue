<template>
	<div class="base-div">
		<md-card class="dashboard-card">
			<md-card-area>
				<md-card-header>
					<div class="md-title">Add Notification</div>
				</md-card-header>
				<md-card-content>
					<form>
						<md-input-container>
							<label>Customer Id</label>
							<md-input v-model="payload.customerId"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Title</label>
							<md-input v-model="payload.title"></md-input>
						</md-input-container>
						
						<md-input-container>
							<label>Message</label>
							<md-input v-model="payload.message"></md-input>
						</md-input-container>

						<md-input-container>
							<label>Link</label>
							<md-input v-model="payload.link"></md-input>
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
		this.$store.dispatch("setCurrentRoute", "/addNotification");
	},

	data() {
		return {
			payload: {
				customerId: "",
				title: "",
				message: "",
				link: "",
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
			const { customerId, title, message, link } = this.payload;
			
			const data = {};
			if(customerId) data.customerId = customerId;
			if(title) data.title = title;
			if(message) data.message = message;
			if(link) data.link = link;

			if (Object.keys(data).length > 0) {
				this.sendRequest(`/admin/notifications/create`, "POST", null, data, result => {
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

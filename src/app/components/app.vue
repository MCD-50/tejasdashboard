<template>
	<div class="container">
		<flash-message></flash-message>
		<Sidebar></Sidebar>
		<div :style="[ContentMargin]">
			<!-- <md-progress md-indeterminate class="md-accent" v-if="IsProgressVisible"></md-progress> -->
			
			<div class="content-div">
				<transition name="md-router" appear>
					<router-view></router-view>
				</transition>
			</div>
			
		</div>
	</div>
</template>
<script>
import * as device from '../../helper/deviceType.js';
import * as internet from "../../helper/internet";
import Sidebar from './sidebar.vue';

export default {

	beforeMount() {
		let width = window.innerWidth;
		this.setDeviceType(width);
		window.onresize = (e) => {
			width = e.target.innerWidth || 900;
			this.setDeviceType(width);
		};
	},
	
	mounted() {
		if (this.IsLoginPage || this.DeviceType == device.DeviceType.PHONE) {
			this.$store.dispatch('setSidebarMargin', 0);
		} else {
			this.$store.dispatch('setSidebarMargin', 300);
		}


		this.sendRequest(`/details/get`, "GET", null, null, result => {
				if (result && !result.error && result.value && result.value.result && result.value.result) {
					this.$store.dispatch("setMetaDetail", result.value.result);
				}
			}
		);
	},
	
	components: {
		Sidebar,
	},

	computed: {
		SideBarMargin() {
			return { 'margin-left': `${this.$store.getters.appSideBarMargin}px` };
		},
		DeviceType() {
			return this.$store.getters.appDeviceType;
		},
		IsProgressVisible() {
			return this.$store.getters.appIsProgressVisible;
		},
		ContentMargin() {
			return { 'margin-left': `${this.$store.getters.appContentMargin}px` };
		},
		IsLoginPage() {
			return (this.$store.getters.appCurrentRoute == '/login') ? true : false;
		}
	},
	methods: {
		setDeviceType(width) {
			if (width < 600) {
				this.$store.dispatch('setDeviceType', device.DeviceType.PHONE);
			} else if (width > 600 && width < 900) {
				this.$store.dispatch('setDeviceType', device.DeviceType.TABLET);
			} else {
				this.$store.dispatch('setDeviceType', device.DeviceType.DESKTOP);
			}
		},

		sendRequest(endPoint, method = "POST", token = null, data = null, callback) {
			internet.makeRequest(endPoint, method, token, data)
				.then(result => {
					callback && callback(result);
				})
				.catch(reject => callback && callback(null));
		},
	},

}
</script>

<style>
body {
	background: #F1F1F1;
}

.content-div {
	padding: 74px 20px 10px 20px;
	max-width: 1500px;
	margin: auto;
}

.divider {
	position: relative;
	padding-top: 10px;
	padding-bottom: 10px;
	margin-top: 10px;
	font-size: 12px;
	line-height: 1.5;
	color: #EAECEF;
	border-top: 1px solid #EAECEF;
}

.footer {
	display: flex;
	flex: 1;
}

.left-sidenav-container .md-theme-default.md-toolbar {
	background-color: #FFFFFF;
	color: #000;
}

.md-theme-default.md-toolbar.admin-toolbar {
	position: fixed;
	z-index: 1500;
	left: 0;
	right: 0;
	top: 0;
	padding: 0px
}

.md-menu-content, .md-select-content {
	min-width: 30%;
	max-width: 40%;
}

.top-fixed-bar {
	background: #345888;
	color: #FFFFFF;
	padding-left: 10px;
}

.md-sidenav-backdrop {
	display: none;
}

.md-sidenav.md-active .md-sidenav-content {
	box-shadow: 0 0px 10px -5px rgba(0, 0, 0, 0.2), 0 10px 11px 0px rgba(0, 0, 0, 0.14), 0 6px 0px -2px rgba(0, 0, 0, 0.12);
}

.md-theme-default.md-list .md-list-item-expand .md-list-item-container {
	background: none!important;
}

.md-sidenav-content {
	position: fixed!important;
	z-index: 2000!important;
}

.base-div {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.dashboard-card {
	margin-top: .5em;
	margin-bottom: .5em;
}

.md-toolbar.md-theme-default {
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.12)!important;
	height: 63.50px;
}

.top-left {
	padding-left: 10px;
}

.md-tabs .md-tab {
	padding: 1px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}

.md-theme-default.md-tabs>.md-tabs-navigation {
	background: #345888;
}

.md-toolbar-container img {
	height: 51px;
	padding-left: 0px;
}

.md-card-actions .md-button {
	background-color: rgba(153, 153, 153, 0.2);
}

.md-rating-bar {
	background: whitesmoke;
}

.vdatetime {
	margin-bottom: 15px;
}

.vdatetime-popup {
	position: absolute;
	width: 280px;
	top: 55%;
}

.vdatetime-overlay {
	display: none;
}

.vdatetime-input {
	box-shadow: none;
	border-radius: 6px;
	border-style: ridge;
	padding: 10px;
	font-size: 14px;
	width: 100%;
}

.ql-container .ql-editor {
	min-height: 20em;
	padding-bottom: 1em;
	max-height: 25em;
}

.html {
	height: 9em;
	overflow-y: auto;
	border: 1px solid #ccc;
	border-top: none;
	resize: vertical;
}

.flash__wrapper {
	position: fixed;
	z-index: 11111;
	width: 100%;
	top: 8%;
}

.success.flash__message {
	width: max-content;
    margin: 0 auto;
}
</style>


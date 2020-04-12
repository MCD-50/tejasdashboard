<template>
	<div class="left-sidenav-container">

		<md-toolbar :style="[ContentMargin]" class="admin-toolbar">
			<div class="md-toolbar-container top-fixed-bar">
				<md-button v-if="!IsLoginPage" :disabled="IsSidebarHidden" :style="[DisplayButton]" class="md-icon-button" @click="toggleLeftSidenav">
					<md-icon>menu</md-icon>
				</md-button>
				<h2 class="md-title">{{NavBarTitle}}</h2>
				<span style="flex: 1;"></span>
				<md-button style="width: 100px;" class="md-icon-button" @click="profile" v-if="!IsLoginPage">Profile</md-button>
				<md-button style="width: 100px;" class="md-icon-button" @click="logout" v-if="!IsLoginPage">Logout</md-button>
			</div>
		</md-toolbar>

		<md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')" :style="[SideBarWidth]">
			<md-toolbar class="md-small">
				<div class="md-toolbar-container">
					<!-- <img src="/assets/file.png" /> -->
					<h3 class="md-title top-left"> Dashboard</h3>
				</div>
			</md-toolbar>

			<div>
				<md-list>
					<md-list-item v-for="(item, index) in Items" :key="index" @click="(e)=>clickRoute(e, item)" :style="[CurrentPath==item.path ? style.selected : style.unselected]">
						<md-icon v-if="item.meta.icon">{{item.meta.icon}}</md-icon>
						<span>{{item.name}}</span>
						<md-list-expand v-if="item.children">
							<md-list v-for="(subItem, subIndex) in item.children" :key="subIndex">
								<md-list-item class="md-inset" @click="(e)=>clickRoute(e, subItem)" :style="[CurrentPath==subItem.path ? style.selected : style.unselected]">{{subItem.name}}</md-list-item>
							</md-list>
						</md-list-expand>
					</md-list-item>
				</md-list>
			</div>
		</md-sidenav>
	</div>
</template>

<script>
import * as device from '../../helper/deviceType';
import { routeItems } from '../route/sidebarRoute';

export default {
	mounted() {
		if (!this.IsLoginPage && this.DeviceType != device.DeviceType.PHONE) {
			this.$refs.leftSidenav.open();
		}
		this.$events.on('forceShow', eventData => {
			if (eventData) {
				this.$refs.leftSidenav.open()
			} else {
				this.$refs.leftSidenav.close()
			}
		});
	},
	data() {
		return {
			style: {
				unselected: { background: "transparent" },
				selected: { background: "#f1f1f1" }
			},
		}
	},
	computed: {
		NavBarTitle() {
			return this.$store.getters.appNavBarTitle;
		},
		SideBarMargin() {
			return { 'margin-left': `${this.$store.getters.appSideBarMargin}px` };
		},
		ContentMargin() {
			return { 'margin-left': `${this.$store.getters.appContentMargin}px` };
		},
		SideBarWidth() {
			return { 'width': `${this.$store.getters.appSideBarMargin}px` };
		},
		CurrentPath() {
			return this.$route.path;
		},
		IsSidebarOpen() {
			return this.$store.getters.appIsSidebarOpen;
		},
		IsSidebarHidden() {
			return this.$store.getters.appIsSidebarHidden;
		},
		DeviceType() {
			return this.$store.getters.appDeviceType;
		},
		DisplayButton() {
			if (this.IsSidebarHidden) {
				return { display: 'none' };
			}
			return { display: 'block' };
		},
		IsLoginPage() {
			return (this.$store.getters.appCurrentRoute == '/login') ? true : false;
		},
		Items() {
			return routeItems;
		},
	},
	methods: {
		openDialog() {
			this.$refs.confirm_dailog.open();
		},

		closeDialog() {
			this.$refs.confirm_dailog.close();
		},

		onOpen() {

		},

		onClose(type) {

		},
		toggleLeftSidenav() {
			this.$refs.leftSidenav.toggle();
		},
		open(ref) {
			this.$store.dispatch('setSidebarMargin', 300)
		},
		close(ref) {
			this.$store.dispatch('setSidebarMargin', 0)
		},
		logout() {
			this.$auth.logout({
				makeRequest: true,
				success: function (res) {
					location.reload();
				},
				error: function (error) {
					this.flashError("Something went wrong");
				},
				redirect: '/login',
			});
		},
		profile() {
			this.$router.push({
				path: '/profile', name: 'Profile',
			})
		},
		clickRoute(e, item) {
			if (item.children == undefined) {
				this.$router.push(item.path)
				if (this.$store.getters.appDeviceType == device.DeviceType.PHONE) {
					this.$store.dispatch('setSidebarMargin', 0)
					this.toggleLeftSidenav()
				}
			}
		},

	}
}
</script>


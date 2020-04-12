
export default {
	name: 'Notifications',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'View Notifications',
			path: '/notification/viewNotifications',
			meta: {
				link: 'notification/viewNotifications.vue',
				auth: true
			},
			component: require('../../components/views/notification/viewNotifications.vue')
		}
	]
}
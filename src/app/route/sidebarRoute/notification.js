
export default {
	name: 'Notifications',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'Add Notification',
			path: '/notification/addNotification',
			meta: {
				link: 'notification/addNotification.vue',
				auth: true
			},
			component: require('../../components/views/notification/addNotification.vue')
		},
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

export default {
	name: 'Alerts',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'View Alerts',
			path: '/alert/viewAlerts',
			meta: {
				link: 'alert/viewAlerts.vue',
				auth: true
			},
			component: require('../../components/views/alert/viewAlerts.vue')
		}
	]
}
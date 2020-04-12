
export default {
	name: 'Activities',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'View Activities',
			path: '/activity/viewActivities',
			meta: {
				link: 'activity/viewActivities.vue',
				auth: true
			},
			component: require('../../components/views/activity/viewActivities.vue')
		}
	]
}
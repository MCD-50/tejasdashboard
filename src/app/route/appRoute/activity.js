
const activityRoutes = [
	{
		name: 'View Activity',
		path: '/viewActivity/:customerId/:objectId',
		component: require('../../components/views/activity/viewActivity.vue'),
		meta: {
			auth: true
		}
	},
]

export default activityRoutes;
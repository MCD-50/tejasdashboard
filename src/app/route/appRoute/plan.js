const planRoutes = [
	{
		name: 'View Plan',
		path: '/viewPlan/:objectId',
		component: require('../../components/views/plan/viewPlan.vue'),
		meta: {
			auth: true
		}
	},
]

export default planRoutes;
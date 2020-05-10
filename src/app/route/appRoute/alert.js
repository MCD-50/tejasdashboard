
const alertRoutes = [
	{
		name: 'View Alert',
		path: '/viewAlert/:customerId/:objectId',
		component: require('../../components/views/alert/viewAlert.vue'),
		meta: {
			auth: true
		}
	},
]

export default alertRoutes;
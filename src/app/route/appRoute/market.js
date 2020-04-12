
const marketRoutes = [
	{
		name: 'View Market',
		path: '/viewMarket/:customerId/:objectId',
		component: require('../../components/views/market/viewMarket.vue'),
		meta: {
			auth: true
		}
	},
]

export default marketRoutes;
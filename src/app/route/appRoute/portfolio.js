
const portfolioRoutes = [
	{
		name: 'View Portfolio',
		path: '/viewPortfolio/:customerId/:objectId',
		component: require('../../components/views/portfolio/viewPortfolio.vue'),
		meta: {
			auth: true
		}
	},
]

export default portfolioRoutes;
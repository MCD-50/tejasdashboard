
export default {
	name: 'Portfolios',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'View Portfolios',
			path: '/portfolio/viewPortfolios',
			meta: {
				link: 'portfolio/viewPortfolios.vue',
				auth: true
			},
			component: require('../../components/views/portfolio/viewPortfolios.vue')
		}
	]
}
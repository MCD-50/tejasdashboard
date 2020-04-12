
export default {
	name: 'Markets',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'View Markets',
			path: '/market/viewMarkets',
			meta: {
				link: 'market/viewMarkets.vue',
				auth: true
			},
			component: require('../../components/views/market/viewMarkets.vue')
		}
	]
}
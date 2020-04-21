
export default {
	name: 'Plan',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'Add Plan',
			path: '/plan/addPlan',
			meta: {
				link: 'plan/addPlan.vue',
				auth: true
			},
			component: require('../../components/views/plan/addPlan.vue')
		},
		{
			name: 'View Plans',
			path: '/plan/viewPlans',
			meta: {
				link: 'plan/viewPlans.vue',
				auth: true
			},
			component: require('../../components/views/plan/viewPlans.vue')

		}
	]
}
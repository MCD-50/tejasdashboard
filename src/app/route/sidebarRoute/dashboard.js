
export default {
	name: 'Dashboard',
	path: '/dashboard',
	meta: {
		icon: 'dashboard',
		auth: true
	},
	component: require('../../components/views/dashboard/viewDashboard.vue')
}
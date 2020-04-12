
const profileRoutes = [
	{
		name: 'Profile',
		path: '/profile',
		component: require('../../components/views/dashboard/profile.vue'),
		meta: {
			auth: true
		}
	},
]

export default profileRoutes;
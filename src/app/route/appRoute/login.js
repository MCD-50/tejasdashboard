
const loginRoutes = [
	{
		name: 'Login',
		path: '/login',
		component: require('../../components/views/auth/login.vue'),
		meta: {
			auth: false
		}
	},
]

export default loginRoutes;
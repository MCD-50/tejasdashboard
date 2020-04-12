
const dashboardRoutes = [
	{
		path: '*',
		redirect: '/dashboard',
		meta: {
			auth: true
		}
	},
]

export default dashboardRoutes

const notificationRoutes = [
	{
		name: 'View Notification',
		path: '/viewNotification/:customerId/:objectId',
		component: require('../../components/views/notification/viewNotification.vue'),
		meta: {
			auth: true
		}
	},
]

export default notificationRoutes;
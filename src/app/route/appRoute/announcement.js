const announcementRoutes = [
	{
		name: 'View Announcement',
		path: '/viewAnnouncement/:objectId',
		component: require('../../components/views/announcement/viewAnnouncement.vue'),
		meta: {
			auth: true
		}
	},
]

export default announcementRoutes;
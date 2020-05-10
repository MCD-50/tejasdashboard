
export default {
	name: 'Announcements',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'Add Announcement',
			path: '/announcement/addAnnouncement',
			meta: {
				link: 'announcement/addAnnouncement.vue',
				auth: true
			},
			component: require('../../components/views/announcement/addAnnouncement.vue')
		},
		{
			name: 'View Announcements',
			path: '/announcement/viewAnnouncements',
			meta: {
				link: 'announcement/viewAnnouncements.vue',
				auth: true
			},
			component: require('../../components/views/announcement/viewAnnouncements.vue')

		}
	]
}
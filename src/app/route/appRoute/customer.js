
const customerRoutes = [
	{
		name: 'Edit Customer',
		path: '/editCustomer/:customerId',
		component: require('../../components/views/customer/editCustomer.vue'),
		meta: {
			auth: true
		}
	},
	{
		name: 'View Customer',
		path: '/viewCustomer/:customerId',
		component: require('../../components/views/customer/viewCustomer.vue'),
		meta: {
			auth: true
		}
	},
]

export default customerRoutes;
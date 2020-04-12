
export default {
	name: 'Customer',
	meta: {
		icon: 'person',
		auth: true
	},
	children: [
		{
			name: 'Add Customer',
			path: '/customer/addCustomer',
			meta: {
				link: 'customer/addCustomer.vue',
				auth: true
			},
			component: require('../../components/views/customer/addCustomer.vue')
		},
		{
			name: 'View Customers',
			path: '/customer/viewCustomers',
			meta: {
				link: 'customer/viewCustomers.vue',
				auth: true
			},
			component: require('../../components/views/customer/viewCustomers.vue')

		}
	]
}
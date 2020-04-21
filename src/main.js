import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VueEvents from 'vue-events'
// You need a specific loader for CSS files


import VueMaterial from 'vue-material'
import '../node_modules/vue-material/dist/vue-material.css';

import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

import "vue-datetime/dist/vue-datetime.css"

import App from './app/components/app.vue';
import store from './app/store';
import router from './app/route';
import * as constant from './helper/constant';
import * as collection from "./helper/collection";

Vue.use(VueMaterial)
Vue.use(VueEvents)
//define this before using vue-auth
Vue.router = router
Vue.use(VueAxios, axios)
Vue.use(VueFlashMessage, {
	messageOptions: {
		timeout: 5000,
	}
});
Vue.use(VueAuth, {
	auth: {
		request: function (req, token) {
			this.options.http._setHeaders.call(this, req, { Authorization: token })
		},
		response: (res) => {
			console.log(res.data.result);
			if (res && res.config && res.config.url && res.config.url.includes("/admin/login") && res.data && res.data && res.data.result && res.data.result.authorization) {
				return res.data.result.authorization;
			}
		}
	},
	http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
	router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
	loginData: { url: `${collection.parseEnvValue(process.env.BASE_URL)}/admin/login`, method: 'POST', fetchUser: false },
	refreshData: { enabled: false },
	fetchData: { url: `${collection.parseEnvValue(process.env.BASE_URL)}/admin/admins/get`, method: 'GET', enabled: false },
	logoutData: { url: `${collection.parseEnvValue(process.env.BASE_URL)}/admin/logout`, method: 'DELETE', redirect: '/login', makeRequest: true }
});

Vue.config.devtools = true
new Vue({
	el: '#app',
	store: store,
	router: router,
	render: render => render(App)
})

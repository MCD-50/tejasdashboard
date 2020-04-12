import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default new VueRouter({
	base: __dirname,
	routes: [
		...importAppRoutes(),
		...importSidebarRoutes(),
	]
});

function importAppRoutes(menu = [], routes = [], isBaseRouting = true) {
	if (menu.length < 1 && isBaseRouting) {
		const { routeItems } = require('./appRoute');
		routeItems.map(item => {
			item.map(x => {
				menu.push(x);
			})
		})
	}

	for (let i = 0, l = menu.length; i < l; i++) {
		const item = menu[i]
		if (item.path) {
			routes.push(item);
		}

		if (!item.component) {
			importAppRoutes(item.children, routes, false);
		}
	}

	return routes
}

function importSidebarRoutes(menu = [], routes = [], isBaseRouting = true) {
	if (menu.length < 1 && isBaseRouting) {
		const { routeItems } = require('./sidebarRoute');
		menu = routeItems || []
	}

	for (let i = 0, l = menu.length; i < l; i++) {
		const item = menu[i]
		if (item.path) {
			routes.push(item);
		}
		if (!item.component) {
			importSidebarRoutes(item.children, routes, false);
		}
	}
	return routes
}
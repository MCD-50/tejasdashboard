import Vue from 'vue';
import VueX from 'vuex';

Vue.use(VueX)

import app from './modules/app';
import store from './modules/store';

export default new VueX.Store({
	modules: {
		app,
		store
	},
})
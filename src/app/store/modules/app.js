import * as device from '../../../helper/deviceType';

const state = {
	currentRoute: '/login',
	sideBarMargin: 300,
	contentMargin: 300,
	navBarTitle: 'Panel',
	previousPage: 1,
	deviceType: device.DeviceType.TABLET,
	isSidebarOpen: false,
	isSidebarHidden: false,
	metaDetail: {},
	isProgressVisible: false,
	translate3D: true,
}

const mutations = {
	SET_CURRENT_ROUTE(state, payload) {
		state.currentRoute = payload;
	},
	SET_SIDEBAR_MARGIN(state, payload) {
		state.sideBarMargin = payload;
		if (state.deviceType == device.DeviceType.PHONE) {
			state.contentMargin = 0;
		} else if (state.deviceType == device.DeviceType.TABLET) {
			state.contentMargin = payload;
		} else {
			state.contentMargin = payload;
		}
	},
	SET_PREVIOUS_PAGE(state, payload) {
		state.previousPage = payload;
	},
	SET_NAVBAR_TITLE(state, payload) {
		state.navBarTitle = payload;
	},
	SET_DEVICE_TYPE(state, payload) {
		state.deviceType = payload;
	},
	SET_IS_SIDEBAR_OPEN(state, payload) {
		state.isSidebarOpen = payload;
	},
	SET_IS_PROGRESS_VISIBLE(state, payload) {
		state.isProgressVisible = payload;
	},
	SET_META_DETAIL(state, payload) {
		state.metaDetail = payload;
	},
	SET_IS_SIDEBAR_HIDDEN(state, payload) {
		state.isSidebarHidden = payload;
	},
	SET_TRASLATE3D(state, payload) {
		state.translate3D = payload;
	},
}

const actions = {
	setCurrentRoute({ commit }, payload) {
		commit('SET_CURRENT_ROUTE', payload);
	},
	setSidebarMargin({ commit }, payload) {
		commit('SET_SIDEBAR_MARGIN', payload);
	},
	setPreviousPage({ commit }, payload) {
		commit('SET_PREVIOUS_PAGE', payload);
	},
	setNavbarTitle({ commit }, payload) {
		commit('SET_NAVBAR_TITLE', payload);
	},
	setDeviceType({ commit }, payload) {
		commit('SET_DEVICE_TYPE', payload);
	},
	setIsSidebarOpen({ commit }, payload) {
		commit('SET_IS_SIDEBAR_OPEN', payload);
	},
	setIsProgressVisible({ commit }, payload) {
		commit('SET_IS_PROGRESS_VISIBLE', payload);
	},
	setMetaDetail({ commit }, payload) {
		commit('SET_META_DETAIL', payload);
	},
	setIsSidebarHidden({ commit }, payload) {
		commit('SET_IS_SIDEBAR_HIDDEN', payload);
	},
	setTranslate3d({ commit }, payload) {
		commit('SET_TRASLATE3D', payload);
	},
}

const getters = {
	appCurrentRoute: state => state.currentRoute,
	appSideBarMargin: state => state.sideBarMargin,
	appPreviousPage: state => state.previousPage,
	appContentMargin: state => state.contentMargin,
	appNavBarTitle: state => state.navBarTitle,
	appDeviceType: state => state.deviceType,
	appIsSidebarOpen: state => state.isSidebarOpen,
	appIsProgressVisible: state => state.isProgressVisible,
	appMetaDetail: state => state.metaDetail,
	appIsSidebarHidden: state => state.isSidebarHidden,
	appTranslate3D: state => state.translate3D,
}


export default {
	state,
	mutations,
	actions,
	getters
}
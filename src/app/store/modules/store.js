const state = {
	items: [],
	paging: {},
	item: {},
	pageFor: '',
};

const mutations = {
	SET_ITEMS: (state, payload) => {
		state.items = payload.data.slice();
		state.paging = Object.assign({}, payload.pages);
		state.pageFor = payload.pageFor;
	},

	SET_ITEM: (state, payload) => {
		state.item = Object.assign({}, payload);
	},

	SET_ITEM_IMAGE: (state, payoad) => {
		state.deal.mainImage = payload;
	},

	PUSH_IN_ITEM_IMAGES: (state, payload) => {
		state.deal.images.push(payload);
	},

	REMOVE_FROM_ITEM_IMAGES: (state, payload) => {
		state.deal.images.splice(state.deal.images.indexOf(payload), 1);
	}
}

const actions = {
	setItems({ commit }, payload) {
		commit('SET_ITEMS', payload);
	},
	setItem({ commit }, payload) {
		commit('SET_ITEM', payload);
	},
	setItemImage({ commit }, payload) {
		commit('SET_ITEM_MAGE', payload);
	},
	pushInItemImages({ commit }, payload) {
		commit('PUSH_IN_ITEM_IMAGES', payload);
	},
	removeFromItemImages({ commit }, payload) {
		commit('REMOVE_FROM_ITEM_IMAGES', payload);
	},
}
const getters = {
	items: state => state.items,
	item: state => state.item,
	paging: state => state.paging,
	pageFor: state => state.pageFor
}

export default {
	state,
	mutations,
	actions,
	getters
};

import Vue from 'vue'
import Vuex from 'vuex'

import * as api from './api'

Vue.use(Vuex)

const state = {
	appLoaded: false,

	appName: 'cryChan',

	appBoardsList: [],
	appBoardActive: [],
	appThreadActive: [],

	appPagesList: [],
	appPageActive: [],

	appNewsList: [],
	appNewsActive: []
}

const mutations = {
	// BOAR
	SET_BOARDS_LIST (state, payload) {
		state.appBoardsList = payload.boards_list
	},
	SET_BOARD_ACTIVE (state, payload) {
		state.appBoardActive = payload.board_data
	},
	SET_THREAD_ACTIVE (state, payload) {
		state.appThreadActive = payload.thread_data
	},
	REFRESH_THREAD_ACTIVE (state, payload) {
		state.appThreadActive.thread.replys.push(...payload.replys_data)
	},
	// PAGE
	SET_PAGES_LIST (state, payload) {
		state.appPagesList = payload.pages_list
	},
	SET_PAGE_ACTIVE (state, payload) {
		state.appPageActive = payload.page_data
	},
	// NEWS
	SET_NEWS_LIST (state, payload) {
		state.appNewsList = payload.news_list
	},
	SET_NEWS_ACTIVE (state, payload) {
		state.appNewsActive = payload.news_data
	}
}

const actions = {
	// BOARD
	FETCH_BOARDS_LIST ({ commit }) {
		return api.board.getList()
		.then((boards_list) => {
			commit('SET_BOARDS_LIST', { boards_list })
			return boards_list
		})
	},
	FETCH_BOARD_THREADS ({ commit }, [board_slug, page]) {
		return api.board.getItem(board_slug, page)
		.then((board_data) => {
			commit('SET_BOARD_ACTIVE', { board_data })
			return board_data
		})
	},
	FETCH_BOARD_THREAD ({ commit }, [board_slug, thread_id]) {
		return api.board.getThread(board_slug, thread_id)
		.then((thread_data) => {
			commit('SET_THREAD_ACTIVE', { thread_data })
			return thread_data
		})
	},
	REFRESH_BOARD_THREAD ({ commit }, [board_slug, thread_id, post_id]) {
		return api.board.refreshThread(board_slug, thread_id, post_id)
		.then((replys_data) => {
			commit('REFRESH_THREAD_ACTIVE', { replys_data })
			return replys_data
		})
	},
	// PAGE
	FETCH_PAGES_LIST ({ commit }) {
		return api.pages.getList()
		.then((pages_list) => {
			commit('SET_PAGES_LIST', { pages_list })
		})
	},
	FETCH_PAGE ({ commit }, page_slug) {
		return api.pages.getItem(page_slug)
		.then((page_data) => {
			commit('SET_PAGE_ACTIVE', { page_data })
		})
	},
	// NEWS
	FETCH_NEWS_LIST ({ commit }, page) {
		return api.news.getList(page)
		.then((news_list) => {
			commit('SET_NEWS_LIST', { news_list })
		})
	},
	FETCH_NEWS ({ commit }, news_slug) {
		return api.news.getItem(news_slug)
		.then((news_data) => {
			commit('SET_NEWS_ACTIVE', { news_data })
		})
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	actions
})

export default store
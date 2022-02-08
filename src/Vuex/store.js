import {createStore} from 'vuex';


const store =  createStore({

    state: {
       dogList: [],
       allBreeds: [],
       searchResult: []
    },

    mutations: {
        dogList(state, payload) {
            state.dogList = payload;
        },

        allBreeds(state, payload) {
            state.allBreeds = payload;
        },

        searchResult(state, payload) {
            state.searchResult = payload;
        },
    }, 

    actions: {
        dogList({commit}, payload) {
            commit('dogList', payload)
        },

        allBreeds({commit}, payload) {
            commit('allBreeds', payload)
        },

        searchResult({commit}, payload) {
            commit('searchResult', payload)
        },
    },

   
})

export default store;
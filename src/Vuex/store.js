import {createStore} from 'vuex';


const store =  createStore({

    state: {
       dogList: [],
       allBreeds: []
    },

    mutations: {
        dogList(state, payload) {
            state.dogList = payload;
        },

        allBreeds(state, payload) {
            state.allBreeds = payload;
        },
    }, 

    actions: {
        dogList({commit}, payload) {
            commit('dogList', payload)
        },

        allBreeds({commit}, payload) {
            commit('allBreeds', payload)
        },
    },

   
})

export default store;
import {createStore} from 'vuex'

const store =  createStore({

    state: {
       dogList: []
    },

    mutations: {
        dogList(state, payload) {
            state.dogList = payload;
        },
    }, 

    actions: {
        dogList({commit}, payload) {
            commit('dogList', payload)
        },
    },

   
})

export default store;
const state = {
    spinners: false
 }
 const getters = {
     spinner: (state) => {
         return state.spinners
     }
 }
 const mutations = {
     SET_SPINNER(state, payload){
         state.spinners = payload
     }
 }
 export default {
     state,
     mutations,
     getters
 }
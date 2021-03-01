import { authService } from '../../services';

const state = {
    me: []
}

const getters = {
    getMe: state => state.me
}

const mutations = {
    SET_ME(state, payload){
        state.me = payload     
    }
}

const actions = {
    GET_ME({commit}){
        return authService.getMe().then((me) => {
            commit('SET_ME',me);
            return me;
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}
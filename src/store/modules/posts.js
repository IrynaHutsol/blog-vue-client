import { postService } from '../../services';

const state = {
    allPosts: [],
    post: []
}

const getters = {
    getPosts: state => state.allPosts,
    getPost: state => state.post
}

const mutations = {
    SET_POSTS(state, payload){
        state.allPosts = payload     
    },
    SET_POST(state, payload){
        state.post = payload     
    },
}

const actions = {
    GET_POSTS({commit}){
        return postService.getPosts().then((allPosts) => {
            commit('SET_POSTS',allPosts);
            return allPosts;
        })
    },
    GET_POST({commit}, payload){
        return postService.getPost(payload).then((post) => {
            commit('SET_POST',post)
            return post
        })
    },
}
export default {
    state,
    getters,
    mutations,
    actions
}
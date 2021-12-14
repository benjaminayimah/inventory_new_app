import axios from 'axios'
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || null,
        user: {}
    },
    mutations: {
        //authentication
        setAuthToken(state, payload){
            state.token = payload;
        },
        setUser(state, payload) {
            state.user = payload
        },
        destroyToken(state){
            state.token = null;
        }

    },
    actions: {
        async signIn(state, credentials){
            const response = await axios.post('http://localhost:8000/api/sign-in', credentials)
            try {
                state.commit('setAuthToken', response.data.token)
                localStorage.setItem('token', response.data.token)
                window.console.log(response.data.token)
            } catch(e) {
                window.console.log(e)
            }
            
        },
        async Logout(state, credentials){
            axios.delete('http://localhost:8000/api/logout?token='+credentials)
            try {
                localStorage.removeItem('token')
                state.commit('destroyToken')
            } catch(e) {
                window.console.log(e)
            }
            
        }
    },
    getters: {
        auth(state){
            return state.token !== null
        },
    }
}
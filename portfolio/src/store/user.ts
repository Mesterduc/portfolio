import {User} from './types/user'

export default {
    state: () => ({
        name: 'Buster'
    }),
    getters: {},

    mutations: {
        SET_NAME(state: { name: string }, payload:any){
            state.name = payload
        }
    },
    actions: {
        saveName({commit}: { commit: Function }, data:any) {
            commit('SET_NAME', data)
        }

    },
}
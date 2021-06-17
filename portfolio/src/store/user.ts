export default {
    state: () => ({
        name: 'Buster'
    }),
    getters: {},

    mutations: {
        SET_NAME(state: { name: any }, payload:any){
            state.name = payload
        }
    },
    actions: {
        saveName({commit}: { commit: Function }, data:any) {
            commit('SET_NAME', data)
        }

    },
}
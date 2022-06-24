export const setStolenState = ({commit}, payload) => {
    commit('stolenStateSync', payload)
}

export const setSaleState = ({commit}, payload) => {
    commit('saleStateSync', payload)
}

export const setSalePrice = ({commit}, payload) => {
    commit('salePriceSync', payload)
}

export const setEmail = ({commit}, payload) => {
    commit('emailSync', payload)
}
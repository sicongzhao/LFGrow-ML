import { createStore } from "vuex" 
// import { ethers } from "ethers";

const store = createStore({
  state:{
    account: 1,
    error: null,
    posts: null,
    filteredPosts: null,
    defaultAvatar: 'https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U'
  },
  getters: {
    account: (state) => state.account,
    error: (state) => state.error,
    posts: (state) => state.posts,
    filteredPosts: (state) => state.filteredPosts,
    defaultAvatar: (state) => state.defaultAvatar,
  },
  mutations: {
    setAccount(state, account) {
        state.account = account
    },
    setError(state, error) {
        state.error = error
    },
    setPosts(state, posts) {
        state.posts = posts
    },
    setFilteredPosts(state, filteredPosts) {
        state.filteredPosts = filteredPosts
    }
  },
  actions: {
    async updatePosts({commit}, posts) {
        console.log(posts)
        commit('setPosts', posts)
    },
    async updateFiltredPosts({commit}, filteredPosts) {
        commit('setFilteredPosts', filteredPosts)
    },
    async connect({commit, dispatch}, connect) {
      try {
        /**
        MetaMask injects a global API into websites visited by its users at window.ethereum.
        This part use argument destructuring to verify the existence of window.ethereum, thus check the connection status
        **/ 
        const { ethereum } = window;
        console.log(ethereum)
        if (!ethereum) {
          commit("setError", "Metamask is not installed")
          return
        }
        if (!(await dispatch('checkIfConnected')) && connect) {
          await dispatch('requestAccess')
        }
        await dispatch('checkNetwork')
      } catch (error) {
        commit('setError', 'Account request refused.')
      }
    },
    async checkNetwork({commit, dispatch}) {
      let chainId = await window.ethereum.request({ method: "eth_chainId"})
      console.log('Chain Id: ', chainId)
      const mumbaiChainId = '0x13881'
      if (chainId !== mumbaiChainId) {
        if (!(await dispatch('switchNetwork'))) {
          commit('setError', 'You are not connected to the Polygon Mumbai Network!')
        }
      }
    },
    async switchNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: '0x13881'}]
        })
        return 1
      } catch (switchError) {
        return 0
      }
    },
    async checkIfConnected({commit}) {
      // const {ethereum} = window
      const accounts = await window.ethereum.request({ method: 'eth_accounts'})
      if (accounts.length !== 0) {
        commit('setAccount', accounts[0])
        console.log(accounts[0])
        return 1
      } else {
        return 0
      }
    },
    async requestAccess({commit}) {
      // const {ethereum} = window
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      commit('setAccount', accounts[0])
    }
  }
})

export default store
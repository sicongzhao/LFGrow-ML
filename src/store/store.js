import { createStore } from "vuex" 
// import { ethers } from "ethers";

const store = createStore({
  state:{
    account: 1,
    error: null,
    posts: [],
    
    defaultAvatar: 'https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U',
    // for models
    postsCtt: [],
    postsIds: [],
    postDisplayAttr: [],
    filteredPosts: [],
    // filteredPostsUpdated: false,
  },
  getters: {
    account: (state) => state.account,
    error: (state) => state.error,
    posts: (state) => state.posts,
    defaultAvatar: (state) => state.defaultAvatar,
    postCts: (state) => state.postCts,
    postIds: (state) => state.postIds,
    postDisplayAttr: (state) => state.postDisplayAttr,
    filteredPosts: (state) => state.filteredPosts,
    // filteredPostsUpdated: (state) => state.filteredPostsUpdated,
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
    setPostCts(state, postCts) {
        state.postCts = postCts
    },
    setPostIds(state, postIds) {
        state.postIds = postIds
    },
    setPostDisplayAttr(state, postDisplayAttr) {
        state.postDisplayAttr = postDisplayAttr
    },
    setFilteredPosts(state, filteredPosts) {
        state.filteredPosts = filteredPosts
    },
    // setFilteredPostsUpdated(state, filteredPostsUpdated) {
    //     state.filteredPostsUpdated = filteredPostsUpdated
    // }
  },
  actions: {
    // functions that triggers mutations
    async updatePosts({commit}, posts) {
        commit('setPosts', posts)
    },
    async updatePostDisplayAttr({commit}, postDisplayAttr) {
        commit('setPostDisplayAttr', postDisplayAttr)
    },
    async updateFiltredPosts({commit}, filteredPosts) {
        commit('setFilteredPosts', filteredPosts)
    },
    async dataExtraction({commit}){
        console.log('store.js -> Extracting Data')
        let postCts = []
        let postIds = []
        this.getters.posts.forEach((element) => {
            postIds.push(element.id)
            if(element.__typename == 'Post') {
            postCts.push(element.metadata.content)
            } else if (element.__typename == 'Comment') {
            let ctt = element.metadata.content + ' ' + element.mainPost.metadata.content
            postCts.push(ctt)
            } else if (element.__typename == 'Mirror'){
            postCts.push(element.mirrorOf.metadata.content)
            }
        })
        commit('setPostCts', postCts)
        commit('setPostIds', postIds)
        console.log(postIds)
        // console.log(postCtt)
        return [postCts, postIds]
    },
    async initPostDisplayAttr({commit}){
        console.log('store.js -> Init Display Attributes')
        let pda = []
        this.getters.posts.forEach((element) => {
            let tempAttribute = {
                'id': element.id,
                'show': true,
                'recScore': 1,
                'reasons': {}
            }
            pda.push(tempAttribute)
        })
        console.log(pda)
        commit('setPostDisplayAttr', pda)
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
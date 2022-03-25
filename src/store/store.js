import { createStore } from "vuex" 
// import { ethers } from "ethers";

const store = createStore({
  state:{
    account: 1,
    error: null,
    posts: [],
    
    defaultAvatar: 'https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U',
    
    // data pipeline
    postsCtt: [],
    postsIds: [],
    postDisplayAttr: [],
    filteredPosts: [],
    hiddenPosts: [],

    // model status

    dataStatus: {
        'downloading': false,
        'postUpToDate': false,
    },
    /*
        modelStatus:
        * active: if model is activated
        * running: if model is running now
        * upToDate: if the result generated is based on the latest publication data
        * displayAttr: model processed display attributes
    */
    modelStatus: {
        'model1': {
            'name': 'Toxicity Detection Model',
            'active': false,
            'running': false,
            'upToDate': false,
            'displayAttr': []
        },
        'model2': {
            'name': 'Similarity Aggregator',
            'active': false,
            'running': false,
            'upToDate': false,
            'displayAttr': []
        }
    },

    // for data collection
    likedPosts: [],
    mutedPosts: [],

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
    hiddenPosts: (state) => state.hiddenPosts,
    likedPosts: (state) => state.likedPosts,
    mutedPosts: (state) => state.mutedPosts,
    dataStatus: (state) => state.dataStatus,
    modelStatus: (state) => state.modelStatus,
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
        console.log('setPosts started')
        state.posts = posts
        console.log('setPosts finished')
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
        console.log('setFilteredPosts started')
        state.filteredPosts = filteredPosts
        console.log('setFilteredPosts finished')
    },
    setHiddenPosts(state, hiddenPosts) {
        state.hiddenPosts = hiddenPosts
    },
    setLikedPosts(state, likedPosts) {
        state.likedPosts = likedPosts
    },
    setMutedPosts(state, mutedPosts) {
        state.mutedPosts = mutedPosts
    },
    // setFilteredPostsUpdated(state, filteredPostsUpdated) {
    //     state.filteredPostsUpdated = filteredPostsUpdated
    // }
  },
  actions: {
    // functions that triggers mutations
    async updatePosts({commit, dispatch}, posts) {
        this.state.dataStatus.postUpToDate = false
        this.state.dataStatus.downloading = true
        commit('setPosts', posts)
        commit('setFilteredPosts', posts)
        await dispatch('dataExtraction')
        await dispatch('initPostDisplayAttr')
        // reset model 'upToDate', because 'posts' changed
        for (let key in this.state.modelStatus) {
            this.state.modelStatus[key].upToDate = false
            this.state.modelStatus[key].displayAttr = await dispatch('initPostDisplayAttr')
        }
        commit('setPostDisplayAttr', await dispatch('initPostDisplayAttr'))
        // console.log(this.state.modelStatus)
        this.state.dataStatus.postUpToDate = true
        this.state.dataStatus.downloading = false
    },
    async updatePostDisplayAttr({commit}, postDisplayAttr) {
        commit('setPostDisplayAttr', postDisplayAttr)
    },
    async dataExtraction({commit}){
        console.log('dataExtraction started')
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
        console.log('dataExtraction ended')
        return [postCts, postIds]
    },
    async initPostDisplayAttr(){
        console.log('initPostDisplayAttr started')
        let pda = []
        this.getters.posts.forEach((element) => {
            let tempAttribute = {
                'id': element.id,
                'show': true,
                'recScore': 1,
                'reasons': []
            }
            pda.push(tempAttribute)
        })
        console.log('initPostDisplayAttr ended')
        return pda
    },
    async isModelRunning(){
        for (let key in this.state.modelStatus) {
            if (this.state.modelStatus[key].running && this.state.modelStatus[key].active) {
                return true
            }
        }
        return false
    },
    async updateView({dispatch, commit}) {
        // combine displayAttr in modelStatus
        // check modelStatus to make sure data processing ends
        let modelRunning = await dispatch('isModelRunning')
        if (modelRunning) {
            console.log('models are running, will process later')
            setTimeout(await dispatch('updateView'), 1000)
        } else {
            let pda = null
            for (let key in this.state.modelStatus) {
                if (this.state.modelStatus[key].active) {
                    if (pda == null) {
                        pda = this.state.modelStatus[key].displayAttr
                    } else {
                        pda.forEach((ele1)=>{
                            this.state.modelStatus[key].displayAttr.forEach((ele2)=>{
                                if (ele1.id == ele2.id) {
                                    ele1.show = ele1.show && ele2.show
                                    ele1.recScore *= ele2.recScore
                                    ele1.reasons = {...ele1.reasons, ...ele2.reasons}
                                }
                            })
                        })
                    }
                }
            }
            // console.log(pda)
            commit('setPostDisplayAttr', pda)
            let postsShow = []
            let postsHide = []
            this.state.posts.forEach((postElement, i)=>{
                if (pda[i].show) {
                    postElement['reasons'] = pda[i].reasons
                    postElement['recScore'] = pda[i].recScore
                    postsShow.push(postElement)
                } else {
                    postElement['reasons'] = pda[i].reasons
                    postElement['recScore'] = pda[i].recScore
                    postsHide.push(postElement)
                }
            })
            commit('setFilteredPosts', postsShow)
            commit('setHiddenPosts', postsHide)
        }
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
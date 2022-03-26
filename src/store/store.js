import { createStore } from "vuex" 
// import { ethers } from "ethers";

const store = createStore({
  state:{
    account: 1,
    error: null,
    posts: [],
    muteErrInfo: 'You hide this publication.',
    defaultAvatar: 'https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U',
    
    // data pipeline
    postsCtt: [],
    postsIds: [],
    postDisplayAttr: [],
    filteredPosts: [],
    hiddenPosts: [],

    // status
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
            'description': 'Detect toxic posts and remove them from your feed.',
            'active': false,
            'running': false,
            'upToDate': false,
            'displayAttr': []
        },
        'model2': {
            'name': 'Your Preference Model',
            'description': 'Trained in your browser. Deliver contents you like, privately.',
            'active': false,
            'running': false,
            'training': false,
            'savedAt': '',
            'upToDate': false,
            'displayAttr': []
        }
    },

    // training data
    likedPostIds: [],
    mutedPostIds: [],
    newTrainPostIds: [], // keep track of newly generated training data
    trainRaw: [],
    trainX: [],
    trainY: [],

    // Watchers
    /*
        trainDataIds: used as a way for Feed.vue to trigger a method in Init.vue
                            when activating model2 in Feed.vue, trainDataIds get updated
                            the watch in Init.vue will trigger the Lens-API request
        
        trainRaw: triggers model2_2() in Feed.vue by the event sent inside 
                            getPublicationsByPublicationIds() from Init.vue. This indicates 
                            publications used for model training are downloaded.
        
        updateTriggerViewUpdate: models change this value, and the feed got changed by a watcher calling updateView 
                            Model knows when to update a view
    */
    trainDataIds: [],
    initModelStatus: false,
    // triggerViewUpdate: false,


    // filteredPostsUpdated: false,

    
  },
  getters: {
    account: (state) => state.account,
    error: (state) => state.error,
    posts: (state) => state.posts,
    muteErrInfo: (state) => state.muteErrInfo,
    defaultAvatar: (state) => state.defaultAvatar,
    postCts: (state) => state.postCts,
    postIds: (state) => state.postIds,
    postDisplayAttr: (state) => state.postDisplayAttr,
    filteredPosts: (state) => state.filteredPosts,
    hiddenPosts: (state) => state.hiddenPosts,
    likedPostIds: (state) => state.likedPostIds,
    mutedPostIds: (state) => state.mutedPostIds,
    newTrainPostIds: (state) => state.newTrainPostIds,
    dataStatus: (state) => state.dataStatus,
    modelStatus: (state) => state.modelStatus,
    trainRaw: (state) => state.trainRaw,
    trainX: (state) => state.trainX,
    trainY: (state) => state.trainY,
    trainDataIds: (state) => state.trainDataIds,
    initModelStatus: (state) => state.initModelStatus,
    // triggerViewUpdate: (state) => state.triggerViewUpdate,
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
    setHiddenPosts(state, hiddenPosts) {
        state.hiddenPosts = hiddenPosts
    },
    setLikedPostIds(state, likedPostIds) {
        state.likedPostIds = likedPostIds
    },
    setMutedPostIds(state, mutedPostIds) {
        state.mutedPostIds = mutedPostIds
    },
    setNewTrainPostIds(state, newTrainPostIds){
        state.newTrainPostIds = newTrainPostIds
    },
    setTrainRaw(state, trainRaw) {
        state.trainRaw = trainRaw
    },
    setTrainX(state, trainX) {
        state.trainX = trainX
    },
    setTrainY(state, trainY) {
        state.trainY = trainY
    },
    setTrainDataIds(state, trainDataIds) {
        state.trainDataIds = trainDataIds
    },
    setInitModelStatus(state, initModelStatus) {
        state.initModelStatus = initModelStatus
    },
    // setTriggerViewUpdate(state) {
    //     state.triggerViewUpdate = !state.triggerViewUpdate
    // },
    setModelStatus(state, modelStatus) {
        state.modelStatus = modelStatus
    },
    setModelStatusValue(state, param) {
        state.modelStatus[param[0]][param[1]] = param[2]
        const modelStatus_ = {
            'model1': {
                'name': state.modelStatus.model1.name,
                'description': 'Detect toxic posts and remove them from your feed.',
                'active': state.modelStatus.model1.active,
                'running': state.modelStatus.model1.active, // if model active, then it will be running on loading
                'upToDate': false,
                'displayAttr': []
            },
            'model2': {
                'name': state.modelStatus.model2.name,
                'description': 'Trained in your browser. Deliver contents you like, privately.',
                'active': state.modelStatus.model2.active,
                'running': state.modelStatus.model2.active, // if model active, then it will be running on loading
                'training': false,
                'savedAt': state.modelStatus.model2.savedAt,
                'upToDate': false,
                'displayAttr': []
            }
        }
        localStorage.setItem('modelStatus_', JSON.stringify(modelStatus_))
    }
    // setFilteredPostsUpdated(state, filteredPostsUpdated) {
    //     state.filteredPostsUpdated = filteredPostsUpdated
    // }
  },
  actions: {
    // functions that triggers mutations
    async updatePosts({commit, dispatch}, posts) {
        /* only triggers at loading, so it also initialize the status of this web app */
        this.state.dataStatus.postUpToDate = false
        this.state.dataStatus.downloading = true
        commit('setPosts', posts)
        commit('setFilteredPosts', posts)
        await dispatch('dataExtraction')
        // await dispatch('initPostDisplayAttr')
        // reset model 'upToDate', because 'posts' changed
        const likedPostIds_ = localStorage.getItem('likedPostIds_')
        commit('setLikedPostIds', likedPostIds_===null?[]:JSON.parse(likedPostIds_))
        const mutedPostIds_ = localStorage.getItem('mutedPostIds_')
        commit('setMutedPostIds', mutedPostIds_===null?[]:JSON.parse(mutedPostIds_))
        const newTrainPostIds_ = localStorage.getItem('newTrainPostIds_')
        commit('setNewTrainPostIds', newTrainPostIds_===null?[]:JSON.parse(newTrainPostIds_))
        const modelStatus_ = localStorage.getItem('modelStatus_')

        if (modelStatus_!==null) {
            commit('setModelStatus', JSON.parse(modelStatus_))
        }
        for (let key in this.state.modelStatus) {
            this.state.modelStatus[key].displayAttr = await dispatch('initPostDisplayAttr')
        }
        
        commit('setPostDisplayAttr', await dispatch('initPostDisplayAttr'))
        this.state.dataStatus.postUpToDate = true
        this.state.dataStatus.downloading = false
        commit('setInitModelStatus', true)
        // init post based on model status
    },
    async updatePostDisplayAttr({commit}, postDisplayAttr) {
        commit('setPostDisplayAttr', postDisplayAttr)
    },
    async updateNewTrainPostIds({commit}, newTrainPostIds) {
        commit('setNewTrainPostIds', newTrainPostIds)
    },
    async updateTrainRaw({commit}, trainRaw) {
        commit('setTrainRaw', trainRaw)
    },
    async updateTrainX({commit}, trainX) {
        commit('setTrainX', trainX)
    },
    async updateTrainY({commit}, trainY) {
        commit('setTrainY', trainY)
    },
    async updateTrainDataIds({commit}, trainDataIds) {
        commit('setTrainDataIds', trainDataIds)
    },
    async updateInitModelStatus({commit}, initModelStatus) {
        commit('setInitModelStatus', initModelStatus)
    },
    // async updateTriggerViewUpdate({commit}, triggerViewUpdate) {
    //     commit('setTriggerViewUpdate', triggerViewUpdate)
    // },
    async updateModelStatus({commit}, modelStatus) {
        commit('setModelStatus', modelStatus)
    },
    async updateModelStatusValue({commit}, param) {
        commit('setModelStatusValue', param)
    },
    async dataExtraction({commit}){
        // console.log('dataExtraction started')
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
        // console.log('dataExtraction ended')
        return [postCts, postIds]
    },
    async initPostDisplayAttr(){
        // console.log('initPostDisplayAttr started')
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
        // console.log('initPostDisplayAttr ended')
        return pda
    },
    async updateView({commit, dispatch}) {
        console.log('666 updating view')
        let pda = await dispatch('initPostDisplayAttr')
        for (let key in this.state.modelStatus) {
            if (this.state.modelStatus[key].active) {
                if (pda == null) {
                    console.log('pda is not supposed to be null. check it:)')
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
        if (pda == null) {
            console.log('pda is not supposed to be null. check it:)')
            pda = await dispatch('initPostDisplayAttr')
            commit('setPostDisplayAttr', pda)
        } else {
            commit('setPostDisplayAttr', pda)
        }
        let postsShow = []
        let postsHide = []
        let that = this
        this.state.posts.forEach((postElement, i)=>{
            if (pda[i].show && !that.state.mutedPostIds.includes(postElement.id)) {
                postElement['reasons'] = pda[i].reasons
                postElement['recScore'] = pda[i].recScore
                postsShow.push(postElement)
            } else {
                if(that.state.mutedPostIds.includes(postElement.id)){
                    if(Array.isArray(pda[i].reasons)){
                        pda[i].reasons.push(that.state.muteErrInfo)
                    } else if (Object.keys(pda[i].reasons).length === 0) {
                        pda[i].reasons = [that.state.muteErrInfo]
                    } else {
                        pda[i].reasons[Object.keys(pda[i].reasons).length] = that.state.muteErrInfo
                    }
                }
                postElement['reasons'] = pda[i].reasons
                postElement['recScore'] = pda[i].recScore
                postsHide.push(postElement)
            }
        })
        commit('setFilteredPosts', postsShow)
        commit('setHiddenPosts', postsHide)
        
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
<template>
  <div class="flex max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="w-44 min-w-fit flex-none">
        <div class="fixed flex-auto w-44 p-3">
            <img class="w-10" src="../assets/logo.svg" alt="">
            <div class="inline-flex h-10 w-full justify-items-start items-center py-1 my-1 mt-10 pl-5 -ml-9 text-xl text-theme-color-1 font-bold rounded-full hover:bg-gray-100 cursor-pointer">
                Home
            </div>
            <div class="inline-flex h-10 w-full justify-items-start items-center py-1 my-1 pl-5 -ml-9 text-xl font-bold rounded-full hover:bg-gray-100 cursor-pointer">
                Explore
            </div>
            <div class="inline-flex h-10 w-full justify-items-start items-center py-1 my-1 pl-5 -ml-9 text-xl font-bold rounded-full hover:bg-gray-100 cursor-pointer">
                More
            </div>
        </div>
    </div>
    <div class="flex-col flex grow flex-auto max-w-xl mt-0 mb-10">
        <div class="text-left text-xl font-bold p-4 mt-1">
            Feed
        </div>
        <!-- The publication thread -->
        <Post />
    </div>
    <div class="max-w-lg min-w-fit w-96 flex-none">
        <div class="fixed max-w-lg min-w-fit w-96 flex-auto">
            <div class="w-full sm:max-w-xs mt-3 mx-auto">
                <label for="Search" class="sr-only">Search</label>
                <input type="text" class="h-9 shadow-ct ring-0 border-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm ring-gray-100 rounded-lg pl-3" placeholder="   Search" />
            </div>
            <div :class="[!enabled_1&&!enabled_2?'bg-theme-color-3':'',enabled_1&&!enabled_2?'bg-gradient-to-b from-white to-theme-color-3':'',!enabled_1&&enabled_2?'bg-gradient-to-t from-white to-theme-color-3':'', enabled_1&&enabled_2?'bg-white':'','w-full flex-col flex items-center shadow-ct sm:max-w-xs mt-5 mx-auto py-3 rounded-lg relative overflow-hidden']">
                <!-- Bg start -->
                <div class="absolute -top-10 -left-14 w-60 h-60 bg-sec-color-1 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob -z-1 transitionfix" v-if="enabled_1"></div>
                <div class="absolute -top-24 left-10 w-60 h-60 bg-sec-color-2 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 -z-1" v-if="enabled_1"></div>
                <div class="absolute -top-16 left-32 w-60 h-60 bg-sec-color-3 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 -z-1" v-if="enabled_1"></div>
                <div class="absolute -bottom-20 -left-14 w-60 h-60 bg-sec-color-4 rounded-full mix-blend-multiply filter blur-xl opacity-90 animate-blob animation-delay-2000 -z-1" v-if="enabled_2"></div>
                <div class="absolute -bottom-24 left-10 w-60 h-60 bg-sec-color-5 rounded-full mix-blend-multiply filter blur-xl opacity-90 animate-blob animation-delay-4000 -z-1" v-if="enabled_2"></div>
                <div class="absolute -bottom-32 left-42 w-72 h-72 bg-sec-color-6 rounded-full mix-blend-multiply filter blur-xl opacity-90 animate-blob -z-1" v-if="enabled_2"></div>
                <!-- Bg end -->
                <div :class="[enabled_1?'text-white':'text-white', 'flex text-left w-full px-4 py-1 pb-2 font-bold relative']">🔒 Private Models</div>
                <div class="w-11/12 rounded-lg relative">
                    <SwitchGroup as="div" class="flex items-center text-left justify-between p-3 my-2 bg-white rounded-lg z-10 shadow-ct">
                        <span class="flex-grow flex flex-col">
                        <SwitchLabel as="span" class="text-sm font-medium text-gray-900" passive>{{modelStatus.model1.name}}</SwitchLabel>
                        <SwitchDescription as="span" class="text-sm text-gray-500">{{modelStatus.model1.description}}</SwitchDescription>
                        </span>
                        <Switch v-model="enabled_1" @click="runModel1()" :class="[enabled_1 ? 'bg-sec-color-3' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sec-color-3']">
                        <span aria-hidden="true" :class="[enabled_1 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                        </Switch>
                    </SwitchGroup>
                    <!-- Should be disabled if no training data -->
                    <div class="bg-white rounded-lg flex-col shadow-ct">
                        <SwitchGroup as="div" class="flex items-center text-left justify-between p-3 my-2 ">
                            <span class="flex-grow flex flex-col">
                                <SwitchLabel as="span" class="text-sm font-medium text-gray-900" passive>{{modelStatus.model2.name}}</SwitchLabel>
                                <SwitchDescription as="span" class="text-sm text-gray-500">{{modelStatus.model2.description}}</SwitchDescription>
                            </span>
                            <Switch v-model="enabled_2" @click="runModel2()" :class="[enabled_2 ? 'bg-sec-color-3' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sec-color-3']">
                            <span aria-hidden="true" :class="[enabled_2 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                            </Switch>
                        </SwitchGroup>

                        <div class="flex items-center text-left justify-between text-xs p-3 mb-2 bg-gray-100 rounded-bl-lg rounded-br-lg">
                            <div class="flex-grow flex flex-col text-theme-color-3">
                                Updated at: {{modelStatus.model2.savedAt.slice(0,10)}}
                                <br>
                                {{newTrainPostIds.length}} new records for training
                            </div>
                            <div class="inline-flex flex-shrink-0 h-6 w-11 bg-sec-color-3 text-white items-center justify-center cursor-pointer rounded-md" @click="reTrainModel2()" v-if="newTrainPostIds.length>0">Retrain</div>
                            <div class="text-left text-theme-color-1" v-else>{{model2StatusText}}</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Post from './Post.vue'
import { ref } from 'vue'
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'

// Import ML related modules
require('@tensorflow/tfjs');
import * as tf from '@tensorflow/tfjs';
const use = require('@tensorflow-models/universal-sentence-encoder');
const toxicity = require('@tensorflow-models/toxicity');
import { toRaw } from 'vue'

export default {
    name: 'Feed',
    components: {
        Post,
        Switch,
        SwitchDescription,
        SwitchGroup,
        SwitchLabel,
    },
    setup() {
        const enabled_1 = ref(false)
        const enabled_2 = ref(false)
        return {
            enabled_1,
            enabled_2,
        }
    },
    data(){
        return{
            model2: null,
            model2TrainingUpdate: false,
            model2StatusText: '',
            // model2InferenceDataReady: false,
        }
    },
    computed: {
        ...mapGetters([
            'posts',
            'postIds',
            'postCts',
            'postDisplayAttr',
            'filteredPosts',
            'likedPostIds',
            'mutedPostIds',
            'muteErrInfo',
            'newTrainPostIds',
            'modelStatus',
            'trainRaw',
            'trainDataIds',
            'initModelStatus',
            // 'triggerViewUpdate'
        ]),
        trainingDataLength(){
            return this.likedPostIds.length+ this.mutedPostIds.length
        },
    },
    watch: {
        trainRaw () {
            // console.log('trainRaw updated!')
            this.trainModel2(this.trainRaw, this.modelStatus.model2.active)
        },
        model2TrainingUpdate () {
            // console.log('model2 training ended!',this.model2TrainingUpdate)
            let that = this
            if (this.modelStatus.model2.training){
                this.model2StatusText = 'traing...'
            } else {
                this.model2StatusText = 'success!'
                setTimeout(function(){that.model2StatusText = ''}, 1.5*1000)
            }
        },
        initModelStatus () {
            /*  Initialize modelStatus when mounted */
            // console.log('initModelStatus changed!')
            this.enabled_1 = this.modelStatus.model1.active
            this.enabled_2 = this.modelStatus.model2.active
            if (this.enabled_1) {
                console.log('model1 is triggered')
                console.log(this.modelStatus)
                this.runModel1()
            }
            // keep adding model2
            this.loadModel2()


            this.updateView()
        },
        // triggerViewUpdate () {
        //     console.log('triggerViewUpdate')
        //     this.updateView()
        // }
    },
    methods: {
        // trigger functions defined in store.js
        async initPostDisplayAttr() {
            await this.$store.dispatch('initPostDisplayAttr')
        },
        async updatePostDisplayAttr(postDisplayAttr) {
            await this.$store.dispatch('updatePostDisplayAttr', postDisplayAttr)
        },
        async clearTrainPostIds() {
            await this.$store.dispatch('updateNewTrainPostIds', [])
            localStorage.setItem('newTrainPostIds_','[]')
        },
        async updateView(){
            await this.$store.dispatch('updateView')
        },
        async updateTrainDataIds(value){
            await this.$store.dispatch('updateTrainDataIds', value)
        },
        // async updateTriggerViewUpdate(){
        //     await this.$store.dispatch('updateTriggerViewUpdate')
        // },
        async updateModelStatusValue(modelId, key, value){
            await this.$store.dispatch('updateModelStatusValue', [modelId, key, value])
        },
        // model2Status(){

        // },
        // model1 - toxicity detection
        async runModel1(){
            // check and update the model status
            this.updateModelStatusValue('model1','active',this.enabled_1)
            if (!this.enabled_1) {
                console.log('Toxicity Detection Model is not active.')
                this.modelStatus.model1.displayAttr.forEach((ele)=>{
                    ele.show = true
                })
                this.updateModelStatusValue('model1','upToDate',false)
                this.updateView()
                return
            } else if (this.modelStatus.model1.upToDate) {
                console.log('Toxicity Detection Model is up-to-date, update the view.')
                this.updateView()
                return
            } else {
                // console.log(this.modelStatus.model1.upToDate)
                console.log('Toxicity Detection Model running.')
                this.updateModelStatusValue('model1','running',true)
                this.updateModelStatusValue('model1','upToDate',false)
                // assign variables
                let that = this
                let modelName = this.modelStatus.model1.name
                const threshold = 0.93;
                toxicity.load(threshold).then(model => {
                    model.classify(that.postCts).then(predictions => {
                        // console.log(predictions)
                        // update the postDisplayAttr
                        // clear reasons
                        that.modelStatus.model1.displayAttr.forEach(ele=>{
                            ele.reasons = []
                        })
                        predictions.forEach((prediction)=>{
                            // console.log(prediction.results.length)
                            let submodule = prediction.label
                            prediction.results.forEach((predictedValue, i)=>{
                                // console.log(predictedValue, i)
                                if (predictedValue.match != false){
                                    that.modelStatus.model1.displayAttr[i].show = false
                                    that.modelStatus.model1.displayAttr[i].reasons.push(submodule)
                                }
                                that.modelStatus.model1.displayAttr[i].recScore *= predictedValue.probabilities[0]
                            })
                        })
                        that.modelStatus.model1.displayAttr.forEach((ele)=>{
                            if (ele.show == false) {
                                ele.reasons = ['Hide by ' + modelName + ' due to ' + ele.reasons.join(', ') + ' in this content.']
                            }
                        })
                        // console.log(that.modelStatus.model1.displayAttr)
                        console.log('Toxicity Detection Model made predictions!')
                        // update the model status
                        that.updateModelStatusValue('model1','running',false)
                        that.updateModelStatusValue('model1','upToDate',true)
                        that.updateView()
                    })
                })
                
            }
        },

        loadModel2 () {
            let that = this
            if (localStorage.getItem("tensorflowjs_models/model2_/info") === null){
                console.log('Initiate Preference Model')
                this.trainModel2(this.posts)
            } else {
                console.log('Loading Preference Model from localStorage')
                tf.loadLayersModel('localstorage://model2_').then(model=>{
                    that.model2 = model
                })
                const model2Info = localStorage.getItem('tensorflowjs_models/model2_/info')
                this.updateModelStatusValue('model2', 'savedAt', JSON.parse(model2Info).dateSaved)
            }
            // trigger on loading
            this.useModel2(this.posts)
        },

        useModel2 (posts) {
            let shouldBeMoreThanThisToBeVisible = 0.48 // can you get my feeling?
            let postCts = []
            let postIds = []
            let postStats = []
            posts.forEach((element) => {
                postIds.push(element.id)
                let publicationTypeEncoder // [if post, if comment, if mirror]
                if(element.__typename == 'Post') {
                    postCts.push(element.metadata.content)
                    publicationTypeEncoder = [1,0,0] 
                } else if (element.__typename == 'Comment') {
                    let ctt = element.metadata.content + ' ' + element.mainPost.metadata.content
                    publicationTypeEncoder = [0,1,0] 
                    postCts.push(ctt)
                } else if (element.__typename == 'Mirror'){
                    postCts.push(element.mirrorOf.metadata.content)
                    publicationTypeEncoder = [0,0,1] 
                }
                postStats.push([element.stats.totalAmountOfCollects, element.stats.totalAmountOfComments, element.stats.totalAmountOfMirrors, ...publicationTypeEncoder])
            })
            let that = this
            let rawX = []
            use.load().then(model => {
                model.embed(postCts).then(embeddings => {
                    const postCtsEmbedding = embeddings.arraySync()
                    // combine feature matrix
                    postCtsEmbedding.forEach((ele, index)=>{
                        rawX.push([...postStats[index], ...ele])
                    })
                    return tf.tensor2d(rawX)
                }).then(data=>{
                    let rawModel2 = toRaw(that.model2)
                    const prediction = rawModel2.predict(data).arraySync()
                    prediction.forEach((pred, index)=>{
                        // console.log(pred, index, postIds[index])
                        // console.log(that.modelStatus.model2.displayAttr[index])
                        if(pred[0]<shouldBeMoreThanThisToBeVisible){
                            that.modelStatus.model2.displayAttr[index].show = false
                            that.modelStatus.model2.displayAttr[index].reasons = ['Blocked by '+that.modelStatus.model2.name + ', learned from your viewing history.']
                        }
                        that.modelStatus.model2.displayAttr[index].recScore = pred[0]
                    })
                    // console.log(that.modelStatus.model2.displayAttr)
                    console.log('Preference Model made predictions.')
                    // update the model status
                    that.updateModelStatusValue('model2','running',false)
                    that.updateModelStatusValue('model2','upToDate',true)
                    that.updateView()
                })
            })
        },

        trainModel2 (posts, applyModel2=false) {
            let postCts = []
            let postIds = []
            let postStats = []
            posts.forEach((element) => {
                postIds.push(element.id)
                let publicationTypeEncoder // [if post, if comment, if mirror]
                if(element.__typename == 'Post') {
                    postCts.push(element.metadata.content)
                    publicationTypeEncoder = [1,0,0] 
                } else if (element.__typename == 'Comment') {
                    let ctt = element.metadata.content + ' ' + element.mainPost.metadata.content
                    publicationTypeEncoder = [0,1,0] 
                    postCts.push(ctt)
                } else if (element.__typename == 'Mirror'){
                    postCts.push(element.mirrorOf.metadata.content)
                    publicationTypeEncoder = [0,0,1] 
                }
                postStats.push([element.stats.totalAmountOfCollects, element.stats.totalAmountOfComments, element.stats.totalAmountOfMirrors, ...publicationTypeEncoder])
            })

            let that = this
            let rawX = []
            let rawY = []
            use.load().then(model => {
                model.embed(postCts).then(embeddings => {
                    const postCtsEmbedding = embeddings.arraySync()

                    postCtsEmbedding.forEach((ele, index)=>{
                        // combine feature matrix
                        rawX.push([...postStats[index], ...ele])
                        // generate label
                        let postId = postIds[index]
                        if (that.likedPostIds.includes(postId)){
                            rawY.push([1,0])
                        } else if (that.mutedPostIds.includes(postId)){
                            rawY.push([0,1])
                        } else {
                            console.log('untracked posts')
                            rawY.push([0.5,0.5])
                        }
                    })
                    let trainX = tf.tensor2d(rawX)
                    let trainY = tf.tensor2d(rawY)
                    return [trainX, trainY]
                }).then(data => {
                    let trainX = data[0]
                    let trainY = data[1]
                    let model2 = tf.sequential()
                    let dim = trainX.shape[1]
                    let records = trainX.shape[0]

                    // dynamic model structure based on data size
                    if (records < 6) {
                        model2.add(
                            tf.layers.dense({units: 2, activation: "softmax", inputShape: [dim]})
                        )
                    } else if( records < 10000) {
                        model2.add(
                            tf.layers.dense({units: 32, activation: 'relu', inputShape: [dim]}),
                        )
                        model2.add(
                            tf.layers.dense({units: 2, activation: "softmax", inputShape: [32]})
                        )
                    } else {
                        model2.add(
                            tf.layers.dense({units: 32, activation: 'relu', inputShape: [dim]}),
                        )
                        while (records > 10000) {
                            model2.add(
                                tf.layers.dense({units: 32, activation: 'relu', inputShape: [32]}),
                            )
                            records /= 2
                        }
                        model2.add(
                            tf.layers.dense({units: 2, activation: "softmax", inputShape: [32]})
                        )
                    }
                    
                    model2.summary()
                    
                    model2.compile({
                        optimizer: tf.train.adam(0.001),
                        loss: 'binaryCrossentropy',
                        metrics: ['accuracy']
                    })
                    model2.fit(trainX, trainY, {
                        epochs: 15,
                        batchSize: 32,
                        callbacks: {
                            function (batch, logs){
                                console.log(batch, ': accuracy', logs.acc)
                            }
                        }
                    }).then(info => {
                        console.log('Final accuracy', info.history.acc);
                        that.model2TrainingUpdate = !that.model2TrainingUpdate
                        that.updateModelStatusValue('model2', 'training', false)
                    });
                    // model2.save('downloads://model2')
                    model2.save('localstorage://model2_').then(()=>{
                        console.log('model2 saved to localStorage')
                    })
                    that.model2 = model2
                    if(applyModel2){
                        console.log('run model2 here')
                    }
                })
            })
        },

        reTrainModel2 () {
            // when training ends, if model2 is active, apply the model
            this.updateModelStatusValue('model2', 'training', true)
            this.model2TrainingUpdate = !this.model2TrainingUpdate
            this.updateTrainDataIds([...this.likedPostIds,...this.mutedPostIds])
            console.log(this.trainRaw)
            this.clearTrainPostIds()
        },

        runModel2 () {
            this.updateModelStatusValue('model2','active',this.enabled_2)
            if (!this.enabled_2) {
                console.log('Preference Model is deactivated. Update the feed.')
                this.modelStatus.model2.displayAttr.forEach((ele)=>{
                    ele.show = true
                })
                this.updateModelStatusValue('model2','upToDate',false)
                this.updateView()
                return
            } else if (this.modelStatus.model2.upToDate) {
                console.log('Preference Model is up-to-date. Update the feed.')
                this.updateView()
                return
            } else {
                console.log(this.modelStatus.model2.upToDate)
                console.log('model2 starts processing')
                this.updateModelStatusValue('model2','running',true)
                this.updateModelStatusValue('model2','upToDate',false)
                this.useModel2(this.posts)
                console.log('model2 end processing')
            }
        },
        

        // async model2_1(){
        //     this.updateModelStatusValue('model2','active', this.enabled_2)
        //     if (!this.enabled_2) {
        //         console.log('Preference Model is deactivated. Update the view.')
        //         this.updateView()
        //         return
        //     } else if (this.modelStatus.model2.upToDate) {
        //         console.log('Preference Model is up-to-date. Update the view.')
        //         this.updateView()
        //         return
        //     } else {
        //         this.updateModelStatusValue('model2','running',true)
        //         this.updateModelStatusValue('model2','upToDate',false)
        //         // update 'trainDataIds' to trigger 'getPublicationsByPublicationIds' in Init.vue
        //         this.updateTrainDataIds([...this.likedPostIds,...this.mutedPostIds])
        //     }
        // },
        // async model2_2(){
        //     console.log('model2_2 started')
        //     console.log(this.trainRaw)
        //     // extract content, use dataExtraction (need some modification)
        //     let postCts = []
        //     let postIds = []
        //     let postStats = []
        //     this.trainRaw.forEach((element) => {
        //         postIds.push(element.id)
        //         let publicationTypeEncoder // [if post, if comment, if mirror]
        //         if(element.__typename == 'Post') {
        //             postCts.push(element.metadata.content)
        //             publicationTypeEncoder = [1,0,0] 
        //         } else if (element.__typename == 'Comment') {
        //             let ctt = element.metadata.content + ' ' + element.mainPost.metadata.content
        //             publicationTypeEncoder = [0,1,0] 
        //             postCts.push(ctt)
        //         } else if (element.__typename == 'Mirror'){
        //             postCts.push(element.mirrorOf.metadata.content)
        //             publicationTypeEncoder = [0,0,1] 
        //         }
        //         postStats.push([element.stats.totalAmountOfCollects, element.stats.totalAmountOfComments, element.stats.totalAmountOfMirrors, ...publicationTypeEncoder])
        //     })
        //     // console.log(postCts)
        //     // console.log(postIds)
        //     // console.log(postStats)

        //     // prepare training data
        //     // sentence encoding
        //     let that = this
        //     let rawX = []
        //     let rawY = []
        //     use.load().then(model => {
        //         model.embed(postCts).then(embeddings => {
        //             const postCtsEmbedding = embeddings.arraySync()
        //             // combine feature matrix
        //             postCtsEmbedding.forEach((ele, index)=>{
        //                 // const sum = ele.reduce((partialSum, a) => partialSum + a, 0);
        //                 // console.log(Math.max(...ele),Math.min(...ele), sum)
        //                 rawX.push([...postStats[index], ...ele])
        //                 let postId = postIds[index]
        //                 if (that.likedPostIds.includes(postId)){
        //                     rawY.push([1,0])
        //                 } else if (that.mutedPostIds.includes(postId)){
        //                     rawY.push([0,1])
        //                 } else {
        //                     rawY.push([0.5,0.5])
        //                     console.log('error: a post not in likedPostIds nor mutedPostIds')
        //                 }
        //             })
        //             // console.log(rawY)
        //             // console.log(rawX)
        //             let trainX = tf.tensor2d(rawX)
        //             let trainY = tf.tensor2d(rawY)
        //             console.log(trainX)
        //             console.log(trainY)
        //             // training data is ready.
        //             // turn data into tensors and train model
        //             this.model2 = tf.sequential({
        //                 layers:[
        //                     tf.layers.dense({units: 2, activation: "softmax", inputShape: [518]})
        //                 ]
        //             })
        //             this.model2.compile({
        //                 optimizer: tf.train.adam(0.001),
        //                 loss: 'binaryCrossentropy',
        //                 metrics: ['accuracy']
        //             })
        //             this.model2.fit(trainX, trainY, {
        //                 epochs: 20,
        //                 batchSize: 32,
        //                 callbacks: {
        //                     function (batch, logs){
        //                         console.log(batch, ': accuracy', logs.acc)
        //                     }
        //                 }
        //             }).then(info => {
        //                 console.log('Final accuracy', info.history.acc);
        //                 that.model2TrainingUpdate = !that.model2TrainingUpdate
        //             });
        //             // const saveResult = model.save('localstorage://my-model-1')
        //             // saveResult.then((result)=>{
        //             //     console.log(result)
        //             // })
        //             // const model2Loaded = tf.loadLayersModel('localstorage://my-model-1')
        //             // model2Loaded.then((result)=>{
        //             //     console.log(result)
        //             // })

        //         });
        //     });
        //     // prepare tensors

        // },
        // async trainLogisticRegression (featureCount, trainDs, validDs) {
        //     const model = tf.sequential();
        //     model.add(
        //         tf.layers.dense({
        //         units: 2,
        //         activation: "softmax",
        //         inputShape: [featureCount]
        //         })
        //     );
        //     const optimizer = tf.train.adam(0.001);
        //     model.compile({
        //         optimizer: optimizer,
        //         loss: "binaryCrossentropy",
        //         metrics: ["accuracy"]
        //     });
        //     const trainLogs = [];
        //     // const lossContainer = document.getElementById("loss-cont");
        //     // const accContainer = document.getElementById("acc-cont");
        //     console.log("Training...");
        //     await model.fitDataset(trainDs, {
        //         epochs: 100,
        //         validationData: validDs,
        //         callbacks: {
        //         onEpochEnd: async (epoch, logs) => {
        //             console.log(epoch, logs)
        //             trainLogs.push(logs);
        //             // tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
        //             // tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
        //         }
        //         }
        //     });

        //     return model;
        // },
        
        

        // debug. delete later
        // debug(){
        //     // console.log(localStorage)
        //     // this.loadModel2()
        //     // this.reTrainModel2()
        //     // this.useModel2(this.posts)
        //     // this.trainModel2(this.posts)
        //     // this.updateView()
        //     // this.runModel2()
        //     // console.log(this.trainRaw)
        //     // this.updateTrainDataIds(this.trainDataIds+1)
        // }
    },
    mounted () {
        
    }
}

</script>
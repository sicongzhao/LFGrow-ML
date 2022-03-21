import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store"
import './assets/tailwind.css'

createApp(App).use(store).mount('#app')
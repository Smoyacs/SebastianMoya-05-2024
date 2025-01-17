import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { createPinia } from 'pinia'


const app = createApp(App)
app.use(router)
app.use(createPinia()) // Usa Pinia
app.mount('#app')

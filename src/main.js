import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)
app
    .use(pinia)
    .use(router)
setActivePinia(pinia)
pinia.use(piniaPluginPersistedstate)

app.mount('#app')

import components from '@/components/UI/index.js'
components.forEach((component) => {
    app.component(component.name, component)
})
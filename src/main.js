import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'
import App from './App.vue'
import components from '@/components/UI/index.js'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

components.forEach((component) => {
	app.component(component.name, component)
})
app.use(pinia)
app.use(router)
app.mount('#app')

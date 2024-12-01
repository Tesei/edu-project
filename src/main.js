import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import components from '@/components/UI/index.js'

const pinia = createPinia()
const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});
app.use(pinia)
app.use(router)
app.mount('#app')

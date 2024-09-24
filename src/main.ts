import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import CountryPage from './pages/CountryPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/country/:id', component: CountryPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')

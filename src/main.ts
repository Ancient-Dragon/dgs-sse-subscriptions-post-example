import { createApp } from 'vue'
import App from './App.vue'
import Query from "./Query.vue";
import Mutation from "./Mutation.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import Home from "./Home.vue";
import AppWrapper from "./AppWrapper.vue";

const routes = [
    {path: '/test', component: Home},
    { path: '/app', component: AppWrapper, children: [
            { path: '/about', component: Mutation },
            { path: '/query', component: Query }] },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router);

app.mount('#app')
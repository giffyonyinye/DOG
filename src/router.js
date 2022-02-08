import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'dogList', component:() => import("./components/RandomDogList.vue")},
    {path: '/dogInfo:id', name: 'dogInfo', component:() => import("./components/DogInfo.vue"), props:true},
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
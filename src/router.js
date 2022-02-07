import {createRouter, createWebHistory} from "vue-router";
import RandomDogList from './components/RandomDogList';
import DogInfo from './components/DogInfo';



const routes = [
    {path: '/', name: 'dogList', component: RandomDogList},
    {path: '/dogInfo', name: 'dogs', component: DogInfo},
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
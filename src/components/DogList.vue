<template>
    <div>
        <div  style="display:flex; flex-wrap:wrap; justify-content: space-evenly;  ">
            <div  v-for="dog in dogs" :key="dog" >
                <img style="width:20rem; height:20rem; margin-top:2rem; border-radius:1rem" :src="dog" alt="dogs" loading="lazy">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {baseUrl} from '../config';
const url = baseUrl;
export default {
    data() {
        return {
            dogs: []
        }
    },

    mounted() {
        this.dogList();
    },

    methods: {

        dogList() {
               
                axios({
                    method: "GET",
                    url: `${url}/breed/hound/images`,
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((res) => {
                    let dog = res.data.message;
                    this.dogs = dog.slice(0,99)
                })
    
            },
    }
}
</script>
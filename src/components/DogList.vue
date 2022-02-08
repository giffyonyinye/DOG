<template>
    <div>
        <!-- THIS IS THE LIST OF DOGS AND ALSO SHOWS DOG INFORMATION WHEN CLICKED -->
        <div  style="display:flex; flex-wrap:wrap; justify-content: space-evenly;  ">
            <router-link :to="{name: 'dogInfo', params: {id:index, image:dog}}" v-for="(dog,index) in this.$store.state.dogList" :key="dog" >
                <img style="width:20rem; height:20rem; margin-top:2rem; border-radius:1rem" :src="dog" alt="dogs" loading="lazy">
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {baseUrl} from '../config';

const url = baseUrl;
import { mapState } from "vuex";
export default {
    props:["breedName"],
    mounted() {
        this.dogList();
        var dogList = JSON.parse(localStorage.getItem("dogList"));
        this.$store.dispatch("dogList", dogList)
    },

    computed: {
    ...mapState(["allBreeds"])
  },

    methods: {

        dogList() {
            axios({
                method: "GET",
                url: `${url}/breed/${this.allBreeds[10]}/images`,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res) => {
                let dog = res.data.message;
                let dogArray = dog.slice(0,99)
                localStorage.setItem("dogList", JSON.stringify(dogArray));
            })
            .catch((err) => {
                console.log(err);
            })

        },
    }
}
</script>
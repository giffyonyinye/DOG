<template>
    <div>
        <div style="margin-top:2rem; color:#2c3e50">
            <i v-if="isLoading" class="fa fa-spinner">Loading ........</i>
        </div>
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
    data() {
        return {
            isLoading: false,

        }
    },

    mounted() {
        this.dogList();
        var dogList = JSON.parse(localStorage.getItem("dogList"));
        this.$store.dispatch("dogList", dogList);
        this.$store.dispatch("breedName", this.allBreeds[0]);
    },

    computed: {
    ...mapState(["allBreeds"]),

  },

    methods: {
        dogList() {
            this.isLoading = true;
            axios({
                method: "GET",
                url: `${url}/breed/bulldog/images`,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res) => {
                let dog = res.data.message;
                let dogArray = dog.slice(0,99);
                localStorage.setItem("dogList", JSON.stringify(dogArray));
                this.isLoading = false;
            })
            .catch((err) => {
                console.log(err);
            })

        },
    }
}
</script>
<template>
    <div>
        <div>
      <input type="text" name="search" id="search" placeholder="search for dogs" v-model="searchBreeds">
      <button @click="dogList">GO</button>
    </div>
        Dogs are man best friend.

        <div v-for="dog in dogs" :key="dog" >
            <div  style="dog-list">
                <img style="width:10%; height:10%"  :src="dog" alt="dogs">
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import {baseUrl} from '../config';
const url = baseUrl
export default {
    data() {
        return {
            dogs: [],
            breeds: [],
            searchBreeds:""
        }
    },

    mounted() {
      this.dogList();
      this.getAllBreeds();
    },

    computed: {
        filterName() {
            const query = this.searchBreeds.toLowerCase()
            if(this.searchQuery) {
               return this.getAllBreeds.filter((theUser) => {
                     return Object.values(theUser).some((word) => String(word).toLowerCase().includes(query))
                })
            }  else {
                return this.getAllBreeds
            }
        },
    },

    methods : {
         
        dogList() {
           
            axios({
                method: "GET",
                url: `${url}/breed/${this.searchBreeds}/images`,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res) => {
                this.dogs = res.data.message;
            })

        },

        getAllBreeds() {
            axios({
                method: "GET",
                url: `${url}/breeds/list/all`,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res) => {
                this.breeds = res.data.message;
                console.log(this.breeds);
            })

        }
    }
}
</script>

<style scoped>
.dog-list {
    display:flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
}
</style>
<template>
    <div class="main">
        <div>
            <input type="text" name="search" id="search" placeholder="search for dogs" style="padding:.5rem; border-radius:1rem" v-model="searchBreeds">
            <div v-show="showBreedList">
                <div  v-for="breed in breeds" :key="breed"> 
                    {{breed}}
                </div>
            </div>
            <button @click="dogList">GO</button>
        </div>

        <div v-show="showSearchResult"  style="display:flex; flex-wrap:wrap; justify-content: space-evenly;  ">
            <div  v-for="dog in dogs" :key="dog" >
                <img style="width:20rem; height:20rem; margin-top:2rem; border-radius:1rem" :src="dog" alt="dogs" loading="lazy">
            </div>
        </div>

        <div v-show="dogLists">
            <DogList/>
        </div>
        
    </div>

    
</template>

<script>
import axios from 'axios';
import DogList from './DogList.vue';
import {baseUrl} from '../config';
const url = baseUrl;
export default {
    components:{DogList},
    data() {
        return {
            dogs: [],
            breeds: [],
            searchBreeds:"",
            showSearchResult: false,
            dogLists: true,
            showBreedList: false
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
        onSearch(event) {
            this.showBreedList = true
            this.searchBreeds = event.target.value,
            console.log(this.searchBreeds);
            this.filterName()
        },
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
                this.dogLists = false
                this.showSearchResult = true;
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
                let breed = res.data.message;
                this.breeds = Object.keys(breed)
            })

        }
    }
}
</script>

<style scoped>
.dog-list {
    width:100%;
    display:flex;
    flex-flow: row nowrap;
    border: 1px solid black;
}
</style>
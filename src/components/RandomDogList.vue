<template>
    <div class="main">
        <div class="header">
            <input @click="isVisible = !isVisible" type="text" name="search" id="search" placeholder="search for dogs"  v-model="searchBreeds">
            <div v-if="isVisible" class="search-result">
                <div  v-for="breed in filteredBreed" :key="breed"> 
                    <p @click="dogList">{{breed}}</p>
                </div>
            </div>
            <button @click="dogList">GO</button>
        </div>

        <div v-show="showSearchResult"  style="display:flex; flex-wrap:wrap; justify-content: space-evenly; " >
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
            selectedItem : null,
            isVisible : false,
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
        filteredBreed() {
            const query = this.searchBreeds.toLowerCase()
            if(this.searchBreeds) {
               return this.breeds.filter((breed) => {
                     return Object.values(breed).some((word) => String(word).toLowerCase().includes(query))
                })
            }  else {
                return this.breeds
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
.main{
    background: white;
}
.header {
    background: #2c3e50;
    padding: 3rem;
}

.header input {
    width: 50%;
    outline: none;
    padding: 1rem;
    border-radius:.5rem ;
    border: 1px solid grey;
}
.header button{
    outline: none;
    padding: 1rem;
    border-radius:.5rem ;
    border: 1px solid grey;
}

.search-result{
    overflow:auto; 
    height:20rem
}
</style>
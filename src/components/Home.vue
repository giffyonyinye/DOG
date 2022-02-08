<template>
    <div class="main">
        <!-- THIS IS THE SEARCH BAR AND ITS FUNCTIONALITY -->
        <div class="header" @click="isVisible = !isVisible">
            <div>
                <input @click="isVisible = !isVisible" type="text" name="search" id="search" placeholder="search for dogs"  v-model="searchBreed">
            </div>
            <div v-if="isVisible" class="search-result">
                <div @click="isVisible = !isVisible" v-for="breed in filteredBreed" :key="breed"> 
                    <p @click="dogList(breed)">{{breed}}</p>
                </div>
            </div>
        </div>

    <!-- THIS SHOWS THE SEARCH RESULTS OF ANY BREED SEARCHED FOR -->
        <div v-show="showSearchResult"  style="display:flex; flex-wrap:wrap; justify-content: space-evenly; " >
            <router-link :to="{name: 'dogInfo', params: {id:index, image:dog}}"  v-for="(dog,index) in searchResult" :key="dog" >
                <img style="width:20rem; height:20rem; margin-top:2rem; border-radius:1rem" :src="dog" alt="dogs" loading="lazy">
            </router-link>
        </div>

        <!-- THIS SHOWS LIST OF DOG BY DEFAULT WHEN URL IS VISITED -->
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
import {mapState} from 'vuex';
export default {
    components:{DogList},
    data() {
        return {
            dogs: [],
            searchBreed:"",
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
      var dogList = JSON.parse(localStorage.getItem("searchResult"));
        this.$store.dispatch("searchResult", dogList)
    },

    computed: {
        ...mapState(["allBreeds", "searchResult"]),
        filteredBreed() {
            if(this.searchBreed) {
               return this.allBreeds.filter((breed) => {
                   return breed.toLowerCase().includes(this.searchBreed.toLowerCase())
                })
            } else {
                return this.allBreeds
            }
        },
    },

    methods : {
        dogList(breed) {
            axios({
                method: "GET",
                url: `${url}/breed/${breed}/images`,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res) => {
                let searchResult = res.data.message;
                this.dogLists = false
                this.showSearchResult = true;
                localStorage.setItem("searchResult", JSON.stringify(searchResult));
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
                let breeds = Object.keys(breed);
                this.$store.dispatch("allBreeds", breeds)
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
    height:10rem;
    width: 50%;
    margin: auto;
    background: white;
}
</style>
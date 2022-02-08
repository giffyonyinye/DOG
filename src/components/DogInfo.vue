<template>
<!-- THIS SHOWS DOG INFORMATION -->
  <div class="dog-info">
    <img :src="image" alt="dog">
    <p>{{breedName}}</p>
    <p>{{id}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:[
        "id", 
        "image",
         "breedName"
    ],

  computed: {
    ...mapState(["allBreeds"])
  },
  
};
</script>

<style scoped>

.dog-info {
    margin-top: 5rem;
}
.dog-info img {
    width: 30rem;
    height: 30rem;
}
@media only screen and (max-width: 600px) {
  .dog-info {
    width: 95%;
  }
}
</style>
<template>
  <div class="dog-info">
    <img :src="image" alt="dog">
    <p>{{breedName}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:["id", "image", "breedName"],
  data() {
    return {
      breed: localStorage.getItem("breedName"),
      imageUrl: ""
    };
  },
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
  .card {
    width: 95%;
  }
}
</style>
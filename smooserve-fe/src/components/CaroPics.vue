<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');

.carousel-fluid {
  position: relative;
  max-width: 800px; /* Maximum width */
  margin: 0 auto; /* Center it */
}

.carousel-inner .content {
  position: absolute; /* Position the background text */
  top: 0; /* At the bottom. Use top:0 to append it to the top */
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.196); /* Black background with 0.5 opacity */
  width: 100%; /* Full width */
  padding: 20px; /* Some padding */
}

</style>

<template>
       <div class="container-fluid">

        <div id="carouselExampleIndicators" class="carousel slide"> 
            <ol class="carousel-indicators">
          <li
            v-for="(image, index) in images"
            :key="index"
            :class="{ active: index === currentImage }"
            @click="goToImage(index)"
          >
        </li>
        </ol>
    <!-- Carousel Items -->
        <div class="carousel-inner">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="carousel-item"
            :class="{ active: index === currentImage }"
          >
         <img :src="image" class="d-block w-100">
         <div class="content">
              <h1 style="color:white; font-weight: bold;">EMPOWER THE <br> PEOPLE AROUND YOU</h1>
              </div>
        </div>
        </div>

        <!-- Previous Button -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
        @click="prevImage"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>

      <!-- Next Button -->
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
        @click="nextImage"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
        </div>
       </div>
</template>
<script>

export default {
  data() {
    return {
      currentImage: 0,
      images: [
      "/layout/images/landing-img1.jpg",
      "/layout/images/landing-img2.jpg",
      "/layout/images/landing-img3.jpg",
      ]
    };
  },
  methods: {
    prevImage() {
      if (this.currentImage > 0) {
        this.currentImage--;
      }
    },
    nextImage() {
      if (this.currentImage < this.images.length - 1) {
        this.currentImage++;
      }
    },
    goToImage(imageIndex) {
      this.currentImage = imageIndex;
    },
  }
};
</script>






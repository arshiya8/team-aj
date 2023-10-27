<style>
.carousel-fluid {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
}

.imItem {
  position: relative;
}

.imItem img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  
  font-weight: bold;
  text-align: left;
}
</style>

<template>
  <div class="container-fluid">
    <Carousel :value="images" :responsiveOptions="responsiveOptions" circular>
      <template #item="image">
        <div class="imItem">
          <img :src="image.data" :alt="image.data" class="d-block w-100" style="height: 450px; width:100%;" />
          <div class="text-overlay">
            <h1 style="color:rgb(254, 254, 254); font-family: 'Helvetica Neue', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold;">EMPOWER THE <br> PEOPLE AROUND YOU</h1>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script>
import Carousel from 'primevue/carousel';

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      currentImage: 0,
      images: [
        "/layout/images/landing-img1.jpg",
        "/layout/images/landing-img2.jpg",
        "/layout/images/landing-img3.jpg",
      ],
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: "768px",
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
};
</script>






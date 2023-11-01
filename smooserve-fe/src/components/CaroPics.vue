
<template>
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true"
              :showItemNavigators="true" :showThumbnails="false"  :showItemNavigatorsOnHover="true" :showIndicators="true" :autoPlay="true" :transitionInterval="2000">
      <template #item="slotProps">
        <img :src="slotProps.item" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
      </template>
    </Galleria>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const images = [
    "/layout/images/landing-img1.jpg",
    "/layout/images/landing-img2.jpg",
    "/layout/images/landing-img3.jpg",
  ];
  
  const responsiveOptions = ref([
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '767px',
      numVisible: 3
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ]);
  
  </script>
  
  
  
  
  
  
  
  
  
<template>
    <div class="card">
      <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <div class="mb-3">
              <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-6 shadow-2" />
            </div>
            <div>
              <h4 class="mb-1">{{ slotProps.data.name }}</h4>
              <h6 class="mt-0 mb-3">{{ slotProps.data.link }}</h6>
              <div class="mt-5">
                <Button icon="pi pi-times" rounded severity="danger" class="mr-2" raised />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Carousel from 'primevue/carousel';
  
  
  const products = ref([]); // Initialize with an empty array
  const responsiveOptions = ref([
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ]);
  
  
  
  onMounted(() => {
    // Replace this with your actual data fetching logic
    // For now, let's use some sample data
    products.value = [
      {
        name: 'CSP 1',
        image: 'pics/CSP1.jpg',
        link: 'www.CSP1.com',
      },
      {
        name: 'CSP 2',
        image: 'pics/CSP2.jpg',
        link: 'www.CSP2.com',
      },
      {
        name: 'CSP 3',
        image: 'pics/CSP3.jpg',
        link: 'www.CSP3.com',
      },
      {
        name: 'CSP 4',
        image: 'pics/CSP4.jpg',
        link: 'www.CSP4.com',
      },
      {
        name: 'CSP 5',
        image: 'pics/CSP5.jpg',
        link: 'www.CSP5.com',
      },
      {
        name: 'CSP 6',
        image: 'pics/CSP6.jpg',
        link: 'www.CSP6.com',
      },
    ];
  });
  </script>
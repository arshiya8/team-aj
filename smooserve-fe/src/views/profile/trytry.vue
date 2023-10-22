<template>
    <!-- Favourite -->
    <div class="card">
      <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <!-- Your existing code for product cards -->
        </template>
      </Carousel>
    </div>
  
    <!-- Favourites Tab with CSP Integration -->
    <h2>Favourites</h2>
    <div class="favourites-tab">
      <div class="tab-buttons">
        <button class="tab-button" @click="showTab('shops')" :class="{ active: activeTab === 'shops' }" data-tab="shops">SmooServe Shops</button>
        <button class="tab-button" @click="showTab('csps')" :class="{ active: activeTab === 'csps' }" data-tab="csps">CSPs</button>
      </div>
      <section class="favorite-cards">
        <div id="shopContent" class="card-grid" style="display: none;">
          <!-- Shop cards will be populated here -->
        </div>
  
        <div id="cspContent" class="card-grid">
          <!-- CSP cards will be populated here -->
        </div>
      </section>
      <!-- "noFavoritesMessage" element -->
      <div id="noFavoritesMessage" style="display: none;">You have no favorites currently.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { ProductService } from '@/service/ProductService';
  
  const products = ref([]);
  const activeTab = ref('shops'); // Initialize activeTab as 'shops'
  
  onMounted(() => {
      ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
  })
  
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
  
  // Function to toggle between 'shops' and 'csps' tabs
  const showTab = (tabName) => {
      activeTab.value = tabName;
  
      // Fetch and populate data for the selected tab (shops or csps)
      fetchData(tabName);
  };
  
  // Function to fetch and populate data for the selected tab (shops or csps)
  const fetchData = (tabName) => {
      // Assuming you have a server or API to fetch data for shops and csps
      const url = (tabName === 'shops') ? 'get_shop_data.php' : 'get_csp_data.php';
  
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const contentElement = (tabName === 'shops') ? 'shopContent' : 'cspContent';
              const noFavoritesMessage = document.getElementById('noFavoritesMessage');
  
              const content = document.getElementById(contentElement);
              content.innerHTML = ''; // Clear previous content
  
              if (data.length === 0) {
                  noFavoritesMessage.style.display = 'block'; // Display message when no favorites
              } else {
                  data.forEach(item => {
                      // Create cards based on data
                      content.innerHTML += `
                          <div class="${tabName}-card">
                              <h3>${item.name}</h3>
                              <!-- Add other details specific to shops or csps here -->
                          </div>
                      `;
                  });
                  noFavoritesMessage.style.display = 'none'; // Hide the "no favorites" message
              }
          })
          .catch(error => console.error('Error fetching data:', error));
  };
  </script>
  
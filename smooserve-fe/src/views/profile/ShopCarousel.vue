<template>
  <div class="card">
    <Carousel v-if="favoriteShops.length > 0" :value="favoriteShops" :numVisible="2" :numScroll="2" :responsiveOptions="responsiveOptions">
      <template #item="csp">
        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
          <div class="mb-3">
            <img src="" :alt="csp.data.title" class="w-6 shadow-2" />
          </div>
          <div>
             <!-- need to add a router link  -->
             <h4 class="mb-1">{{ csp.data.name }}</h4>
            <h6 class="mt-0 mb-3">{{ csp.data.link }}</h6>
            <div class="mt-5">
              <Button icon="pi pi-times" rounded severity="danger" class="mr-2" raised @click="removeFavoriteShop(csp.data)" />
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import axios from 'axios';

const favoriteShops = ref([]);
let studentId = null;
const auth = getAuth();
onAuthStateChanged(auth, async (student) => {
  if (student) {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      querySnapshot.forEach((doc) => {
        const studentEmail = doc.data().email;
        if (studentEmail === student.email) {
          studentId = doc.id;
          favoriteShops.value = doc.data().favoriteShops || [];
        }
      });

      // If studentId is still null, no matching email was found in the collection
      if (studentId === null) {
        console.log("No matching id found in the database.");
      } else {
        console.log("Student ID found:", studentId, favoriteShops.value);
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    studentId = null;
    favoriteShops.value = []; // Clear favorites for non-authenticated users
  }
});


const removeFavoriteShop = (cspToRemove) => {
  // Find the index of the Shop in the favoriteShops array
  const index = favoriteShops.value.findIndex(csp => csp.id === cspToRemove.id);
  
  // If the Shop is found, remove it from the favoriteShops array
  if (index !== -1) {
    favoriteShops.value.splice(index, 1);
    console.log(favoriteShops.value)
    updateStudent(favoriteShops.value);
    localStorage.setItem('favoriteShops', JSON.stringify(favoriteShops.value));
  }
};

const updateStudent = async (updatedFavorites) => {
  try {
    // Ensure userId is not null before making the API request
    if (studentId != null) {
      const response = await axios.put(`http://localhost:8080/api/student/${studentId}`, {
        favoriteShops: updatedFavorites,
      });
      console.log(response.data);
    } else {
      console.error('User is not authenticated.');
    }
  } catch (error) {
    console.error('Error updating favorite Shops:', error);
  }
};

onMounted(async () => {
  const storedFavoriteShops = localStorage.getItem('favoriteShops');
  if (storedFavoriteShops) {
    favoriteShops.value = JSON.parse(storedFavoriteShops);
  }

});


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

</script>
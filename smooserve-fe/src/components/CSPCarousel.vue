<template>
    
  <div class="card">
    <Carousel v-if="favoriteCSPs.length > 0" :value="favoriteCSPs" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
      <template #item="csp">
        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3 h-full" >
          <div class="mb-3">
            <img :src="csp.data.imageURL" style="border-radius: 50%;" :alt="csp.data.title" class="w-6 shadow-2" />
          </div>
          <div>
             <!-- need to add a router link  -->
            <h4 class="mb-1">{{ csp.data.title }}</h4>
            <p class="mt-0 mb-3">{{ csp.data.desc }}</p>
            <div class="mt-5">
              <Button icon="pi pi-times" rounded severity="danger" class="mr-2" raised @click="removeFavoriteCSP(csp.data)" />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
    <div v-else style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
      <h3 >No Favorites..</h3>
      <router-link :to="{name: 'Home'}"><Button label="Add Favourites Now!"></Button></router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Carousel from 'primevue/carousel';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import axios from 'axios';


const favoriteCSPs = ref([]);
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
          favoriteCSPs.value = doc.data().favoriteCsps || [];
        }
      });

      // If studentId is still null, no matching email was found in the collection
      if (studentId === null) {
        console.log("No matching id found in the database.");
      } else {
        console.log("Student ID found:", studentId, favoriteCSPs.value);
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    studentId = null;
    favoriteCSPs.value = []; // Clear favorites for non-authenticated users
  }
});


const removeFavoriteCSP = (cspToRemove) => {
  // Find the index of the CSP in the favoriteCSPs array
  const index = favoriteCSPs.value.findIndex(csp => csp.id === cspToRemove.id);
  
  // If the CSP is found, remove it from the favoriteCSPs array
  if (index !== -1) {
    favoriteCSPs.value.splice(index, 1);
    console.log(favoriteCSPs.value)
    updateStudent(favoriteCSPs.value);
    localStorage.setItem('favoriteCSPs', JSON.stringify(favoriteCSPs.value));
  }
};

const updateStudent = async (updatedFavorites) => {
  try {
    // Ensure userId is not null before making the API request
    if (studentId != null) {
      const response = await axios.put(`https://smooserve-be.vercel.app/api/student/${studentId}`, {
        favoriteCsps: updatedFavorites,
      });
      console.log(response.data);
    } else {
      console.error('User is not authenticated.');
    }
  } catch (error) {
    console.error('Error updating favorite CSPs:', error);
  }
};

onMounted(async () => {
  const storedFavoriteCSPs = localStorage.getItem('favoriteCSPs');
  if (storedFavoriteCSPs) {
    favoriteCSPs.value = JSON.parse(storedFavoriteCSPs);
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
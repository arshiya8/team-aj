<script>
import { onMounted, ref, computed, toDisplayString } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import NavBar from "@/components/NavBar.vue";
import CaroPics from "@/components/CaroPics.vue";
import Footer from "@/components/Footer.vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useToast } from "primevue/usetoast";


export default {
  setup() {
    const toast = useToast();
    const csps = ref([]);
    csps.original = null;
    const favoriteCSPs = ref([]);
    const selectedValue1 = ref('');
    const selectedValue2 = ref('');
    const selectedValue3 = ref('');
    const auth = getAuth();
    const router = useRouter();
    let studentId = null;

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
            console.log("Student ID found:", studentId);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        studentId = null;
        favoriteCSPs.value = []; // Clear favorites for non-authenticated users
      }
    });

    const toggleHeartColor = (csp) => {
      if (auth.currentUser) {
        const index = favoriteCSPs.value.findIndex((favCSP) => favCSP.id === csp.id);
        if (index === -1) {
          // CSP is not in favorites, add it
          favoriteCSPs.value.push(csp);
        } else {
          // CSP is already in favorites, remove it
          favoriteCSPs.value.splice(index, 1);
        }
        // Update the student's favorite CSPs in the database
        updateStudent(favoriteCSPs.value);
        // Update localStorage with the updated favorite CSPs list
        localStorage.setItem('favoriteCSPs', JSON.stringify(favoriteCSPs.value));
      } else {
        console.error('User is not authenticated.');
        alert("Sign in first!");
      }
    };
    // const toggleHeartColor = (csp) => {
    //   const index = favoriteCSPs.value.findIndex((favCSP) => favCSP.id === csp.id);
    //   if (index === -1) {
    //     // CSP is not in favorites, add it
    //     favoriteCSPs.value.push(csp);
    //     // // // Update the student's favorite CSPs in the database
    //     // updateStudent(favoriteCSPs.value);
    //   } else {
    //     // CSP is already in favorites, remove it
    //     favoriteCSPs.value.splice(index, 1);
    //     // // // Update the student's favorite CSPs in the database
    //     // updateStudent(favoriteCSPs.value);
    //   }
    //   // Update localStorage with the updated favorite CSPs list
    //   localStorage.setItem('favoriteCSPs', JSON.stringify(favoriteCSPs.value));

    //   // Also, update the student's favorite CSPs in the database
    //   updateStudent(favoriteCSPs.value);
    // };

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

    const isCSPFavorite = (csp) => {
      return favoriteCSPs.value.some((favCSP) => favCSP.id === csp.id);
    };


    const toggleAutoFilter = async () => {
      const response = await axios.get(`https://smooserve-be.vercel.app/api/student/${studentId}`, {
      });
      // console.log(response.data.quizPreference)
      const causes = response.data.quizPreference.passionate_about
      const skills = response.data.quizPreference.skills
      const location = response.data.quizPreference.isLocal

      if (!csps.original) {
        // Store the original csps array if it's not already stored
        csps.original = csps.value.slice();
      }
      if (csps.value.length === csps.original.length) {
        const auto_filter = csps.value.filter(csp => {
          return causes.includes(csp.cause) || skills.includes(csp.skills) || location === (csp.isLocal);
        });
        csps.value = auto_filter;
      } else {
        // Restore the original csps array if it's already filtered
        csps.value = csps.original.slice();
      }

      // console.log(auto_filter);


      // selectedValue3.value = selectedValue3.value === '' ? 'choiceX' : '';
    };

    const itemsPerPage = 6;
    const currentPage = ref(1);

    // pagination tools //
    const totalPages = computed(() => Math.ceil(csps.value.length / itemsPerPage));

    const getVisibleCsps = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return csps.value.slice(start, end);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const goToPage = (page) => {
      currentPage.value = page;
    };

    onMounted(async () => {
      axios
        .get("http://smooserve-be.vercel.app/api/csps")
        .then(response => {
          csps.value = response.data;
          console.log(csps.value)
        })
        .catch((error) => {
          console.log(error);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 3000,
          });
        })
      // const fbCSP = [];
      // const querySnapshot = await getDocs(collection(db, "CSPs"));

      // querySnapshot.forEach((doc) => {
      //   const CSP = {
      //     id: doc.id,
      //     title: doc.data().title,
      //     desc: doc.data().desc,
      //     imageURL: doc.data().imageURL,
      //     posterURL: doc.data().posterURL,
      //     cause: doc.data().cause,
      //     skills: doc.data().skills,
      //   };
      //   fbCSP.push(CSP);
      // });
      // csps.value = fbCSP;

      const storedFavoriteCSPs = localStorage.getItem('favoriteCSPs');
      if (storedFavoriteCSPs) {
        favoriteCSPs.value = JSON.parse(storedFavoriteCSPs);
      }

    });

    const filterCsp = () => {
      if (!csps.original) {
        // Store the original csps array if it's not already stored
        csps.original = csps.value.slice();
      }
      if (csps.value.length === csps.original.length) {
        const filteredCsps = csps.value.filter(csp => {
          const causeMatch = selectedValue1.value === '' || selectedValue1.value === csp.cause;
          const skillsMatch = selectedValue2.value === '' || selectedValue2.value === csp.skills;
          const locationMatch = selectedValue3.value === '' || selectedValue3 === csp.isLocal;
          return causeMatch || skillsMatch || locationMatch;
        });
        csps.value = filteredCsps;
      } else {
        // Restore the original csps array if it's already filtered
        csps.value = csps.original.slice();
      }
    };


    return {
      csps,
      favoriteCSPs,
      selectedValue1,
      selectedValue2,
      selectedValue3,
      toggleHeartColor,
      toggleAutoFilter,
      filterCsp,
      isCSPFavorite,
      studentId,
      favoriteCSPs,
      updateStudent,


      // pagination tools //
      itemsPerPage,
      currentPage,
      totalPages,
      getVisibleCsps,
      prevPage,
      nextPage,
      goToPage,
    };
  },
  components: {
    NavBar,
    CaroPics,
    Footer,
  },
};
</script>


<template>
  <!-- navbar component -->
  <NavBar />

  <!-- headers -->
  <div class="container-fluid">
    <CaroPics />
    <div class="row pb-3">
      <h2 style="color:black; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold;
          text-align: center; margin-top: 30px; font-size: 2rem">
        COMMUNITY SERVICE
        PROJECTS</h2>
    </div>

    <!-- Instructions card -->
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
      <div class="grid">
        <div v-scrollanimation class="col-12 md:col-4 mb-4 px-5">
          <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
            <i v-scroll class="pi pi-search text-4xl text-blue-700"></i>
          </span>
          <div v-scroll class="text-900 text-xl mb-3 font-medium">Step 1</div>
          <span v-scroll class="text-700 line-height-3">
            Ready to start your CSP search? Take a look at the displayed CSP's below that were filtered according to
            your quiz results!
          </span>
        </div>
        <div v-scrollanimation class="col-12 md:col-4 mb-4 px-5">
          <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
            <i v-scroll class="pi pi-sliders-v text-4xl text-blue-700"></i>
          </span>
          <div v-scroll class="text-900 text-xl mb-3 font-medium">Step 2</div>
          <span v-scroll class="text-700 line-height-3">
            Not too satisfied with what you are seeing? Fret not as you can choose to manually filter the CSPs using our
            filter functions, or use our convenient auto-filter feature, but not both at once.
          </span>
        </div>
        <div v-scrollanimation class="col-12 md:col-4 mb-4 px-5">
          <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
            <i v-scroll class="pi pi-heart text-4xl text-blue-700"></i>
          </span>
          <div v-scroll class="text-900 text-xl mb-3 font-medium">Step 3</div>
          <span v-scroll class="text-700 line-height-3">
            Found the CSP of your dreams? Go ahead and favourite the CSP using the heart icons on the back of the CSP
            cards! You
            can also click the 'See More' button to find out more about the individual CSP's!
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- favourites clickable heart -->
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
  </div>


  <!-- body -->
  <div class="container-fluid" style="background-color: navy">
    <div class="row">
      <div class="col">
        <h1 style="font-family: 'Helvetica Neue', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 600;
            text-align: center; color:white;">
          What's happening in Smooserve</h1>
      </div>
    </div>
    <div class="row justify-content-center align-items-center" style="padding-bottom: 20px; text-align: center;
    font-family: 'Helvetica Neue Medium', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: normal;">


      <!-- First Dropdown List -->
      <div class="dropdown" style="display: inline-block; margin-right: 10px;">
        <label for="dropdown1"></label>
        <select id="dropdown1" v-model="selectedValue1" @change="filterCsp">
          <option value="" selected>Causes</option>
          <option value="Environmental Conservation">Environment</option>
          <option value="Education">Education</option>
          <option value="Youth Development">Youth Development</option>
        </select>

        <!-- Second Dropdown List -->
        <label for="dropdown2"></label>
        <select id="dropdown2" v-model="selectedValue2" @change="filterCsp">
          <option value="" selected>Skills</option>
          <option value="Teaching">Teaching</option>
          <option value="Event Planning">Event Planning</option>
          <option value="Wrting and Communication">Communication</option>
        </select>

        <!-- Third Dropdown List -->
        <label for="dropdown3"></label>
        <select id="dropdown3" v-model="selectedValue3" @change="filterCsp">
          <option value="" selected>Location</option>
          <option value="true">Local</option>
          <option value="false">Overseas</option>
        </select>


        <div class="toggle-button" style="display: inline-block; text-align: center; padding-left: 10px;">
          <label
            style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: normal;">Auto-filter:</label>
          <button @click="toggleAutoFilter">{{ selectedValue3 === '' ? 'Off' : 'On' }}</button>
        </div>
      </div>
    </div>
  </div>


  <!-- CSP flip cards -->
  <div class="container-fluid pt-5" style="background-color: lightblue;">
    <div class="grid ">
      <div class="card-container">
        <div class="flex align-items-center justify-content-center sm:col-12 md:col-6 lg:col-4"
          v-for="(csp, index) in getVisibleCsps" :key="csp.id">
          <div v-scrollanimation class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img :src="csp.posterURL" :alt="`CSP ${csp.id}`">
              </div>
              <div class="flip-card-back align-items-end">
                <div class="heart-container">
                  <i class="fas fa-heart clickable" :class="{ 'heart-red': isCSPFavorite(csp) }"
                    @click="toggleHeartColor(csp)"></i>
                </div>
                <div class="text-center">
                  <img :src="csp.imageURL" style="border-radius: 50%; width:150px" :alt="`CSP ${csp.id}`">
                  <h1>{{ csp.title }}</h1>
                  <p class="card-description">{{ csp.desc }}</p>

                  <!-- see more button link to linktree  -->
                  <router-link :to="{ name: 'CSP', params: { id: csp.id } }"><Button
                      label="See More"></Button></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Pagination Controls with Styling -->
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">Prev</button>
    <span v-for="page in totalPages" :key="page">
      <button @click="goToPage(page)" :class="{ active: page === currentPage }" class="pagination-button">{{ page
      }}</button>
    </span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
  </div>

  <Footer />
</template>


<style>
/* animation */
.before-enter-flip {
  opacity: 0;
  transform: scale(.5) rotateZ(-25deg);
  transition: all 1s ease-out;
}

/*
  If the element intersects with the viewport, the before-enter class is added.
*/
.enter-flip {
  opacity: 1;
  transform: scale(1) rotateZ(0deg);
}


/* pagination tool */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
}

.pagination-button {
  /* Your button styles here */
  background-color: #007ad9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #0053a6;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.active {
  background-color: #0053a6;
  font-weight: bold;
}

.dropdown select {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
}

.toggle-button button {
  display: inline-block;
  background-color: #007ad9;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 20px;
  cursor: pointer;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
}

.toggle-button button:hover {
  background-color: #0053a6;
}

.toggle-button button.on {
  background-color: #007ad9;
}

.toggle-button button.off {
  background-color: #ccc;
}

.heart-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.heart-red {
  color: red;
}

.clickable {
  cursor: pointer;
}

.dropdown {
  display: inline;
  margin-right: 15px;
  border-radius: 15px;
  overflow: hidden;
}

.dropdown label {
  font-size: 25px;
  padding: 5px;
  color: white;
  font-weight: bold;
}

.dropdown select {
  font-size: 25px;
  padding: 5px;
  border-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  outline: none;
  cursor: pointer;
  text-align: justify;
}


/* navbar */
.navbar {
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* logo */
.logo {
  width: 250px;
  cursor: pointer;
}

/* the search and login */
.navbar ul li {
  list-style: none;
  display: inline-block;
  margin: 0 20px;
  position: relative;
}

.navbar ul li a {
  text-decoration: none;
}

.navbar-toggler {
  background-color: rgba(6, 66, 115);
}

.navbar-list {
  display: flex;
  padding-left: 190px;
  /* Align items to the left by default */
}

@media (max-width: 991.98px) {
  .navbar-list {
    padding-left: 0px;
    /* Align items to the right when the page is collapsed */
  }
}

.list-inline-item a {
  text-decoration: none;
  text-transform: uppercase;
  color: rgba(6, 66, 115);
  font-weight: bold;
  font-size: larger;
  padding: 5px;
}

.list-inline-item::after {
  content: '';
  height: 3px;
  width: 0;
  background: rgba(6, 66, 115);
  position: absolute;
  left: 0;
  bottom: 8;
  transition: 0.5s;
}

@media (min-width: 992px) {
  .list-inline-item:hover::after {
    width: 100%;
  }
}

@media (max-width: 991.98px) {
  .list-inline-item:hover::after {
    width: 15%;
    bottom: 0;
  }
}

/* flip cards  */
.card-container {
  display: flex;
  flex-wrap: wrap;
  /* Allow cards to wrap to the next line */
  justify-content: space-between;
  /* Distribute cards evenly within each row */
  width: 80%;
  margin: 0 auto;
}

.flip-card {
  background-color: transparent;
  width: 280px;
  height: 390px;
  border: none;
  perspective: 1000px;
  /* Remove this if you don't want the 3D effect */
  border-radius: 15px;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: rgb(119, 166, 204);
  color: white;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  font-size: 14px;
  padding: 10px;
}

.flip-card img {
  max-width: 100%;
  /* Ensure the image doesn't exceed its container */
  max-height: 100%;
  border-radius: 15px;
}

.centralise {
  margin: 150px;
}

</style>


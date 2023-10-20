<script>
import { onMounted, ref, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import NavBar from "../components/NavBar.vue";
import CaroPics from "../components/CaroPics.vue";
import Footer from "../components/Footer.vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  setup() {
    const csps = ref([]);
    const favoriteCSPs = ref([{}]);
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
            }
          });
          // If studentId is still null, no matching email was found in the collection
          if (studentId === null) {
            console.log("No matching email found in the database.");
          } else {
            console.log("Student ID found:", studentId);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        studentId = null;
      }
    });

    const toggleHeartColor = (csp) => {
      const index = favoriteCSPs.value.findIndex((favCSP) => favCSP.id === csp.id);
      if (index === -1) {
        // CSP is not in favorites, add it
        favoriteCSPs.value.push(csp);
        // // Update the student's favorite CSPs in the database
        updateStudent(favoriteCSPs.value);
      } else {
        // CSP is already in favorites, remove it
        favoriteCSPs.value.splice(index, 1);
        // // Update the student's favorite CSPs in the database
        updateStudent(favoriteCSPs.value);
      }
    };

    const updateStudent = async () => {
      try {
        // Ensure userId is not null before making the API request
        if (studentId != null) {
          const response = await axios.put(`http://localhost:8080/api/student/${studentId}`, {
            favoriteCsps: favoriteCSPs.value,
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

    const toggleAutoFilter = () => {
      selectedValue3.value = selectedValue3.value === '' ? 'choiceX' : '';
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
      const fbCSP = [];
      const querySnapshot = await getDocs(collection(db, "CSPs"));

      querySnapshot.forEach((doc) => {
        const CSP = {
          id: doc.id,
          title: doc.data().title,
          desc: doc.data().desc,
          imageURL: doc.data().imageURL,
          cause: doc.data().cause,
          skills: doc.data().skills,
        };
        fbCSP.push(CSP);
      });
      csps.value = fbCSP;
    });

    const filterCsp = () => {
      const filteredCsps = csps.value.filter(csp => {
        const causeMatch = selectedValue1.value === '' || selectedValue1.value === csp.cause;
        const skillsMatch = selectedValue2.value === '' || selectedValue2.value === csp.skills;
        return causeMatch || skillsMatch;
      });
      csps.value = filteredCsps;
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
  <CaroPics />

  <!-- headers -->
  <div class="container-fluid" style="background-color: lightblue;">
    <div class="row pb-3">
      <h2
        style="color:black; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; text-align: center; margin-top: 30px; font-size: 2rem">
        COMMUNITY SERVICE
        PROJECTS</h2>
      <br>
      <h2
        style="color:rgb(252,84,84); font-family: 'Helvetica Neue', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 600; text-align: center; font-size: 4rem;">
        THIS MONTH</h2>
    </div>
  </div>

  <!-- tilted cards -->
  <div class="ct">
    <div class="card-container">
      <div class="card rd">
        <img style="border-radius: 15px;" src="/layout/images/card1.jpg">
      </div>
      <div class="card rd">
        <img style="border-radius: 15px;" src="/layout/images/card2.jpg">
      </div>
      <div class="card rd">
        <img style="border-radius: 15px;" src="/layout/images/card3.jpg">
      </div>
    </div>
  </div>

  <!-- body -->
  <div class="container-fluid" style="background-color: navy">
    <div class="row">
      <div class="col">
        <h1
          style="font-family: 'Helvetica Neue', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 600; text-align: center; color:white;">
          What's happening in Smooserve</h1>
      </div>
    </div>
    <div class="row" style="padding-left: 10px; padding-bottom:20px; text-align: center;display: flex; align-items: center; font-family: 'Helvetica Neue Medium', 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-weight: normal;">
      <!-- First Dropdown List -->
      <div class="dropdown" style="display: inline-block; margin-right: 10px;">
        <label for="dropdown1"></label>
        <select id="dropdown1" v-model="selectedValue1" @change="filterCsp">
          <option value="" selected>Causes</option>
          <option value="Environment">Environment</option>
          <option value="Education">Education</option>
          <option value="Youth Development">Youth Development</option>
        </select>

        <!-- Second Dropdown List -->
        <label for="dropdown2"></label>
        <select id="dropdown2" v-model="selectedValue2" @change="filterCsp">
          <option value="" selected>Skills</option>
          <option value="Teaching">Teaching</option>
          <option value="Event Planning">Event Planning</option>
          <option value="Communication">Communication</option>
        </select>


        <div class="toggle-button" style="display: inline-block; text-align: center; padding-left: 10px;">
          <label
            style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: normal;">Auto-filter:</label>
          <button @click="toggleAutoFilter">{{ selectedValue3 === '' ? 'Off' : 'On' }}</button>
        </div>
      </div>

      <!-- Display selected values -->
      <!-- <div class="row justify-content-center" style="color:white; font-weight: bold; font-size: 20px;">
        Selected Value 1: {{ selectedValue1 }}
        Selected Value 2: {{ selectedValue2 }}
        Selected Value 3: {{ selectedValue3 }}
      </div> -->
    </div>
  </div>


  <!-- font awesome library icons  -->
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
  </div>


  <div class="container-fluid" style="background-color: lightblue;">
    <div class="row">
      <div class="card-container">
        <div class="col-md-4" v-for="(csp, index) in getVisibleCsps" :key="csp.id">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img :src="csp.imageURL" :alt="`CSP ${csp.id}`">
              </div>
              <div class="flip-card-back align-items-end">
                <div class="heart-container">
                  <i class="fas fa-heart clickable" :class="{ 'heart-red': isCSPFavorite(csp) }"
                    @click="toggleHeartColor(csp)"></i>
                </div>
                <div class="text-center">
                  <h1>{{ csp.title }}</h1>
                  <p class="card-description">{{ csp.desc }}</p>
                  <!-- Add more content for your CSP card here -->
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
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');

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
  /* Add any other styles you want to apply to the dropdowns here */
}

.toggle-button button {
  display: inline-block;
  background-color: #007ad9;
  /* Set the desired background color */
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
  /* Set the desired hover color */
}

.toggle-button button.on {
  background-color: #007ad9;
  /* Set the background color when it's turned on */
}

.toggle-button button.off {
  background-color: #ccc;
  /* Set the background color when it's turned off */
}

.heart-container {
  position: absolute;
  top: 10px;
  /* Adjust the top position as needed */
  right: 10px;
  /* Adjust the right position as needed */
  z-index: 1;
  /* Ensure the heart is above other content */
}

/* Define styles for the red heart */
.heart-red {
  color: red;
  /* You can customize the red color as needed */
}

.clickable {
  cursor: pointer;
}

/* to have spacing between each card */
.col-md-3 {
  margin: 20px 0;
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

.ct {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: lightblue;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  /* Allow cards to wrap to the next line */
  justify-content: space-between;
  /* Distribute cards evenly within each row */
  width: 80%;
  margin: 0 auto;
}

.col-md-4 {
  width: calc(33.33% - 20px);
  /* 3 columns with spacing between */
  margin-bottom: 20px;
  /* Add vertical spacing between rows */
}

.rd {
  border-radius: 15px;
  width: 30%;
}

.card:first-child {
  transform: rotate(-20deg);
  border: none;
  margin-right: 60px;
}

.card:last-child {
  transform: rotate(20deg);
  border: none;
  margin-left: 60px;
  background-color: lightblue;
}

.card:nth-child(2) {
  margin-top: -140px;
  border: none;
  background-color: lightblue;
}

* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: rgba(6, 66, 115);
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

/* search button */
.search-button {
  background-color: rgba(6, 66, 115);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 5px 5px;
  font-size: 16pm;
}

.search {
  border-radius: 10px;
  padding: 5px 5px;
  border: 2px solid rgba(6, 66, 115);
  ;
}

.navbar-toggler {
  background-color: rgba(6, 66, 115);

}


/* body */

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
  /* Adjust the font size as needed */
  padding: 10px;
  /* Add some padding for readability */
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


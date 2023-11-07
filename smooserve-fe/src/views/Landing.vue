<script>
import { onMounted, ref, computed, watch } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import NavBar from "@/components/NavBar.vue";
import CaroPics from "@/components/CaroPics.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import ScrollAnimation from '@/directives/ScrollAnimation.js';

export default {
  setup() {
    const toast = useToast();
    const csps = ref([]);
    const cspsOriginal = ref([]);
    const favoriteCSPs = ref([]);
    const selectedValue1 = ref("");
    const selectedValue2 = ref("");
    const selectedValue3 = ref("");
    const selectedValue4 = ref("");
    const auth = getAuth();
    const router = useRouter();
    let studentId = null;
    const loggedIn = ref(false);

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
            loggedIn.value = true
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        studentId = null;
        favoriteCSPs.value = []; // Clear favorites for non-authenticated users
        loggedIn.value = false
      }
    });

    const toggleHeartColor = (csp) => {
      if (auth.currentUser) {
        const index = favoriteCSPs.value.findIndex(
            (favCSP) => favCSP.id === csp.id
        );
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
        localStorage.setItem(
            "favoriteCSPs",
            JSON.stringify(favoriteCSPs.value)
        );
      } else {
        console.error("User is not authenticated.");
        toast.add({
          severity: "info",
          summary: "Info",
          detail: "Please login first",
          life: 3000,
        });
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
          const response = await axios.put(
              `https://smooserve-be.vercel.app/api/student/${studentId}`,
              {
                favoriteCsps: updatedFavorites,
              }
          );
          console.log(response.data);
        } else {
          console.error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error updating favorite CSPs:", error);
      }
    };

    const causes = [{ name: "Environment" }, { name: "Youth Development" }, { name: "Education" }]
    const skills = [{ name: "Teaching" }, { name: "Event Planning" }, { name: "Communication" }]
    const locations = [{ name: "Local" }, { name: "Overseas" }]

    const isCSPFavorite = (csp) => {
      return favoriteCSPs.value.some((favCSP) => favCSP.id === csp.id);
    };

    const toggleAutoFilter = async () => {
      if (!loggedIn.value) {
        toast.add({
          severity: "info",
          summary: "Info",
          detail: "Please login first",
          life: 3000,
        });
      } else {
        const response = await axios.get(
            `https://smooserve-be.vercel.app/api/student/${studentId}`,
            {}
        );
        console.log(response.data.quizPreference)
        const causes = response.data.quizPreference.passionate_about;
        const skills = response.data.quizPreference.skills;
        const location = response.data.quizPreference.isLocal;


        const auto_filter = csps.value.filter((csp) => {
          return (
              causes.includes(csp.cause) ||
              skills.includes(csp.skills) ||
              location === csp.isLocal
          );
        });
        csps.value = auto_filter;

        // console.log(auto_filter);

        selectedValue4.value = selectedValue4.value === '' ? 'choiceX' : '';
        if (selectedValue4.value === "") {
          csps.value = cspsOriginal.value
        }
      }

    };


    const itemsPerPage = 6;
    const currentPage = ref(1);

    // pagination tools //
    const totalPages = computed(() =>
        Math.ceil(csps.value.length / itemsPerPage)
    );

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
          .get("https://smooserve-be.vercel.app/api/csps")
          .then((response) => {
            csps.value = response.data;
            cspsOriginal.value = response.data;
            console.log(csps.value);
          })
          .catch((error) => {
            console.log(error);
            toast.add({
              severity: "error",
              summary: "Error",
              detail: error,
              life: 3000,
            });
          });
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

      const storedFavoriteCSPs = localStorage.getItem("favoriteCSPs");
      if (storedFavoriteCSPs) {
        favoriteCSPs.value = JSON.parse(storedFavoriteCSPs);
      }
    });

    // const filterCsp = () => {
    //   console.log("Selected Cause:", selectedValue1.value);
    //   console.log("Selected Skill:", selectedValue2.value);
    //   console.log("Selected Location:", selectedValue3.value);
    //   if (!csps.original) {
    //     // Store the original csps array if it's not already stored
    //     csps.original = csps.value.slice();
    //   }
    //   if (csps.value.length === csps.original.length) {
    //     const filteredCsps = csps.value.filter((csp) => {
    //       const causeMatch =
    //         selectedValue1.value === "" || selectedValue1.value === csp.cause;
    //       const skillsMatch =
    //         selectedValue2.value === "" || selectedValue2.value === csp.skills;
    //       if (selectedValue3.value === 'Local') {
    //         selectedValue3.value = true;
    //       } else {
    //         selectedValue3.value = false;
    //       }
    //       const locationMatch =
    //         selectedValue3.value === "" || selectedValue3 === csp.isLocal;
    //       return causeMatch || skillsMatch || locationMatch;
    //     });
    //     csps.value = filteredCsps;
    //   } else {
    //     // Restore the original csps array if it's already filtered
    //     csps.value = csps.original.slice();
    //   }
    // };
    // const searchByCause = (option) => {
    //   const filteredCause = csps.value.filter((csp) => {
    //     const causeMatch = option.name === csp.causes || option.name === "";
    //     return causeMatch
    //   })
    //   csps.value = filteredCause;
    // }
    // const searchBySkill = (option) => {
    //   const filteredSkill = csps.value.filter((csp) => {
    //     const skillMatch = option.name === csp.skills || option.name === "";
    //     return skillMatch
    //   })
    //   csps.value = filteredSkill;
    // }
    // const searchByLocation = (option) => {
    //   if (option.name === 'Local') {
    //     option.name = true;
    //   } else {
    //     option.name = false;
    //   }
    //   const filteredLocation = csps.value.filter((csp) => {
    //     const locationMatch = option.name === csp.isLocal || option.name === "";
    //     return locationMatch
    //   })
    //   csps.value = filteredLocation;
    // }

    const searchByFilters = (option1, option2, option3) => {
      console.log(option1.name, option2.name, option3.name)
      var location = null;
      const filteredCsps = csps.value.filter((csp) => {
        const causeMatch =
            option1.name === csp.causes || option1.name === "";
        const skillsMatch =
            option2.name === csp.skills || option2.name === "";
        if (option3.name === 'Local') {
          location = true;
        } else {
          location = false;
        }
        const locationMatch =
            location === csp.isLocal || location === "";
        return causeMatch || skillsMatch || locationMatch;
      });
      csps.value = filteredCsps;

    }

    const reset = () => {
      selectedValue1.value = ""
      selectedValue2.value = ""
      selectedValue3.value = ""
      csps.value = cspsOriginal.value
    }

    return {
      csps,
      favoriteCSPs,
      selectedValue1,
      selectedValue2,
      selectedValue3,
      selectedValue4,
      toggleHeartColor,
      toggleAutoFilter,
      cspsOriginal,

      // filterCsp,
      isCSPFavorite,
      studentId,
      favoriteCSPs,
      updateStudent,
      causes,
      skills,
      locations,
      // searchByCause,
      // searchByLocation,
      // searchBySkill,
      searchByFilters,
      reset,

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
  directives: {
    ScrollAnimation
  }
};
</script>

<template>
  <!-- navbar component -->
  <Toast></Toast>
  <NavBar />

  <!-- headers -->
  <div class="container-fluid">
    <CaroPics />
    <div class="row pb-3">
      <h2 style="
          color: black;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: bold;
          text-align: center;
          margin-top: 30px;
          font-size: 2rem;
        ">
        What's happening in Smooserve
      </h2>
    </div>

    <!-- Instructions card -->
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
      <div class="grid">
        <div v-scroll-animation="'second-page'" class="col-12 md:col-4 mb-4 px-5">
          <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
            <i v-scroll class="pi pi-search text-4xl text-blue-700"></i>
          </span>
          <div v-scroll class="text-900 text-xl mb-3 font-medium">Step 1</div>
          <span v-scroll class="text-700 line-height-3">
            Ready to start your CSP search? Take a look at the displayed CSP's
            below that were filtered according to your quiz results!
          </span>
        </div>
        <div v-scroll-animation="'second-page'" class="col-12 md:col-4 mb-4 px-5">
          <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
            <i v-scroll class="pi pi-sliders-v text-4xl text-blue-700"></i>
          </span>
          <div v-scroll class="text-900 text-xl mb-3 font-medium">Step 2</div>
          <span v-scroll class="text-700 line-height-3">
            Not too satisfied with what you are seeing? Fret not as you can
            choose to manually filter the CSPs using our filter functions, or
            use our convenient auto-filter feature, but not both at once.
          </span>
        </div>
        <div v-scroll-animation="'second-page'" class="col-12 md:col-4 mb-4 px-5">
          <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
            <i v-scroll class="pi pi-heart text-4xl text-blue-700"></i>
          </span>
          <div v-scroll class="text-900 text-xl mb-3 font-medium">Step 3</div>
          <span v-scroll class="text-700 line-height-3">
            Found the CSP of your dreams? Go ahead and favourite the CSP using
            the heart icons on the back of the CSP cards! You can also click the
            'See More' button to find out more about the individual CSP's!
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
  <div class="container-fluid">
    <div class="col-12 mb-5 p-2 md:p-8" style="
        border-radius: 20px;
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0.6)
          ),
          radial-gradient(
            77.36% 256.97% at 77.36% 57.52%,
            #b6afef 0%,
            #0073ff 100%
          );
      ">

      <div class="flex flex-column justify-content-center align-items-center text-center px-3">
        <h1 class="text-gray-900 ">Community Service Projects</h1>
      </div>

      <div class="grid align-items-center justify-content-center">
        <div class="grid">
          <div class="w-full card-container align-items-center justify-content-center sm:gap-3 lg:gap-0">
            <div class="flex align-items-center justify-content-center col-12 lg:col-3">
              <Dropdown v-model="selectedValue1" editable :options="causes" optionLabel="name"
                        placeholder="Select a Cause" />
            </div>

            <div class="flex align-items-center justify-content-center col-12 lg:col-3">
              <Dropdown v-model="selectedValue2" editable :options="skills" optionLabel="name"
                        placeholder="Select a Skill" />
            </div>

            <div class="flex align-items-center justify-content-center col-12 lg:col-3 lg:mr-5">
              <Dropdown v-model="selectedValue3" editable :options="locations" optionLabel="name"
                placeholder="Select a location" />
            </div>
            <div class="flex align-items-center justify-content-center col-12 lg:col-2">
              <Button rounded icon="pi pi-search" label="Search" style="margin-left: 8px; min-width: 100px;"
                      @click="searchByFilters(selectedValue1, selectedValue2, selectedValue3)"></Button>
              <Button rounded label="Reset" icon="pi pi-sync" style="margin-left: 8px; min-width: 100px;"
                      @click="reset"></Button>
            </div>
          </div>

        </div>
        <div class=" flex align-items-center  justify-content-center ">
          <h3 class="text-gray-900 px-2">Auto Filter:</h3>
          <Button @click="toggleAutoFilter" rounded style="text-align: center;">
            {{ selectedValue4 === "" ? "Off" : "On" }}
          </Button>
        </div>
      </div>
    </div>
  </div>

  <!-- CSP flip cards -->
  <div class="container-fluid mx-3">
    <div class="grid">
      <div class="card-container mt-5">
        <div class="flex align-items-center justify-content-center pb-5 sm:col-12 md:col-6 lg:col-4"
             v-for="(csp, index) in getVisibleCsps" :key="csp.id">
          <div v-scroll-animation="'first-page'" class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img :src="csp.posterURL" :alt="`CSP ${csp.id}`" />
              </div>
              <div class="flip-card-back align-items-end">
                <div class="heart-container">
                  <i class="fas fa-heart clickable" :class="{ 'heart-red': isCSPFavorite(csp) }"
                     @click="toggleHeartColor(csp)"></i>
                </div>
                <div class="text-center">
                  <img v-if="csp.imageURL != ''" :src="csp.imageURL" style="border-radius: 50%; width: 150px"
                       :alt="`CSP ${csp.id}`" />
                  <!-- <Avatar
            v-if="csp.imageURL != ''"
            shape="circle"
            size="xlarge"
            :image="csp.imageURL"
            :style="{
              backgroundColor: '#fafafa',
              width: '6rem',
              height: '6rem',
              border: '2px solid #d5d9ef',
            }"
          /> -->
                  <Avatar v-else :label="Array.from(csp.title)[0]" shape="circle" size="xlarge" :style="{
                    backgroundColor: '#3F51B5',
                    color: '#ffffff',
                    width: '8rem',
                    height: '8rem',
                  }" />
                  <h1>{{ csp.title }}</h1>
                  <p class="card-description">{{ csp.desc }}</p>

                  <!-- see more button link to linktree  -->
                  <router-link :to="{ name: 'CSP', params: { id: csp.id } }"><Button label="See More"
                                                                                     rounded></Button></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination Controls with Styling -->
  <div class="pagination mb-5">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">
      Prev
    </button>
    <span v-for="page in totalPages" :key="page">
      <button @click="goToPage(page)" :class="{ active: page === currentPage }" class="pagination-button">
        {{ page }}
      </button>
    </span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">
      Next
    </button>
  </div>

  <Footer />
</template>

<style>
/* animation */
.before-enter-flip {
  opacity: 0;
  transform: scale(0.5) rotateZ(-25deg);
  transition: all 1s ease-out;
}

/*
  If the element intersects with the viewport, the before-enter class is added.
*/
.enter-flip {
  opacity: 1;
  transform: scale(1) rotateZ(0deg);
}
.before-pf {
  opacity: 0;
  transform: translateY(100px);
  transition: all 2s ease-out;
}

/* 
  If the element intersects with the viewport, the before-enter class is added.
*/
.pf {
  opacity: 1;
  transform: translateY(0px);
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

/* .dropdown select {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: normal;
} */
/* .dropdown-container {
  margin-right: 10px;
  /* Set the right margin to space out the dropdown lists 
} */

@media (min-width: 768px) {
  .md\:w-14rem {
    width: 14rem;
    /* Set the desired width for medium-sized screens */
  }
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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

/* .dropdown {
  display: inline;
  margin-right: 15px;
  border-radius: 15px;
  overflow: hidden;
}

.dropdown label {
  font-size: 25px;
  padding: 5px;
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
} */

/* navbar */
/* .navbar {
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

/* logo */
.logo {
  width: 250px;
  cursor: pointer;
}

/* the search and login */
/* .navbar ul li {
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
  /* Align items to the left by default 
}

@media (max-width: 991.98px) {
  .navbar-list {
    padding-left: 0px;
    /* Align items to the right when the page is collapsed 
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
  content: "";
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
} */

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
  border: 1px solid grey;
}

/* Style the back side */
.flip-card-back {
  background-color: #ffffff;
  border: 1px solid grey;
  color: black;
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



.p-galleria .p-galleria-indicators .p-galleria-indicator.p-highlight button {
  background-color: #0053a6;
}
</style>

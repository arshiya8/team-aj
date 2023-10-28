<template>
  <Toast></Toast>
  <div v-if="loading" class="card">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else class="surface-ground flex flex-column w-full h-screen">
      <div class="grid align-items-center justify-content-center">
          <div class="col-12 md:col-12 lg:col-6">
              <Card class="p-3 mt-4 mb-4 card">
                  <template #title style="text-align: center;">Profile</template>
                  <template #content>
                      <div class="grid align-items-center justify-content-center mb-3">
                          <div class="col-12 md:col-4 lg:col-3 mb-3">
                              <Avatar v-if="profilePicture != ''" shape="circle" size="xlarge" :image="profilePicture"
                                  :style="{ backgroundColor: '#fafafa', width: '6rem', height: '6rem' }" />
                              <Avatar v-else shape="circle" size="xlarge"
                                  :style="{ backgroundColor: '#3F51B5', color: '#ffffff', width: '6rem', height: '6rem' }" />
                          </div>
                          <div class="p-col-12 text-center">
                              <strong>{{ first_name }}</strong>
                              <p v-if="email"> {{ email }}</p>
                              <Button label="Edit profile" @click="editProfile"></Button>
                          </div>
                      </div>
                      <div class="centered-container">
                          <TabView style="width: 100%;">
                              <TabPanel header="Quiz Data" class="centered-tab-panel">
                                  <div v-if="quizPreference">
                                      <!-- Display quiz data fetched from the Quiz Vue component -->
                                      <p><strong>Commitment:</strong> {{ quizPreference.commitment }}</p>
                                      <p><strong>Passionate About:</strong> {{ quizPreference.passionate_about }}
                                      </p>
                                      <p><strong>Self Awareness:</strong> {{ quizPreference.self_awareness }}</p>
                                      <p><strong>Self Description:</strong> {{ quizPreference.self_description }}</p>
                                      <p><strong>Skills:</strong> {{ quizPreference.skills }}</p>
                                      <p><strong>Volunteering Experience:</strong> {{
                                          quizPreference.volunteering_experience }} </p>
                                      <p><strong>Volunteering Location:</strong> {{
                                          quizPreference.volunteering_location }}</p>
                                  </div>
                                  <div v-else>
                                      <p>Loading quiz data...</p>
                                  </div>
                              </TabPanel>
                              <TabPanel header="Registered CSPs" class="centered-tab-panel">
                                  <div class="centered-content">
                                      <h3>No registered CSPs..</h3>
                                  <router-link :to="{ name: 'Home' }"><Button label="Register Now!"></Button></router-link>
                                  </div>
                              </TabPanel>
                              <TabPanel header="Favourites" class="centered-tab-panel">
                                  ....
                              </TabPanel>
                          </TabView>
                          </div>
                  </template>
              </Card>
          </div>
      </div>
      <!-- <div class="flex flex-column gap-3 mb-3 justify-center items-center">
          <TabView style="width: 100%;"> -->
      <!-- <TabPanel header="Quiz Data">
                  <div v-if="quizPreference">
                      Display quiz data fetched from the Quiz Vue component 
                      <p><strong>Commitment:</strong> {{ quizPreference.commitment }}</p>
                      <p><strong>Passionate About:</strong> {{ quizPreference.passionate_about }}
                      </p>
                      <p><strong>Self Awareness:</strong> {{ quizPreference.self_awareness }}</p>
                      <p><strong>Self Description:</strong> {{ quizPreference.self_description }}</p>
                      <p><strong>Skills:</strong> {{ quizPreference.skills }}</p>
                      <p><strong>Volunteering Experience:</strong> {{
                          quizPreference.volunteering_experience }} </p>
                      <p><strong>Volunteering Location:</strong> {{
                          quizPreference.volunteering_location }}</p>
                  </div>
                  <div v-else>
                      <p>Loading quiz data...</p>
                  </div>
              </TabPanel> -->
      <!-- <TabPanel header="Registered CSPs">
                  <h3>No registered CSPs..</h3>
                  <router-link :to="{ name: 'Home' }"><Button label="Register Now!"></Button></router-link>
              </TabPanel>
              <TabPanel header="Favourites">
                  ....
              </TabPanel>
          </TabView>
      </div> 
       profile -->
      <Dialog v-model:visible="visible" :style="{ width: '80vw' }">
          <div class="grid align-items-center justify-content-center">
              <div class="col-12 md:col-12 lg:col-6">
                  <Card class="p-3 mt-4 mb-4 card">
                      <template #title>Edit Profile</template>
                      <template #content>
                          <div class="grid align-items-center justify-content-center mb-3">
                              <div class="col-12 md:col-4 lg:col-3 mb-3">
                                  <Avatar v-if="profilePicture != ''" shape="circle" size="xlarge" :image="profilePicture"
                                      :style="{ backgroundColor: '#fafafa', width: '6rem', height: '6rem' }" />
                                  <Avatar v-else shape="circle" size="xlarge"
                                      :style="{ backgroundColor: '#3F51B5', color: '#ffffff', width: '6rem', height: '6rem' }" />
                              </div>
                              <div class="col-12 md:col-8 lg:col-9 mb-3">
                                  <div class="grid">
                                      <Button rounded @click="add()"
                                          class="w-full align-items-center justify-content-center mb-3"><i
                                              class="pi pi-plus px-2"></i><span class="px-2">Pick an Image</span></Button>
                                      <Button rounded outlined @click="remove()"
                                          class="w-full align-items-center justify-content-center"><i
                                              class="pi pi-trash px-2"></i><span class="px-2">Remove</span></Button>
                                  </div>
                              </div>
                          </div>

                          <div class="flex flex-column gap-3 mb-3">
                              <label for="title">Username</label>
                              <InputText id="title" :value="first_name" v-model="first_name" />

                              <label for="desc">Description</label>
                              <Textarea id="desc" :value="desc" v-model="desc" rows="5" cols="30" />
                          </div>
                          <Button text rounded label="Save" @click="save()"
                              class="w-full align-items-center justify-content-center"><i
                                  class="pi pi-save px-2"></i>Save</Button>
                      </template>
                  </Card>
              </div>
          </div>
      </Dialog>

  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import ShopCarousel from '../../components/ShopCarousel.vue';
import CSPCarousel from '../../components/CSPCarousel.vue';

// import { db, storage } from "@/firebase";

const backgroundImage = ref("/layout/images/landing-img1.jpg"); // Set this to the URL of your background image

const backgroundImageStyle = computed(() => {
    return {
        backgroundImage: `url(${backgroundImage.value})`,
        backgroundSize: "cover", // Adjust the background size as needed
        backgroundPosition: "center", // Adjust the background position as needed
    };
});
const storage = getStorage();

const toast = useToast();

const route = useRoute();
const auth = getAuth();
let studentId = null;

const visible = ref(false);
const user = ref([]);

const loading = ref(true);

const buttonColor = ref("");
const student = ref([]);
const profilePicture = ref("");
const backgroundPicture = ref("");
const first_name = ref('');
const quizPreference = ref(['']);
const favCSPs = ref([]);
const name = ref('');
const email = ref('');
const contact = ref('');

const options = ref(['Quiz Data', 'Registered CSPs', 'Favourites']);

function add() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
          uploadImage(file);
      }
  };

  input.click();
}

function remove() {
  profilePicture.value = "";
  user.value.profilePicture = "";
}

const editProfile = () => {
  visible.value = true;
};


const uploadImage = async (file) => {
  try {
      const storageRef = sRef(storage, `studentPics/${studentId}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the profile picture URL in Firestore
      await updateDoc(doc(db, "students", studentId), {
          profilePicture: downloadURL,
      });

      // Update the profile picture in the local state
      profilePicture.value = downloadURL;

      // Show success toast message
      toast.add({
          severity: "success",
          summary: "Image Uploaded",
          detail: "Image has been uploaded successfully!",
          life: 3000,
      });
  } catch (error) {
      console.error("Error uploading image:", error);
      // Show error toast message
      toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error uploading image. Please try again later.",
          life: 3000,
      });
  }
};



onAuthStateChanged(auth, async (student) => {
  if (student) {
      try {
          loading.value = false;
          const querySnapshot = await getDocs(collection(db, "students"));
          querySnapshot.forEach((doc) => {
              const studentEmail = doc.data().email;
              if (studentEmail === student.email) {
                  studentId = doc.id;
              }
          });

          // If studentId is still null, no matching email was found in the collection
          if (studentId === null) {
              console.log("No matching id found in the database.");
          } else {
              console.log("Student ID found:", studentId);
              const response = await axios.get(`http://localhost:8080/api/student/${studentId}`, {
              });
              first_name.value = response.data.first_name;
              email.value = response.data.email;
              contact.value = response.data.contact;
              quizPreference.value = response.data.quizPreference;
              favCSPs.value = response.data.favoriteCsps;
              console.log(response.data)

          }
      } catch (error) {
          console.error(error);

      }
  } else {
      // localStorage.remove('userProfile');
      studentId = null;

  }
});

function save() {
  loading.value = true;
  const data = {
      profilePicture: profilePicture.value,
      first_name: first_name.value,
  };
  axios
      .put(`https://localhost:8080/api/student/${studentId}`, data)
      .then((response) => {
          toast.add({
              severity: "success",
              summary: "Done",
              detail: response.statusText,
              life: 3000,
          });
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
      .finally(() => (loading.value = false));
}

onMounted(async () => {
  axios
      .get(`https://localhost:8080/api/student/${studentId}`)
      .then((response) => {
          student.value = response.data;
          profilePicture.value = student.profilePicture;
          first_name.value = student.first_name;
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
      .finally(() => (loading.value = false));
});
watch(
  () => buttonColor,
  (newColor) => {
      // Watch for changes in the buttonColor value and update the button background color
      const buttons = document.querySelectorAll(".selectBtns");
      buttons.forEach((button) => {
          button.style.backgroundColor = newColor;
      });
  }
);
</script>
<style scoped>
.card {
  border-radius: 12px;
}

.centered-content {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
}

.centered-container {
display: flex;
justify-content: center;
align-items: center;
height: 100%;
}
</style>

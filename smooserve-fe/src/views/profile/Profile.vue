<template>
    <NavBar />
    <Toast></Toast>
    <div v-if="loading" class="card">
        <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
    <div v-else>
        <!-- Background Image Container -->
        <div class="background-container" :style="backgroundImageStyle">
            <!-- blue-background style defined in styles -->
            <div class="grid align-items-center justify-content-center blur-background">
                <div class="col-12 md:col-12 lg:col-6">
                    <Card class="p-3 mt-4 mb-4 card container-fluid">
                        <!-- Header for bg image, avatar, name, and email -->
                        <template class="container-fluid" #header style="text-align: center; position: relative;">
                            <!-- div for bg image -->
                            <div class="row justify-content-center">
                                <img alt="csp image"
                                    src="https://images.photowall.com/interiors/61939/landscape/wallpaper/room106.jpg?w=2000&q=80"
                                    class="col-12" />
                            </div>

                            <!-- div for avatar -->
                            <div class="row text-center" style="transform: translate(0, -60%);">
                                <Avatar v-if="profilePicture !== ''" shape="circle" size="xlarge" :image="profilePicture"
                                    :style="{ backgroundColor: '#fafafa', width: '6rem', height: '6rem' }"
                                    class="col-12 md:col-4 lg:col-3 justify-content-center" />
                                <Avatar v-else shape="circle" size="xlarge"
                                    :style="{ backgroundColor: '#3F51B5', color: '#ffffff', width: '6rem', height: '6rem' }"
                                    class="col-12 md:col-4 lg:col-3 justify-content-center" />
                            </div>

                            <!-- div for name and email -->
                            <div class="row text-center" style="transform: translate(0, -60%); margin-top: 20px;">
                                <strong>{{ displayName }}</strong>
                                <p> {{ email }}</p>
                                <Button label="Edit profile" @click="editProfile"></Button>
                            </div>
                        </template>

                        <template #content style="text-align: center;">
                            <div class="flex flex-column gap-3 mb-3 justify-center items-center">
                                <TabView style="width: 100%;">
                                    <TabPanel header="Quiz Data">
                                        <!-- <div v-if="quizPreference">
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
                                      </div> -->
                                        <div v-scrollanimation class="p-3 mt-2 mb-2 card">
                                            <div class="surface-section">
                                                <div v-scroll class="font-medium text-3xl text-900 mb-3">Volunteering
                                                    Preference
                                                </div>
                                                <div v-scroll class="text-500 mb-5">
                                                    This information will be sent to your registered CSPs. 
                                                </div>
                                                <ul v-if="quizPreference" class="list-none p-0 m-0">
                                                    <li v-scrollanimation
                                                        class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                                        <div v-scroll class="text-500 w-6 md:w-2 font-medium">Commitment
                                                        </div>
                                                        <div v-scroll
                                                            class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 px-4 text-right-sm">
                                                            {{ quizPreference.commitment }}
                                                        </div>
                                                    </li>
                                                    <!-- <li v-scrollanimation 
                                                      class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                                      <div v-scroll class="text-500 w-6 md:w-2 font-medium">Passionate
                                                          About</div>
                                                      <div v-scroll v-for="cause in quizPreference.passionate_about"
                                                      :key="cause.id"
                                                          class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 px-4">
                                                          <Chip :label="cause" class="mr-2 mb-2"></Chip>
                                                      </div>
                                                  </li> -->
                                                    <li v-scrollanimation
                                                        class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                                                        <div v-scroll class="text-500 w-6 md:w-2 font-medium">Passionate
                                                            About</div>
                                                        <div v-scroll class="flex flex-wrap px-4">
                                                            <div v-for="cause in quizPreference.passionate_about"
                                                                :key="cause.id" class="text-900 mr-1 mb-1">
                                                                <Chip :label="cause"></Chip>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li v-scrollanimation
                                                        class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                                        <div v-scroll class="text-500 w-6 md:w-2 font-medium">Past Volunteering Experiences 
                                                        </div>
                                                        <div v-scroll
                                                            class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 px-4 text-right-sm">
                                                            {{ quizPreference.self_awareness }}
                                                        </div>
                                                    </li>
                                                    <li v-scrollanimation
                                                        class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                                        <div v-scroll class="text-500 w-6 md:w-2 font-medium">Self
                                                            Description</div>
                                                        <div v-scroll
                                                            class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 px-4 text-right-sm">
                                                            {{ quizPreference.self_description }}
                                                        </div>
                                                    </li>
                                                    <li v-scrollanimation
                                                        class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                                                        <div v-scroll class="text-500 w-6 md:w-2 font-medium">Skills</div>
                                                        <div v-scroll class="flex flex-wrap px-4">
                                                            <div v-for="skill in quizPreference.skills" :key="skill.id"
                                                                class="text-900 mr-1 mb-1">
                                                                <Chip :label="skill"></Chip>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li v-scrollanimation
                                                        class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                                                        <div v-scroll class="text-500 w-6 md:w-2 font-medium">Preferred
                                                            Volunteering Experience
                                                        </div>
                                                        <div v-scroll class="flex flex-wrap px-4">
                                                            <div v-for="exp in quizPreference.volunteering_experience"
                                                                :key="exp.id" class="text-900 mr-1 mb-1">
                                                                <Chip :label="exp"></Chip>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li v-scrollanimation
                                                        class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                                                        <div v-scroll class="text-500 w-6 md:w-2 font-medium">Location
                                                            Preference</div>
                                                        <div v-scroll class="flex flex-wrap px-4">
                                                            <div v-for="loc in quizPreference.volunteering_location"
                                                                :key="loc.id" class="text-900 mr-1 mb-1">
                                                                <Chip :label="loc"></Chip>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <router-link :to="{ name: 'Quiz' }"><Button v-scrollanimation v-scroll
                                                        label="Retake Quiz"></Button></router-link>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Registered CSPs">

                                        <div v-scrollanimation v-if="registeredCSPs.length === 0"
                                            style="display: flex; flex-direction: column;justify-content: center; align-items: center; margin: 0px auto;">

                                            <h3 v-scroll>No registered CSPs.. </h3>
                                            <router-link :to="{ name: 'Home' }"><Button v-scroll
                                                    label="Register Now!"></Button></router-link>

                                        </div>

                                        <DataTable v-else v-scrollanimation :value="registeredCSPs"
                                            tableStyle="min-width: 50rem">
                                            <Column v-scroll field="title" header="Registered CSP"></Column>
                                            <Column v-scroll field="status" header="Status"></Column>
                                            <Column v-scroll field="link" header="Interview Link">
                                                <template #body="slotProps">
                                                    <a :href="slotProps.data.link" target="_blank">
                                                        <Button v-if="slotProps.data.link" rounded label="Start Zoom" /></a>
                                                </template>
                                            </Column>

                                        </DataTable>
                                    </TabPanel>

                                    <TabPanel header="Favourites">
                                        <TabPanel header="Favourites" class="centered-tab-panel">
                                            <div class="card">
                                                <CSPCarousel />
                                            </div>
                                            <div id="noFavoritesMessage" style="display: none;">You have no favorites
                                                currently.</div>
                                        </TabPanel>
                                    </TabPanel>
                                </TabView>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="visible" :style="{ width: '65vw' }">
            <div class="grid align-items-center justify-content-center">
                <div class="col-12 md:col-12 lg:col-6">
                    <Card class="p-3 mt-4 mb-4 card" style="width: 40vw;">
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
                                        <label for="profilePicture" class="form-label"></label>
                                        <input type="file" style="display: none" id="profilePicture" accept="image/*" />
                                        <Button rounded @click="addPic()"
                                            class="w-full align-items-center justify-content-center mb-3"><i
                                                class="pi pi-plus px-2"></i><span class="px-2">Pick a profile picture
                                            </span></Button>
                                        <Button rounded outlined @click="removePic()"
                                            class="w-full align-items-center justify-content-center"><i
                                                class="pi pi-trash px-2"></i><span class="px-2">Remove</span></Button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-column gap-3 mb-3">
                                <label for="title">Username</label>
                                <InputText id="title" :value="displayName" v-model="displayName" />
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
    <Footer />
</template>


<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import CSPCarousel from '@/components/CSPCarousel.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue'


// import { db, storage } from "@/firebase";
// const tabs = ref([
//   {
//       title: 'Smooserve Shops',
//       content: '',
//   },
//   {
//       title: 'CSPs',
//       content: '',
//   },
// ]);
// onMounted(async () => {
//   // You can fetch your CSP data here, for example:
//   try {
//       getRegisteredCSPs();
//       registeredCSPs.cspName = cspName;
//       registeredCSPs.cspStatus = cspName; // Update this line based on your API response structure
//   } catch (error) {
//       console.error('Error fetching registered CSP data:', error);
//   }
// });
// const registeredCSPs = ref([
//   {
//       cspName: 'CSP Name 1',
//       cspStatus: 'Pending',
//       link: 'Waiting for confirmation...'
//   },
//   {
//       cspName: 'CSP Name 2',
//       cspStatus: 'Schedule',
//       link: 'Link to CSP...'
//   },
//   {
//       cspName: 'CSP Name 3',
//       cspStatus: 'Accepted',
//       link: 'Congratulations!'
//   },
//   // Add more dummy data objects as needed
// ]);
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
// const user = ref([]);

const loading = ref(true);

const buttonColor = ref("");
const student = ref({});
const profilePicture = ref("");
const backgroundPicture = ref("");
const displayName = ref('');
const quizPreference = ref(['']);
const registeredCSPs = ref([]);
const favCSPs = ref([]);
const name = ref('');
const email = ref('');
const contact = ref('');

const options = ref(['Quiz Data', 'Registered CSPs', 'Favourites']);

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
                const response = await axios.get(`https://smooserve-be.vercel.app/api/student/${studentId}`, {
                });
                displayName.value = response.data.displayName;
                email.value = response.data.email;
                contact.value = response.data.contact;
                quizPreference.value = response.data.quizPreference;
                registeredCSPs.value = response.data.registeredCSPs;
                favCSPs.value = response.data.favoriteCsps;
                profilePicture.value = response.data.profilePicture
                console.log(registeredCSPs.value)

            }
        } catch (error) {
            console.error(error);

        }
    } else {
        // localStorage.remove('userProfile');
        studentId = null;

    }
});

const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        profilePicture.value = URL.createObjectURL(file);
    }
};
function selectFile() {
    // Trigger the file input when the button is clicked
    document.getElementById('profilePicture').click();
};



function addPic() {
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



const editProfile = () => {
    visible.value = true;
};

function removePic() {

    profilePicture.value = "";
    student.value.profilePicture = "";

}


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





function save() {
    loading.value = true;
    student.value.profilePicture = profilePicture.value
    student.value.displayName = displayName.value
    console.log(student.value)

    axios
        .put(`https://smooserve-be.vercel.app/api/student/${studentId}`, student.value)
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
<style>
.text-right-sm {
  text-align: left; /* Default alignment, for larger screens */
}

@media screen and (max-width: 640px) {
  .text-right-sm {
    text-align: right; /* Alignment for small screens */
  }
}
.card {
    border-radius: 12px;
}

.blur-background {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    /* For Safari compatibility */
    background-color: rgba(255, 255, 255, 0.7);
    /* Semi-transparent white */
}

.before-enter-flip {
    opacity: 0;
    transform: translateY(100px);
    transition: all 2s ease-out;
}

/* 
  If the element intersects with the viewport, the before-enter class is added.
*/
.enter-flip {
    opacity: 1;
    transform: translateY(0px);
}
</style>

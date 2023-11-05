<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useToast } from "primevue/usetoast";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  limit,
} from "firebase/firestore";
import { getDocumentIdByEmail } from "@/helper/helperFunctions.js";

const toast = useToast();

// const authStore = useAuthStore()
const router = useRouter();

const email = ref("");
const password = ref("");
const checked = ref(false);

const logoUrl = computed(() => {
  return `/layout/images/logo-white.png`;
});

const errorMessage = ref("");

const provider = new GoogleAuthProvider();
const auth = getAuth();

const showErrorToast = () => {
  toast.add({ severity: "error", summary: "Error", detail: errorMessage });
};

const submit = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered");
      router.replace({ name: "Home" });
    })
    .catch((error) => {
      errorMessage.value = error.message;
      showErrorToast();
    });
};

const studGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Successfully registered");

    let data = await getDocumentIdByEmail(result.user.email, "Users");

    console.log(data);
    if (data) {
      //existing user
      if (data.role == "student") {
        router.replace({ name: "Home" });
      } else {
        router.replace({ name: "CSPSetting" });
      }
    } else {
      //first time login
      //redirecting to User page in addStudent function
      addStudent(result);
      addToUserDB(result.user.displayName, result.user.email, "student");
    }
  } catch (error) {
    // Handle Errors
    console.error(error);
    showErrorToast();
  }
};

const cspGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Successfully registered");

    let data = await getDocumentIdByEmail(result.user.email, "Users");

    console.log(data);
    if (data) {
      //existing user
      if (data.role == "student") {
        router.replace({ name: "User" });
      } else {
        router.replace({ name: "CSPSetting" });
      }
    } else {
      //first time login
      //redirecting to CSP page in addCSP function
      await addCSP(result);
      await addToUserDB(result.user.displayName, result.user.email, "csp");
    }
  } catch (error) {
    // Handle Errors
    console.error(error);
    showErrorToast();
  }
};

async function addToUserDB(name, email, role) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Users"), {
    name: name,
    email: email,
    role: role,
  });
}

//To add CSP into db
async function addCSP(result) {
  const data = {
    email: result.user.email,
    title: result.user.displayName,
    igURL: "",
    views: 0,
    telehandle: "",
    registration: {
      registeredStudents: [],
      active: true,
    },
    settings: {
      zoomRefreshToken: "",
      zoomTokenIssueDT: 0,
      zoomAccessToken: "",
      font: {
        "font-family": "Arial",
        "font-colour": "000000",
      },
      urls: [],
      background: {
        "bg-colour": "8f8f8f",
      },
      buttons: {
        "button-font-colour": "000000",
        type: {
          rounded: false,
          value: "outlined",
          outlined: true,
        },
        "button-colour": "c2c2c2",
      },
    },
    skills: "",
    desc: "",
    imageURL: "",
    noOfHours: "",
    posterURL: "",
    signupFormURL: "",
    causes: "",
    isLocal: true,
    location: {
      lat: 0,
      long: 0,
    },
  };
  axios
    .post("https://smooserve-be.vercel.app/api/csp/", data)
    .then(async (response) => {
      let id = await getDocumentIdByEmail(result.user.email, "CSPs", "id");
      console.log("add csp: ");
      console.log(id);

      //redirect to CSP page
      router.replace({ name: "CSP", params: { id } });
      return id;
    })
    .catch((e) => {
      console.log(e);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: e,
        life: 3000,
      });
      return null;
    });
}

// to add student into db
async function addStudent(result) {
  const data = {
    email: result.user.email,
    displayName: result.user.displayName,
    // favoriteCsps: [
    //   {
    //     imageURL: "",
    //     skills: "",
    //     desc: "",
    //     title: "",
    //     id: "",
    //   },
    // ],
    cart: [],
    quizPreference: {
      first_name: "",
      last_name: "",
      teleHandle: "",
      year_of_study: "",
      commitment: "",
      self_awareness: "",
      skills: [],
      self_description: "",
      volunteering_experience: [],
      passionate_about: [],
      volunteering_location: [],
    },
    registeredCSPs: [],
  };
  axios
    .post("https://smooserve-be.vercel.app/api/student/", data)
    .then(async (response) => {
      // redirect to User page
      router.replace({ name: "User" });
    })
    .catch((e) => {
      console.log(e);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: e,
        life: 3000,
      });
    });
}
</script>

<template>
  <Toast></Toast>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid flex-column align-items-center justify-content-center">
      <router-link :to="{ name: 'Home' }"
        ><img
          :src="logoUrl"
          alt="SmooServe logo"
          class="mb-5 w-10rem flex-shrink-0"
      /></router-link>
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div>
            <Divider align="center"  type="solid">
                <span>Sign in with your SMU Google Account</span>
              </Divider>
            <form @submit.prevent="submit">
              <Button
                @click="studGoogleSignIn"
                type="button"
                label="Sign in with Google"
                class="w-full p-3 text-xl p-button-text mb-5"
                rounded
                outlined
                icon="pi pi-google"
              ></Button>
              <!-- <Button
                @click="cspGoogleSignIn"
                type="button"
                label="Sign in with Google (CSP)"
                class="w-full p-3 text-xl p-button-text mb-2"
                rounded
                outlined
                icon="pi pi-google"
              ></Button> -->
              
              

              <div
                class="flex align-items-center justify-content-between mb-5"
              >
                <div class="flex align-items-center">
                  
                </div>
                <a
                  @click="$router.push('LoginCSP')"
                  class="font-medium no-underline ml-8 mr-8 text-right cursor-pointer"
                  style="color: var(--primary-color)"
                  >Are you a CSP? Login here</a
                >
              </div>
              
            </form>
            <br />
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>

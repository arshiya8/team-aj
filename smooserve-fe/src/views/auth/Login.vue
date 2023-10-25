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
import { collection, query, where, getDocs, addDoc, doc, limit } from "firebase/firestore";

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
      router.replace({ name: "User" });
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
    
    let id = await getDocumentIdByEmail(result.user.email, "students");

    if (id) {
      //existing user
      router.replace({ name: "User" });
    } else {
      //first time login
      //redirecting to User page in addStudent function
      addStudent(result);
      addToUserDB(result.user.displayName, result.user.email, "student")
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
    
    let id = await getDocumentIdByEmail(result.user.email, "CSPs");

    if (id) {
      //existing user
      router.replace({ name: "CSP", params: { id } });
    } else {
      //first time login
      //redirecting to CSP page in addCSP function
      await addCSP(result);
      await addToUserDB(result.user.displayName, result.user.email, "csp")
    }
  } catch (error) {
    // Handle Errors
    console.error(error);
    showErrorToast();
  }
};

async function getDocumentIdByEmail(email, collectionName) {
  const q = query(collection(db, collectionName), where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Get the first document (if there are multiple matching)
    const doc = querySnapshot.docs[0];
    // Access the document ID
    return doc.id;
  } else {
    // No matching document found
    return null;
  }
}

async function addToUserDB(name, email, role){
  // Add a new document with a generated id.
const docRef = await addDoc(collection(db, "Users"), {
  name: name,
  country: email,
  role: role
});
}

//To add CSP into db
async function addCSP(result) {
  const data = {
    email: result.user.email,
    isLocal: true,
    noOfHours: "",
    desc: "",
    signupFormURL: "",
    skills: "",
    igURL: "",
    telehandle: "",
    title: result.user.displayName,
    settings: {
      zoomRefreshToken: "",
      zoomAccessToken: "",
      urls: [],
      zoomTokenIssueDT: 0,
      buttons: {
        "button-font-colour": "ffffff",
        type: {
          rounded: true,
          outline: true,
          raised: false,
        },
        "button-colour": "000000",
      },
      registerActive: true,
      font: {
        "font-family": "Arial",
        "font-colour": "000000",
      },
      background: {
        "bg-colour": "ffffff",
      },
    },
    imageURL: "",
    causes: "",
    signupDeadline: "",
  };
  axios
    .post("https://smooserve-be.vercel.app/api/csp/", data)
    .then(async (response) => {
      let id = await getDocumentIdByEmail(result.user.email, "CSPs");
      console.log("add csp: ");
      console.log(id);

      //redirect to CSP page
      router.replace({ name: "CSP", params: { id } });
      return id
    })
    .catch((e) => {
      console.log(e);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: e,
        life: 3000,
      });
      return null
    });
}

// to add student into db
async function addStudent(result) {
  const data = {
    email: result.user.email,
    displayName: result.user.displayName,
    favoriteCsps: [
      {
        imageURL: "",
        skills: "",
        desc: "",
        title: "",
        id: "",
      },
    ],
    quizPreference: {
      commitment: "",
      self_awareness: "",
      skills: [],
      self_description: "",
      volunteering_experience: [],
      passionate_about: [
      ],
      volunteering_location: [],
    },
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
    <div class="flex flex-column align-items-center justify-content-center">
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
            <form @submit.prevent="submit">
              <Button
                @click="studGoogleSignIn"
                type="button"
                label="Sign in with Google (Student)"
                class="w-full p-3 text-xl p-button-text mb-2"
                rounded
                outlined
                icon="pi pi-google"
              ></Button>
              <Button
                @click="cspGoogleSignIn"
                type="button"
                label="Sign in with Google (CSP)"
                class="w-full p-3 text-xl p-button-text mb-2"
                rounded
                outlined
                icon="pi pi-google"
              ></Button>
              <Divider align="center" type="solid">
                <span>or sign in with email</span>
              </Divider>
              <label
                for="email1"
                class="block text-900 text-xl font-medium mb-2"
                >Email</label
              >
              <InputText
                v-model="email"
                id="email1"
                type="text"
                placeholder="Email address"
                class="w-full mb-3"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
              />

              <label
                for="password1"
                class="block text-900 font-medium text-xl mb-2"
                >Password</label
              >
              <Password
                v-model="password"
                id="password1"
                placeholder="Password"
                :toggleMask="true"
                :feedback="false"
                class="w-full mb-3"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
              ></Password>

              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              >
                <div class="flex align-items-center">
                  <Checkbox
                    v-model="checked"
                    id="rememberme1"
                    binary
                    class="mr-2"
                  ></Checkbox>
                  <label for="rememberme1">Remember me</label>
                </div>
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer"
                  style="color: var(--primary-color)"
                  >Forgot password?</a
                >
              </div>
              <Button
                type="submit"
                label="Log In"
                class="w-full p-3 text-xl"
                rounded
              ></Button>
            </form>
            <br />
            <Button
              @click="$router.push('register')"
              type="submit"
              label="Sign Up"
              class="w-full p-3 text-xl p-button-text mr-2 mb-2"
              rounded
            ></Button>
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

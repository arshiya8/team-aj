<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// const authStore = useAuthStore()
const router = useRouter();

const email = ref("");
const password = ref("");
const checked = ref(false);

const logoUrl = computed(() => {
  return `layout/images/logo-white.png`;
});

const errorMessage = ref("");

const provider = new GoogleAuthProvider();
const auth = getAuth();

const showErrorToast = () => {
    toast.add({severity: 'error', summary: 'Error', detail: errorMessage})
}

const submit = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered");
      router.replace({ name: "User" });
    })
    .catch((error) => {
      errorMessage.value = error.message;
      showErrorToast()
    });
};

const googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
        // The signed-in user info.
        // const user = result.user;
      console.log("Successfully registered");
      router.replace({ name: "User" });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      showErrorToast()
    });
};
</script>

<template>
    <Toast></Toast>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <router-link :to="{ name: 'Home' }"><img :src="logoUrl" alt="SmooServe logo" class="mb-5 w-10rem flex-shrink-0" /></router-link>
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
                @click="googleSignIn"
                type="button"
                label="Sign in with Google"
                class="w-full p-3 text-xl p-button-text mr-2 mb-2"
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
                class="w-full md:w-30rem mb-5"
                style="padding: 1rem"
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

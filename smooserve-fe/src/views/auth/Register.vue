<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const router = useRouter()
const checked = ref(false)

const logoUrl = computed(() => {
    return `/layout/images/logo-white.png`;
});

const registerData = reactive({
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password_confirm: "",
})

const errorMessage = ref<string>("")

const register = () => {
    createUserWithEmailAndPassword(getAuth(), registerData.email, registerData.password)
        .then((data) =>{
            console.log("Successfully registered")
            router.replace({name: "Login"})
        }).catch((error) => {
            errorMessage.value = error.message
        })
}

const signInWithGoogle = () => {

}

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <router-link :to="{ name: 'Home' }"><img :src="logoUrl" alt="smooserve logo" class="mb-5 w-10rem flex-shrink-0" /></router-link>
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div id="register">
                        <form @submit.prevent="register">
                            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText v-model="registerData.username" id="username" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem"/>
                        
                        <label for="firstname" class="block text-900 text-xl font-medium mb-2">First Name</label>
                        <InputText v-model="registerData.first_name" id="firstname" type="text" placeholder="First Name" class="w-full md:w-30rem mb-5" style="padding: 1rem"/>
                        
                        <label for="lastname" class="block text-900 text-xl font-medium mb-2">Last Name</label>
                        <InputText v-model="registerData.last_name" id="lastname" type="text" placeholder="Last Name" class="w-full md:w-30rem mb-5" style="padding: 1rem"/>

                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText v-model="registerData.email" id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password v-model="registerData.password" id="password1" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        
                        <label for="passwordConfirm" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
                        <Password v-model="registerData.password_confirm" id="passwordConfirm" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                Have an account? <router-link :to="{ name: 'Login' }"><a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Login</a></router-link>
                            </div>
                        </div>
                        <Button @submit="register" type="submit" label="Sign Up" class="w-full p-3 text-xl"></Button>
                    </form>
                    <br/>
                    <Button @click="signInWithGoogle" type="submit" label="Sign up with Google" class="w-full p-3 text-xl"></Button>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
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

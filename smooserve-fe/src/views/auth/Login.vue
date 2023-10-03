<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// const authStore = useAuthStore()
const router = useRouter()


const email = ref('');
const password = ref('');
const checked = ref(false);

const logoUrl = computed(() => {
    return `layout/images/logo-white.png`;
});

const errorMessage = ref<string>("")


const submit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) =>{
            console.log("Successfully registered")
            router.replace({name: "user"})
        }).catch((error) => {
            errorMessage.value = error.message
        })
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-10rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div>
                        <form @submit.prevent="submit">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText v-model="email" id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password v-model="password" id="password1" placeholder="Password" :toggleMask="true" :feedback="false" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button type="submit" label="Log In" class="w-full p-3 text-xl"></Button>
                    </form>
                    <br/>
                    <Button @click="$router.push('register')" type="submit" label="Sign Up" class="w-full p-3 text-xl p-button-text mr-2 mb-2"></Button>
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

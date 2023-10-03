<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getAuth,onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const isLoggedIn = ref(false)

const auth = getAuth()

const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const email = user.email;
}

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            isLoggedIn.value = true;    
        }else{
            isLoggedIn.value = false;
        }
    })
})

const handleSignOut = () => {
    signOut(auth).then(()=>{
        router.replace({name: "login"})
    })
}

const logoUrl = computed(() => {
    return `layout/images/logo-white.png`;
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, {{ user?.displayName }} {{ user?.email }}!</div>
                        <span class="text-600 font-medium">Email: {{user?.email}}</span>
                        <Button @click="handleSignOut" v-if="isLoggedIn" label="Sign Out" class="w-full p-3 text-xl"></Button>
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

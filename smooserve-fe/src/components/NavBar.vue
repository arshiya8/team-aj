<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAuth,onAuthStateChanged, signOut } from 'firebase/auth';

//login and logout things
const isLoggedIn = ref(false)

const auth = getAuth()

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
        router.replace({name: "Login"})
    })
}

//primevue things
const smoothScroll = (id) => {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};

const logoUrl = computed(() => {
    return `layout/images/logo-white.png`;
});
</script>
<template>
    <div class="surface-0 flex justify-content-center">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
                <a class="flex align-items-center" href="#"> <img :src="logoUrl" alt="Smooserve Logo" height="80" class="mr-0 lg:mr-2" /><span class="text-900 font-medium text-2xl line-height-3 mr-8"></span> </a>
                <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                    <i class="pi pi-bars text-4xl"></i>
                </a>
                <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px">
                    <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                        <li>
                            <a @click="smoothScroll('#hero')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#features')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple href="favourites.vue">
                                <span>Favourite</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple href="maps.vue">
                                <span>Near you</span>
                            </a>
                        </li>
                    </ul>
                    <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                        <div v-if="isLoggedIn">
                            <Button @click="handleSignOut" label="Sign out" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 "></Button>
                        </div>
                        <div v-else>
                            <router-link :to="{ name: 'Login' }"><Button label="Log in" class="p-button-text p-button-rounded border-none font-light line-height-2"></Button></router-link>
                            <router-link :to="{ name: 'Register' }"><Button label="Sign up" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 "></Button></router-link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
</template>

<style>
#hero {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #eeefaf 0%, #c3e3fa 100%);
    height: 700px;
    overflow: hidden;
}

@media screen and (min-width: 768px) {
    #hero {
        -webkit-clip-path: ellipse(150% 87% at 93% 13%);
        clip-path: ellipse(150% 87% at 93% 13%);
        height: 530px;
    }
}

@media screen and (min-width: 1300px) {
    #hero > img {
        position: absolute;
    }

    #hero > div > p {
        max-width: 450px;
    }
}

@media screen and (max-width: 1300px) {
    #hero {
        height: 600px;
    }

    #hero > img {
        position: static;
        transform: scale(1);
        margin-left: auto;
    }

    #hero > div {
        width: 100%;
    }

    #hero > div > p {
        width: 100%;
        max-width: 100%;
    }
} </style>
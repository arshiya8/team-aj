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
    <nav id="home" class="surface-0 navbar navbar-expand-lg navbar-light bg-light px-5">
        <!-- This is the logo -->
        <a class="flex align-items-start" href="#">
            <img :src="logoUrl" alt="Smooserve Logo" height="80" class="mr-0 lg:mr-2" />
        </a>

        <!-- This is the hamburger menu that appears on mobile -->
        <div class="align-items-center" style="top: 130px">
            <ul class="list-none select-none justify-content-center">
                <li>
                    <a @click="smoothScroll('#hero')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <i class="navbar-icon pi pi-home"></i> <span>HOME</span>
                    </a>
                </li>
                <li>
                    <a @click="smoothScroll('#about')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <i class="navbar-icon pi pi-info-circle"></i> <span>ABOUT US</span>
                    </a>
                </li>
                <li>
                    <a @click="smoothScroll('#highlights')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple href="maps.vue">
                        <i class="navbar-icon pi pi-map-marker"></i><span>NEAR YOU</span>
                    </a>
                </li>
            </ul>
        </div>

        <div v-if="isLoggedIn" class="align-items-end"> <!-- If the user is logged in, show the search and user icons -->
            <!-- Search button currently does nothing -->
            <Button class="p-button-text navbar-icon pi pi-search p-button-rounded border-none font-light line-height-2 pr-3"></Button>
            <Button @click="handleSignOut" class="p-button-text navbar-icon pi pi-user p-button-rounded border-none font-light line-height-2"> 
              <span style="padding-left: 10px; font-size: 0.9em;">LOG OUT</span>
            </Button>
        </div>
        <div v-else class="align-items-end"> <!-- If the user is not logged in, show the login and register buttons -->
            <i class="navbar-icon pi pi-sign-in"></i><router-link :to="{ name: 'Login' }"><Button label="LOG IN" class="p-button-text p-button-rounded border-none font-light line-height-2 pr-3"></Button></router-link>
            <i class="navbar-icon pi pi-user-plus"></i><router-link :to="{ name: 'Register' }"><Button label="SIGN UP" class="p-button-text p-button-rounded border-none font-light line-height-2"></Button></router-link>
        </div>
    </nav>
</template>

<style>

.navbar-icon {
    margin-right: 8px; /* Spacing between the icon and the text */
    font-size: 1.2em; /* Adjust icon size if needed */
}

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
}
</style>

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
  <div class="surface-0 flex justify-content-center items-center py-4">
    <div id="home" class="landing-wrapper overflow-hidden">
      <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
        <div class="d-flex align-items-center">
          <!-- <a href="#">
            <img :src="logoUrl" alt="Smooserve Logo" height="120" class="mr-0 lg:mr-2" />
          </a> -->
          <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-row cursor-pointer">
            <li>
              <a href="#">
            <img :src="logoUrl" alt="Smooserve Logo" height="120" class="mr-0 lg:mr-2" />
          </a>
            </li>
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
                <span>NEAR YOU</span>
              </a>
            </li>
            <li>
              <router-link to="/login" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                <i class="navbar-icon pi pi-sign-in"></i> <span>LOG IN</span>
              </router-link>
            </li>
            <li>
              <router-link to="/register" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                <i class="navbar-icon pi pi-user-plus"></i> <span>SIGN UP</span>
              </router-link>
            </li>
              <div class="d-flex align-items-center ml-auto"> <!-- Push search and profile icons to the right -->
                <li>
                  <i class="pi pi-search" style="font-size: 1.5em; margin-right: 16px;"></i> <!-- Search icon -->
                  <i class="pi pi-user" style="font-size: 1.5em;"></i> <!-- Profile icon -->
                </li>
                   
        </div>
          </ul>
        </div>
        
      </div>
    </div>
  </div>
</template>



<style>
.navbar-icon {
  margin-right: 8px; /* Spacing between the icon and the text */
  font-size: 1.2em; /* Adjust icon size if needed */
}

/* Add styles for search and profile icons */
.d-flex.align-items-center.ml-auto {
  margin-left: auto; /* Push icons to the right */
  margin-right: 16px; /* Add spacing between icons */
}

/* Style Sign Up button similar to other headers */
.p-button-text.ml-5 {
  font-weight: 400;
  text-transform: uppercase;
  color: #333; /* Change the color to match other headers */
  border: none;
  background-color: transparent;
  margin-left: 16px; /* Add spacing between buttons */
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

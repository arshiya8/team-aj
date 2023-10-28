<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const isLoggedIn = ref(false)
const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.replace({ name: "Login" })
  })
}

const smoothScroll = (id) => {
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth'
  });
};

const logoUrl = computed(() => {
  return "layout/images/logo-white.png";
});
</script>

<template>
  <nav id="home" class="surface-0 navbar navbar-expand-lg navbar-light bg-light px-5">
    <!-- Logo -->
    <div class="flex items-center" style="margin-top: 0; margin-bottom: 0;">
    <a class="align-items-start logo" href="#">
      <img :src="logoUrl" alt="Smooserve Logo" height="80" class="mr-0 lg:mr-2" />
    </a>

    <!-- Navigation items and user actions -->
    <div class="navbar-content flex items-center">
      <!-- Navigation items -->
      <ul class="list-none select-none flex">
        <li>
          <a @click="smoothScroll('#hero')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple">
            <i class="navbar-icon pi pi-home"></i> <span>HOME</span>
          </a>
        </li>
        <li>
          <a @click="smoothScroll('#about')"
            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
            <i class="navbar-icon pi pi-info-circle"></i> <span>ABOUT US</span>
          </a>
        </li>
        <li>
          <a @click="smoothScroll('#highlights')"
            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple href="maps.vue">
            <i class="navbar-icon pi pi-map-marker"></i><span>NEAR YOU</span>
          </a>
        </li>
        <li>
          <a @click="smoothScroll('#highlights')"
            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple href="shop.vue">
            <i class="navbar-icon pi pi-shopping-cart"></i><span>SMOOSERVE SHOP</span>
          </a>
        </li>
      </ul>

      <!-- User actions -->
      <div class="align-items-center flex" v-if="isLoggedIn">
        <!-- Search button -->
        <Button class="p-button-text navbar-icon pi pi-search p-button-rounded border-none font-light line-height-2 pr-3"></Button>
        <!-- Log out button -->
        <Button @click="handleSignOut" class="p-button-text p-button-rounded border-none font-light line-height-2 pr-3">
          <span class="icon-label-container">
            <i class="pi pi-sign-out icon-spacing"></i>
            LOG OUT
          </span>
        </Button>
        <!-- User profile link -->
        <router-link :to="{ name: 'Profile' }"><i class="pi pi-user" style="font-size: 1.2rem"></i></router-link>
      </div>
    </div>
  </div>
  </nav>
</template>

<style>
.navbar-icon {
  margin-right: 10px;
  /* Spacing between the icon and the text */
  font-size: 1.2em;
  /* Adjust icon size if needed */
}

.logo {
  margin-right: 100px; /* Add margin to the logo to align it with the tabs */
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
  #hero>img {
    position: absolute;
  }

  #hero>div>p {
    max-width: 450px;
  }
}

@media screen and (max-width: 1300px) {
  #hero {
    height: 600px;
  }

  #hero>img {
    position: static;
    transform: scale(1);
    margin-left: auto;
  }

  #hero>div {
    width: 100%;
  }

  #hero>div>p {
    width: 100%;
    max-width: 100%;
  }
}
</style>

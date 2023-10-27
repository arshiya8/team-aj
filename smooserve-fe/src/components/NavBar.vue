<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

//login and logout things
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
  <nav id="home" class="surface-0 navbar navbar-expand-xl navbar-light bg-light px-5">
    <!-- This is the hamburger menu that appears on mobile -->
    <div class="container-fluid">
      <!-- This is the logo -->
      <a class="navbar-brand" href="#">
        <img :src="logoUrl" alt="Smooserve Logo" height="80" class="mr-0 lg:mr-2" />
      </a>

      <!-- This is the collapsed menu -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarSupportedContent" class="collapse navbar-collapse align-items-start mt-3">
        <ul class="navbar-nav list-none select-none align-items-start d-flex align-items-start w-100">
          <li class="d-flex nav-item flex-grow-1"></li>
          <li class="nav-item">
            <a @click="smoothScroll('#hero')"
              v-ripple>
              <i class="navbar-icon pi pi-home"></i> <span>HOME</span>
            </a>
          </li>
          <li class="nav-item">
            <a @click="smoothScroll('#about')" v-ripple>
              <i class="navbar-icon pi pi-info-circle"></i> <span>ABOUT US</span>
            </a>
          </li>
          <li class="nav-item">
            <a @click="smoothScroll('#highlights')" v-ripple href="maps.vue">
              <i class="navbar-icon pi pi-map-marker"></i><span>NEAR YOU</span>
            </a>
          </li>
          <li class="nav-item">
            <a @click="smoothScroll('#highlights')" v-ripple href="shop.vue">
              <i class="navbar-icon pi pi-shopping-cart"></i><span>SMOOSERVE SHOP</span>
            </a>
          </li>
          <li class="d-flex nav-item flex-grow-1"></li>
          <!-- If the user is logged in, show the search and user icons -->
          <li v-if="isLoggedIn" class="nav-item">
            <div>
              <!-- Search button currently does nothing -->
              <Button
                class="p-button-text navbar-icon pi pi-search p-button-rounded border-none font-light line-height-2 pr-3">
              </Button>
              <Button @click="handleSignOut" class="p-button-text p-button-rounded border-none font-light line-height-2 pr-3">
                <span class="icon-label-container" >
                  <i class="pi pi-sign-out icon-spacing">LOG OUT</i>
                </span>
              </Button>
              <router-link :to="{ name: 'Profile' }"><i class="pi pi-user" style="font-size: 1.2rem"></i></router-link>
            </div>
          </li>
          <li v-else class="nav-item">
            <div> <!-- If the user is not logged in, show the login and register buttons -->
              <i class="navbar-icon pi pi-sign-in"></i><router-link :to="{ name: 'Login' }"><Button label="LOG IN" class="p-button-text p-button-rounded border-none font-light line-height-2 pr-3"></Button></router-link>
              <i class="navbar-icon pi pi-user-plus"></i><router-link :to="{ name: 'Register' }"><Button label="SIGN UP" class="p-button-text p-button-rounded border-none font-light line-height-2"></Button></router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-icon {
  margin-right: 8px;
  /* Spacing between the icon and the text */
  font-size: 1.2em;
  /* Adjust icon size if needed */
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

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
            <div class="container-fluid">
            <img src="../../public/layout/images/banner.jpg" max-width="100%" max-height="100%">
           </div>
            
                
    <!-- body -->
    <div class="container text-center">
        <h1 style="font-weight: bold; margin: 20px 0;">LIBRARY</h1>
        <div>
            
        </div>
    </div>
    
    <!--cards taken from w3schools--> 
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img src="..." alt="CSP1" >
                      </div>
                      <div class="flip-card-back">
                        <div class="text-center">
                            <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
                          </div>
                      </div>
                    </div>
                  </div>
            </div>
            <div class="col">
                <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img src="..." alt="CSP1" >
                      </div>
                      <div class="flip-card-back">
                        <div class="text-center">
                            <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
                          </div>
                      </div>
                    </div>
                  </div>
            </div>
            <div class="col">
                <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img src="..." alt="CSP1" >
                      </div>
                      <div class="flip-card-back">
                        <div class="text-center">
                            <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
                          </div>
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
}
*{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    color: rgba(6,66,115);
}

body{
  background-color: rgb(240, 230, 230);
}

/* navbar */
.navbar{
    width:100%;
    margin:auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}


/* logo */
.logo{
    width:250px;
    cursor: pointer;

}

/* the search and login */
.navbar ul li {
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    position: relative;
}

.navbar ul li a {
    text-decoration: none;
    

}

/* search button */
.search-button {
    background-color: rgba(6,66,115);
    color:white; 
    border: none; 
    border-radius: 25px; 
    padding: 5px 5px; 
    font-size: 16pm;
}

.search{
    border-radius: 10px;
    padding: 5px 5px; 
    border: 2px solid rgba(6,66,115);;
}

.navbar-toggler{
  background-color: rgba(6,66,115);
    
}


/* body */

.navbar-list {
  display: flex;
  padding-left: 190px; /* Align items to the left by default */
}

@media (max-width: 991.98px) {
  .navbar-list {
    padding-left: 0px; /* Align items to the right when the page is collapsed */
  }
}
  .list-inline-item a {
    text-decoration: none;
    text-transform: uppercase;
    color:  rgba(6,66,115);
    font-weight: bold;
    font-size: larger;
    padding: 5px;
  }

  .list-inline-item::after{
    content: '';
    height: 3px;
    width: 0;
    background: rgba(6,66,115);
    position: absolute;
    left: 0;
    bottom: 8;
    transition: 0.5s;    
  }
  @media (min-width: 992px) {
    .list-inline-item:hover::after {
      width: 100%;
    }
  }
  
  @media (max-width: 991.98px) {
    .list-inline-item:hover::after {
      width: 15%;
      bottom: 0;
    }
  }

  .flip-card {
    background-color: transparent;
    width: 350px;
    height: 350px;
    border: 1px solid #f1f1f1;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    border-radius: 15px;
  }
  
  /* This container is needed to position the front and back side */
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  
  /* Do an horizontal flip when you move the mouse over the flip box container */
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  
  /* Position the front and back side */
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    border-radius: 10px;
  }
  
  /* Style the front side (fallback if image is missing) */
  .flip-card-front {
    background-color: rgb(119, 166, 204);
    color: black;
  }
  
  /* Style the back side */
  .flip-card-back {
    background-color: rgb(119, 166, 204);
    color: white;
    transform: rotateY(180deg);
  }

.centralise{
    margin:150px;
}

</style>


<script>
import GoogleMaps from "@/components/GoogleMaps.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
    GoogleMaps,
    Footer,
  },
};
</script>

<template>
  <NavBar />
  <GoogleMaps />
  <Footer />
</template>

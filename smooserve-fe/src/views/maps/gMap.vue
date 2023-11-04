<script>
import GoogleMaps from "@/components/GoogleMaps.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
    GoogleMaps,
    Footer,
  },
};
</script>

<template>
  <Navbar />
  <GoogleMaps />
  <Footer />
</template>

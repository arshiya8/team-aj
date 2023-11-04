<script>
import Navbar from "@/components/Navbar.vue";
import GoogleMaps from "@/components/GoogleMaps.vue";
import Footer from "@/components/Footer.vue";

export default{
    components: {
        Navbar,
        GoogleMaps,
        Footer,
    }
}
</script>

<template>
<Navbar/>
<GoogleMaps/>
<Footer />
</template>
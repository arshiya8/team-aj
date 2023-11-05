<template>
    <NavBar/>
    <h1 style="text-align: center;"> Payment Cancelled!</h1>
    <p style="text-align: center;">Go back to shop page to access re-try</p>
   <Footer/>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default{
    components: {
        NavBar,
        Footer
    }
}
</script>
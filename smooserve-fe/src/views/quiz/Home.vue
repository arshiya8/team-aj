<script>
import NavBar from "/src/components/NavBar.vue";

import Card from 'primevue/card';

export default {
  components: {
    NavBar,
  },
}
</script>


<template>
    <NavBar />

    <div class="card flex align-items-center justify-content-center">
        <Card style="width: 25em; background-color: lightblue; color:black">
            <template #title> VOLUNTEER PERSONALITY TEST </template>
            <template #subtitle> To establish which volunteering work suits you the best </template>
            <template #content>
                <p>
                    Fret not, answer truthfully and we will help match you to the CSP of your dream!
                </p>
                <p>
                    Select your preference to personalise your feed
                </p>
            </template>
            <template #footer>
                <router-link :to="{ name: 'Quiz' }"><Button icon="pi pi-check" label="START" /></router-link>
            </template>
        </Card>
    </div>
</template>


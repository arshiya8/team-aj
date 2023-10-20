<template>
    <div>
        <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="{ lat: lat, lng: lng }" :zoom="15">
            <Marker :options="{ position: { lat: lat, lng: lng } }" />
            <!-- <Marker :options="{ position: { lat: lat + 0.001, lng: lng } }" /> -->
        </GoogleMap>
    </div>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
    // methods: {
    //     useGeolocation() {
    //         const coords = ref({ latitude: 0, longitude: 0 })
    //         const isSupported = 'navigator' in window && 'geolocation' in navigator

    //         let watcher = null
    //         onMounted(() => {
    //             if (isSupported)
    //                 watcher = navigator.geolocation.watchPosition(
    //                     position => (coords.value = position.coords)
    //                 )
    //         })
    //         onUnmounted(() => {
    //             if (watcher) navigator.geolocation.clearWatch(watcher)
    //         })

    //         return { coords, isSupported }
    //     }
    // },
    components: {
        GoogleMap,
        Marker
    },

    data() {
        return {
            apiKey: "AIzaSyDiX0loPVlIkq1M5ujXrbaK3DdL3eBCFio",
            lat: null,
            lng: null,
        }
    },
    created() {
        this.$getLocation()
            .then((coordinates) => {
                this.lat = coordinates.lat;
                this.lng = coordinates.lng;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
</script>
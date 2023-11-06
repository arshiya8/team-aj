<template>
  <div>
    <GoogleMap
      :api-key="apiKey"
      style="width: 100%; height: 600px"
      :center="{ lat: lat, lng: lng }"
      :zoom="15"
    >
      <Marker :options="{ position: { lat: lat, lng: lng } }" :clickable="true">
        <InfoWindow :closeclick="true"> You are here! </InfoWindow>
      </Marker>
      <!-- <Marker :options="{ position: { lat: lat + 0.001, lng: lng } }" />  -->

      <Marker
        v-for="loc in locations"
        :options="{ position: { lat: loc[0], lng: loc[1] } }"
        @click="showCsp(loc)"
      >
      </Marker>
    </GoogleMap>
  </div>

  <div
    v-if="selectedCSP"
    class="p-2 border-round-xl"
    style="
      background: var(--style-cards-fancy-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backgroundblendmode: normal, color-dodge;
      width: 300px;
    "
  >
    <Dialog
      v-model:visible="visible"
      modal
      header="CSP Information"
      :style="{ width: '30vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <div class="content border-round-sm">
        <div
          class="content-image bg-center mb-5"
          style="display: flex; justify-content: center; align-items: center"
        >
          <Avatar
            v-if="selectedCSP.imageURL != ''"
            shape="circle"
            size="xlarge"
            :image="selectedCSP.imageURL"
            :style="{
              backgroundColor: '#fafafa',
              width: '6rem',
              height: '6rem',
              border: '2px solid #d5d9ef',
            }"
          />
          <Avatar
            v-else
            :label="Array.from(selectedCSP.title)[0]"
            shape="circle"
            size="xlarge"
            :style="{
              backgroundColor: '#3F51B5',
              color: '#ffffff',
              width: '6rem',
              height: '6rem',
            }"
          />
          <!-- <img :src="selectedCSP.imageURL" style="border-radius: 50%; width: 15rem; height: 15rem;" /> -->
        </div>
        <div
          class="content-info mt-2 border-round-sm bg-black-alpha-10 shadow-1 py-1"
          style="backdropfilter: blur(27px)"
        >
          <div
            class="flex align-items-center justify-content-between py-2 px-3"
          >
            <span class="font-medium text-black">{{ selectedCSP.title }}</span>
            <i class="pi pi-verified text-black"></i>
          </div>
          <div
            class="flex align-items-center justify-content-between py-2 px-3"
          >
            <span class="font-medium text-black">{{ selectedCSP.desc }}</span>
          </div>
          <div
            class="flex align-items-center justify-content-between py-2 px-3 gap-2"
          >
            <div class="flex align-items-center gap-2">
              <i class="pi pi-star-fill text-black"></i>
              <span
                v-if="selectedCSP.isLocal"
                class="font-small text-black black-space-nowrap"
                >Local CSP</span
              >
              <span v-else class="font-small text-black black-space-nowrap"
                >Overseas CSP</span
              >
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-between py-2 px-3 gap-2"
          >
            <div
              class="flex align-items-center justify-content-center gap-1 border-right-1 surface-border pr-2"
            >
              <!-- <i class="pi pi-bolt text-black"></i> -->
              <span class="font-small text-black black-space-nowrap">{{
                selectedCSP.skills
              }}</span>
            </div>
            <div
              class="flex align-items-center gap-1 justify-content-center gap-1 border-right-1 surface-border px-2"
            >
              <!-- <i class="pi pi-wifi text-black"></i> -->
              <span class="font-small text-black black-space-nowrap">{{
                selectedCSP.causes
              }}</span>
            </div>
          </div>
        </div>
        <div class="flex align-items-center justify-content-center mt-2 gap-2">
          <Button
            @click="goToCSP(selectedCSP.id)"
            rounded
            class="w-full p-3 text-xl mt-3"
            style="backdropfilter: blur(27px)"
            label="See More!"
          >
          </Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

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
    Marker,
    InfoWindow,
  },

  data() {
    return {
      apiKey: "AIzaSyDiX0loPVlIkq1M5ujXrbaK3DdL3eBCFio",
      lat: null,
      lng: null,
    };
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
  },
  methods: {
    // var geocoder = new google.maps.Geocoder();
    // var address = postalCode;
    // geocoder.geocode({ 'address': 'zipcode ' + address }, function (results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         this.latitude = results[0].geometry.location.lat();
    //         this.longitude = results[0].geometry.location.lng();
    //         alert("Latitude: " + latitude + "\nLongitude: " + longitude);
    //     } else {
    //         alert("Request failed.")
    //     }
    // });
    // return latitude, longitude;
  },
  setup() {
    const toast = useToast();
    const csps = ref([]);
    const locations = ref([]);
    const selectedCSP = ref(null);
    const visible = ref(false);
    const router = useRouter();

    onMounted(async () => {
      axios
        .get("https://smooserve-be.vercel.app/api/csps")
        .then(async (response) => {
          csps.value = response.data;
          console.log(csps.value);

          for (const csp of csps.value) {
            if (csp.postalCode) {
              getCoordinatesMarkerOptions(csp, csp.postalCode);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 3000,
          });
        });
    });

    const goToCSP = (CSPid) => {
      router.push({ name: "CSP", params: { id: CSPid } });
    };

    async function getCoordinatesMarkerOptions(csp, postalCode) {
      const { latitude, longitude } = await getCoordinates(postalCode);
      // console.log(latitude, longitude)
      locations.value.push([latitude, longitude, csp]);
    }

    async function getCoordinates(postalCode) {
      const apiKey = "AIzaSyDiX0loPVlIkq1M5ujXrbaK3DdL3eBCFio";
      try {
        const response = await fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            postalCode +
            "&key=" +
            apiKey
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const latitude = data.results[0].geometry.location.lat;
          const longitude = data.results[0].geometry.location.lng;
          // console.log({ latitude, longitude });
          return { latitude, longitude };
        } else {
          throw new Error("Invalid postal code");
        }
      } catch (error) {
        console.error(error);
        return { latitude: 0, longitude: 0 };
      }
    }

    function showCsp(loc) {
      visible.value = true;
      const info = loc[2];
      selectedCSP.value = info;
      console.log(selectedCSP.value);
    }
    return {
      locations,
      showCsp,
      selectedCSP,
      visible,
      goToCSP,
    };
  },
};
</script>

<style></style>

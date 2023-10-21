<template>
  <!-- Your Vue template here -->

  <toast></toast>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else>
    <button @click="scheduleZoomMeeting">Schedule Zoom Meeting</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
const route = useRoute();
const loading = ref(true);

const toast = useToast();

onMounted(async () => {
  // Access the current URL

  const currentURL = window.location.href;

  // Parse the URL to extract query parameters
  const urlParams = new URLSearchParams(currentURL);

  // Access the access_token and refresh_token from the query parameters
  const accessToken = urlParams.get("access_token");
  const refreshToken = urlParams.get("refresh_token");

  // If access_token or refresh_token is missing, redirect to zoomAuth
  if (!accessToken && !refreshToken) {
    window.location.href = "http://localhost:8080/api/zoomAuth";
  } else {
    // Now, you have the access_token and refresh_token for further use
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    updateTokens(accessToken, refreshToken);
  }
});


const updateTokens = async (accessToken, refreshToken) => {
  const csp = [];

  const CSPid = localStorage.getItem("CSPid");
  axios
    .get("https://smooserve-be.vercel.app/api/csp/" + CSPid)
    .then((response) => {
      csp.value = response.data;

      csp.value.settings.zoomAccessToken = accessToken;
      csp.value.settings.zoomRefreshToken = refreshToken;

      axios
        .put("https://smooserve-be.vercel.app/api/csp/" + CSPid, csp.value)
        .then((response) => {
          toast.add({
            severity: "success",
            summary: "Done",
            detail: response.statusText,
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 3000,
          });
        })
        .finally(() => {
          loading.value = false;

        });
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
};

function scheduleZoomMeeting() {
 // Access the current URL

 const currentURL = window.location.href;

// Parse the URL to extract query parameters
const urlParams = new URLSearchParams(currentURL);

// Access the access_token and refresh_token from the query parameters
const accessToken = urlParams.get("access_token");
const refreshToken = urlParams.get("refresh_token");

if (!accessToken && !refreshToken) {
    window.location.href = "http://localhost:8080/api/zoomAuth";
  } else {
    // Now, you have the access_token and refresh_token for further use
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    axios
        .post("http://localhost:8080/api/createMeeting", {accessToken: accessToken})
        .then((response) => {
          toast.add({
            severity: "success",
            summary: "Done",
            detail: response.statusText,
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 3000,
          });
        })
  }

  return;
}

</script>

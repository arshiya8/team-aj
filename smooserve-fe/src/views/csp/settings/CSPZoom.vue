<script setup>
import axios from "axios";
import CSPNavbar from "../CSPNavBar.vue";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
const router = useRouter();
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

  // check if db have access/refresh token
  const cspTokens = await getTokens();
  const dbAccessToken = cspTokens.settings.zoomAccessToken;
  const dbRefreshToken = cspTokens.settings.zoomRefreshToken;

  if (dbAccessToken && dbRefreshToken && !accessToken && !refreshToken) {
    window.location.href =
      "https://smooserve-be.vercel.app/api/getNewAccessToken/" + dbRefreshToken;
  } else if (accessToken && refreshToken) {
    updateTokens(accessToken, refreshToken);
    router.push({ name: "CSPSetting" });

  } else {
    window.location.href = "https://smooserve-be.vercel.app/api/zoomAuth";
  }
});

const getTokens = async () => {
  const CSPid = localStorage.getItem("CSPid");
  const cspTokens = await axios
    .get("https://smooserve-be.vercel.app/api/csp/" + CSPid)
    .then((response) => {
      const cspData = response.data;
      return cspData;
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
  return cspTokens;
};
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
    window.location.href = "https://smooserve-be.vercel.app/api/zoomAuth";
  } else {
    // Now, you have the access_token and refresh_token for further use
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    axios
      .post("https://smooserve-be.vercel.app/api/createMeeting", {
        accessToken: accessToken,
      })
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
      });
  }

  return;
}
</script>

<template>

  <toast></toast>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else>
    <CSPNavbar />
    <Button @click="scheduleZoomMeeting">Schedule Zoom Meeting</Button>
  </div>
</template>

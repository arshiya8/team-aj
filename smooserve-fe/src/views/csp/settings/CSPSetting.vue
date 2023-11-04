<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CSPNavbar from "@/views/csp/CSPNavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";
import { getDocumentIdByEmail } from "@/helper/helperFunctions.js";

const auth = getAuth();
const storage = getStorage();

const toast = useToast();

const router = useRouter();

const CSPid = ref();

const list = ref([]);

const csp = ref([]);

const loading = ref(true);
const registerChecked = ref(false);

const CSPImage = ref("");
const CSPPoster = ref("");
const desc = ref("");
const title = ref("");

const datetime12h = ref();

// zoom things
const zoomTimeSelected = ref(60);
const zoomTimeOptions = ref([30, 60]);
const dbAccessToken = ref("");
const dbRefreshToken = ref("");
const meetingsList = ref();

const zoomRegisterVisible = ref(false);

const causes = ref([
    'Environment',
    'Education',
    'Youth Development',
]);

const selectedCause = ref();
const postalCode = ref();
const selectedSkills = ref();

const skills = ref([
    'Teaching',
    'Event Planning',
    'Communication',
]);

const isLocal = ref(true);

function add(purpose) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file, purpose);
    }
  };

  input.click();
}

function remove(purpose) {
  if (purpose == "profile") {
    CSPImage.value = "";
    csp.value.imageURL = "";
  } else if (purpose == "poster") {
    CSPPoster.value = "";
    csp.value.posterURL = "";
  }
}

const uploadImage = async (file, purpose) => {
  try {
    if (purpose == "profile") {
      var storageRef = sRef(storage, `images/${CSPid.value}/${file.name}`);
    } else {
      var storageRef = sRef(storage, `poster/${CSPid.value}/${file.name}`);
    }

    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update csp.imageURL with the new URL
    if (purpose == "profile") {
      csp.value.imageURL = downloadURL;
      CSPImage.value = downloadURL;
    } else {
      csp.value.posterURL = downloadURL;
      CSPPoster.value = downloadURL;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.add({
      severity: "error",
      summary: "Error Uploading Image",
      detail: error,
      life: 3000,
    });
  }
};

function save() {
  loading.value = true;
  csp.value.title = title.value;
  csp.value.desc = desc.value;
  csp.value.registration.active = registerChecked.value;
  csp.value.isLocal = isLocal.value;
  csp.value.causes = selectedCause.value;
  csp.value.skills = selectedSkills.value;
  csp.value.postalCode = postalCode.value;

  axios
    .put("https://smooserve-be.vercel.app/api/csp/" + CSPid.value, csp.value)
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
    .finally(() => (loading.value = false));
}

onMounted(async () => {
  // check if db have access/refresh token
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      loading.value = true;
      CSPid.value = await getDocumentIdByEmail(user.email, "CSPs", "id");
      console.log(CSPid.value);

      // check if is student
      let data = await getDocumentIdByEmail(user.email, "Users");
      if (data.role == "student") {
        router.replace({ name: "Home" });
      }

      await axios
        .get("https://smooserve-be.vercel.app/api/csp/" + CSPid.value)
        .then(async (response) => {
          csp.value = response.data;
          response.data.settings.urls
            ? (list.value = response.data.settings.urls)
            : (list.value = []);
          CSPImage.value = csp.value.imageURL;
          CSPPoster.value = csp.value.posterURL;
          response.data.registration.active
            ? (registerChecked.value = response.data.registration.active)
            : (registerChecked.value = false);

          isLocal.value = csp.value.isLocal;
          selectedCause.value = csp.value.causes;
          selectedSkills.value = csp.value.skills;
          postalCode.value = csp.postalCode;
          desc.value = csp.value.desc;
          title.value = csp.value.title;


          dbAccessToken.value = response.data.settings.zoomAccessToken;
          dbRefreshToken.value = response.data.settings.zoomRefreshToken;
          if (dbAccessToken.value && dbRefreshToken.value) {
            zoomRegisterVisible.value = false;
            checkIfAccessTokenValid(response.data.settings.zoomTokenIssueDT);
            await getZoomMeetings();
          } else {
            zoomRegisterVisible.value = true;
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
        })
        .finally(() => (loading.value = false));
    } else {
      // User is signed out
      router.push({ name: "Login" });
    }
  });
});

function zoomAccess() {
  localStorage.setItem("CSPid", CSPid.value);
  router.push({ name: "Zoom" });
}

const getZoomMeetings = async () => {
  // Access the access token from your data source, e.g., Vuex or a ref
  const accessToken = dbAccessToken.value;
  console.log(accessToken);

  try {
    const response = await axios.post(
      "https://smooserve-be.vercel.app/api/getMeetings",
      {
        accessToken: accessToken,
      }
    );

    // Handle a successful response
    console.log(response);
    meetingsList.value = response.data;
  } catch (error) {
    // Handle any errors
    console.error(error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};

function checkIfAccessTokenValid(issuedTimestamp) {
  // Sample access token and expires_in values from your response
  const expiresInSeconds = 3600; // Replace with the actual expires_in value from your token

  // Calculate the token's expiration timestamp (in milliseconds)
  const expirationTimestamp = issuedTimestamp + expiresInSeconds * 1000;

  // Get the current timestamp (in milliseconds)
  const currentTimestamp = Date.now();

  if (currentTimestamp < expirationTimestamp) {
    console.log("Access token is still valid.");
  } else {
    console.log("Access token has expired.");
    updateTokens();
  }
}

const updateTokens = async () => {
  const csp = [];

  console.log("fetching new tokens...");
  axios
    .get(
      "https://smooserve-be.vercel.app/api/getNewAccessToken/" +
        dbRefreshToken.value
    )
    .then((response) => {
      toast.add({
        severity: "success",
        summary: "Updating Token for Zoom",
        detail: response.statusText,
        life: 3000,
      });
      dbAccessToken.value = response.data.access_token;
      dbRefreshToken.value = response.data.refresh_token;
      axios
        .get("https://smooserve-be.vercel.app/api/csp/" + CSPid.value)
        .then((response) => {
          csp.value = response.data;

          csp.value.settings.zoomAccessToken = dbAccessToken.value;
          csp.value.settings.zoomRefreshToken = dbRefreshToken.value;
          csp.value.settings.zoomTokenIssueDT = Date.now();

          axios
            .put(
              "https://smooserve-be.vercel.app/api/csp/" + CSPid.value,
              csp.value
            )
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
    });
};
</script>
<template>
  <Toast></Toast>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else class="surface-ground flex flex-column w-full h-full">
    <CSPNavbar />

    <!-- profile -->
    <div class="grid align-items-center justify-content-center">
      <div class="col-12 md:col-12 lg:col-6">
        <Card class="p-3 mt-4 mb-4 card">
          <template #title>CSP Profile</template>
          <template #content>
            <div class="grid align-items-center justify-content-center mb-3">
              <div class="col-12 md:col-4 lg:col-3 mb-3">
                <Avatar
                  v-if="CSPImage != ''"
                  shape="circle"
                  size="xlarge"
                  :image="CSPImage"
                  :style="{
                    backgroundColor: '#fafafa',
                    width: '6rem',
                    height: '6rem',
                    border: '2px solid #d5d9ef',
                  }"
                />
                <Avatar
                  v-else
                  :label="Array.from(csp.title)[0]"
                  shape="circle"
                  size="xlarge"
                  :style="{
                    backgroundColor: '#3F51B5',
                    color: '#ffffff',
                    width: '6rem',
                    height: '6rem',
                  }"
                />
              </div>
              <div class="col-12 md:col-8 lg:col-9 mb-3">
                <div class="grid">
                  <Button
                    rounded
                    @click="add('profile')"
                    class="w-full align-items-center justify-content-center mb-3"
                    ><i class="pi pi-plus px-2"></i
                    ><span class="px-2">Pick an Image</span></Button
                  >
                  <Button
                    rounded
                    outlined
                    @click="remove('profile')"
                    class="w-full align-items-center justify-content-center"
                    ><i class="pi pi-trash px-2"></i
                    ><span class="px-2">Remove</span></Button
                  >
                </div>
              </div>
            </div>

            <div class="flex flex-column gap-3 mb-3">
              <div class="formgrid grid">
                <div class="field col">
                  <label for="title" class="w-full mb-3">Registration {{ registerChecked ? " Open" : " Closed" }}</label>
              <InputSwitch v-model="registerChecked" />
                </div>
                <div class="field col">
                  <label for="title" class="w-full mb-3">{{ isLocal ? " Local" : " Overseas" }}</label>
              <InputSwitch v-model="isLocal" />
                </div>
              </div>
              

              <label for="title">Zoom Scheduler</label>
              <Button
                v-if="zoomRegisterVisible"
                @click="zoomAccess()"
                label="Enable Zoom"
              />
              <Button
                v-else
                disabled
                @click="zoomAccess()"
                label="Zoom Enabled"
              />

              <label for="title">Username</label>
              <InputText id="title" v-model="title" />

              <div class="formgrid grid">
                <div class="field col">
                  <label for="firstname2">Cause</label>
                  <Dropdown v-model="selectedCause" :options="causes" placeholder="Select a Cause" class="w-full" />
                </div>
                <div class="field col">
                  <label for="lastname2">Skills</label>
                  <Dropdown v-model="selectedSkills" :options="skills" placeholder="Select a Skill" class="w-full" />
                </div>
              </div>

              <label for="desc">Description</label>
              <Textarea
                id="desc"
                v-model="desc"
                rows="5"
                cols="30"
              />
              <label for="postalCode">Postal Code</label>
              <InputText id="postalCode"  v-model="postalCode" />

              <label for="Poster">Poster</label>

              <div class="col-12 md:col-8 lg:col-6 mb-3">
                <Image
                  v-if="CSPPoster"
                  :src="CSPPoster"
                  alt="Image"
                  width="250"
                  preview
                />
                <Skeleton v-else width="250px" height="300px"></Skeleton>
              </div>
              <div class="col-12 md:col-4 lg:col-6 mb-3">
                <div class="grid">
                  <Button
                    rounded
                    @click="add('poster')"
                    class="w-full align-items-center justify-content-center mb-3"
                    ><i class="pi pi-plus px-2"></i
                    ><span class="px-2">Pick an Image</span></Button
                  >
                  <Button
                    rounded
                    outlined
                    @click="remove('poster')"
                    class="w-full align-items-center justify-content-center"
                    ><i class="pi pi-trash px-2"></i
                    ><span class="px-2">Remove</span></Button
                  >
                </div>
              </div>
            </div>
            <Button
              text
              rounded
              label="Save"
              @click="save()"
              class="w-full align-items-center justify-content-center"
              ><i class="pi pi-save px-2"></i>Save</Button
            >
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 12px;
}
</style>

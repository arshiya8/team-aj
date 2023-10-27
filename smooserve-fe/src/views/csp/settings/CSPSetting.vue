<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CSPNavbar from "../CSPNavBar.vue";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/firebase";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";

const auth = getAuth();
const storage = getStorage();

const toast = useToast();

const router = useRouter();

const CSPid = ref();

const list = ref([]);

const csp = ref([]);

const loading = ref(true);
const registerChecked = ref(false);

const buttonColor = ref("");

const CSPImage = ref("");

const datetime12h = ref();

// zoom things
const zoomTimeSelected = ref(60);
const zoomTimeOptions = ref([30, 60]);
const dbAccessToken = ref("");
const dbRefreshToken = ref("");
const meetingsList = ref();


function add() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  input.click();
}

function remove() {
  CSPImage.value = "";
  csp.value.imageURL = "";
}

const uploadImage = async (file) => {
  try {
    const storageRef = sRef(storage, `images/${CSPid}/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update csp.imageURL with the new URL
    csp.value.imageURL = downloadURL;
    CSPImage.value = downloadURL;
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
  console.log(csp.value);
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
  const cspTokens = await getTokens();
  dbAccessToken.value = cspTokens.settings.zoomAccessToken;
  dbRefreshToken.value = cspTokens.settings.zoomRefreshToken;
  checkIfAccessTokenValid(cspTokens.settings.zoomTokenIssueDT);
  await getZoomMeetings();
  onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        loading.value = true;
        CSPid.value = await getDocumentIdByEmail(user.email, "CSPs");

        axios
    .get("https://smooserve-be.vercel.app/api/csp/" + CSPid.value)
    .then((response) => {
      csp.value = response.data;
      response.data.settings.urls
        ? (list.value = response.data.settings.urls)
        : (list.value = []);
      CSPImage.value = csp.value.imageURL;
      response.data.registration.active
        ? (registerChecked.value = response.data.registration.active)
        : (registerChecked.value = false);
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
          router.push({ name: 'Login' })
        }
      });
});

async function getDocumentIdByEmail(email, collectionName) {
      const q = query(collection(db, collectionName), where("email", "==", email), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document (if there are multiple matching)
        const doc = querySnapshot.docs[0];
        // Access the document ID
        return doc.id;
      } else {
        // No matching document found
        return null;
      }
    }
    
function scheduleZoomMeeting() {
  axios
    .post("http://localhost:8080/api/createMeeting", {
      accessToken: dbAccessToken.value,
      topic: topic.value,
      duration: zoomTimeSelected.value,
      start_time: formatDateTimeToISOString(datetime12h.value),
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

const getZoomMeetings = async () => {
  // Access the access token from your data source, e.g., Vuex or a ref
  const accessToken = dbAccessToken.value;
  console.log(accessToken);

  try {
    const response = await axios.post("http://localhost:8080/api/getMeetings", {
      accessToken: accessToken,
    });

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
}

const getTokens = async () => {
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

  const CSPid = localStorage.getItem("CSPid");
  console.log("fetching new tokens...");
  axios
    .get("http://localhost:8080/api/getNewAccessToken/" + dbRefreshToken.value)
    .then((response) => {
      toast.add({
        severity: "success",
        summary: "Done",
        detail: response.statusText,
        life: 3000,
      });
      dbAccessToken.value = response.data.access_token;
      dbRefreshToken.value = response.data.refresh_token;
      axios
        .get("https://smooserve-be.vercel.app/api/csp/" + CSPid)
        .then((response) => {
          csp.value = response.data;

          csp.value.settings.zoomAccessToken = dbAccessToken.value;
          csp.value.settings.zoomRefreshToken = dbRefreshToken.value;
          csp.value.settings.zoomTokenIssueDT = Date.now();

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
    });
};

function formatDateTimeToISOString(dateTime) {
  const date = new Date(dateTime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
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
                    @click="add()"
                    class="w-full align-items-center justify-content-center mb-3"
                    ><i class="pi pi-plus px-2"></i
                    ><span class="px-2">Pick an Image</span></Button
                  >
                  <Button
                    rounded
                    outlined
                    @click="remove()"
                    class="w-full align-items-center justify-content-center"
                    ><i class="pi pi-trash px-2"></i
                    ><span class="px-2">Remove</span></Button
                  >
                </div>
              </div>
            </div>

            <div class="flex flex-column gap-3 mb-3">
              <label for="title">Registration</label>
              <InputSwitch v-model="registerChecked" />

              <label for="title">Username</label>
              <InputText id="title" :value="csp.title" v-model="title" />

              <label for="desc">Description</label>
              <Textarea
                id="desc"
                :value="csp.desc"
                v-model="desc"
                rows="5"
                cols="30"
              />
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
        <Card class="p-3 mt-5 mb-4 card">
          <template #title>Zoom Schedule</template>
          <template #content>
            <div
              class="grid align-items-center justify-content-center mb-3"
            ></div>

            <div class="flex flex-column gap-3 mb-3">
              <label for="topic">Meeting Topic</label>
              <InputText id="topic" v-model="topic" />

              <label for="calendar-12h" class="font-bold block">
                12h Format
              </label>
              <Calendar
                id="calendar-12h"
                v-model="datetime12h"
                showTime
                hourFormat="12"
              />

              <SelectButton
                v-model="zoomTimeSelected"
                :options="zoomTimeOptions"
                aria-labelledby="basic"
              >
                <template #option="slotProps">
                  {{ slotProps.option + " min" }}
                </template>
              </SelectButton>
            </div>
            <Button
              text
              rounded
              label="Save"
              @click="scheduleZoomMeeting()"
              class="w-full align-items-center justify-content-center"
              ><i class="pi pi-save px-2"></i>Schedule</Button
            >

            <div class="card">
        <DataTable :value="meetingsList.meetings" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="topic" header="Topic"></Column>
            <Column field="start_time" header="Time"></Column>
            <Column field="join_url" header="Link"></Column>
        </DataTable>
    </div>
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

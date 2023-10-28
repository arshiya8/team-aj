<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CSPNavbar from "../CSPNavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocumentIdByEmail } from "@/helper/helperFunctions.js";

const auth = getAuth();

const toast = useToast();

const router = useRouter();

const CSPid = ref();

const csp = ref([]);

const loading = ref(true);

const visibleInterview = ref(false);
const visibleProfile = ref(false);
const selectedProfile = ref()

const registeredStudents = ref([]);
const selectedStudent = ref();
// zoom things
const datetime12h = ref();

const zoomTimeSelected = ref(60);
const zoomTimeOptions = ref([30, 60]);
const dbAccessToken = ref("");
const dbRefreshToken = ref("");

const topic = ref();

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      loading.value = true;
      CSPid.value = await getDocumentIdByEmail(user.email, "CSPs", 'id');

      axios
        .get("https://smooserve-be.vercel.app/api/csp/" + CSPid.value)
        .then((response) => {
          csp.value = response.data;
          registeredStudents.value =
            response.data.registration.registeredStudents;

          dbAccessToken.value = response.data.settings.zoomAccessToken;
          dbRefreshToken.value = response.data.settings.zoomRefreshToken;
          checkIfAccessTokenValid(response.data.settings.zoomTokenIssueDT);
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

function acceptRejectStudent(status) {
  registeredStudents.value[selectedStudent.value].status = status;
  csp.value.registeredStudents = registeredStudents.value;
  axios
    .put("https://smooserve-be.vercel.app/api/csp/" + CSPid.value, csp.value)
    .then((response) => {
      toast.add({
        severity: "success",
        summary: status,
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

async function getProfile(email){
    selectedProfile.value = await getDocumentIdByEmail(email, "students", 'profile');
    console.log(selectedProfile.value);
    visibleProfile.value = true;
}

async function scheduleZoomMeeting() {
  axios
    .post("https://smooserve-be.vercel.app/api/createMeeting", {
      accessToken: dbAccessToken.value,
      topic: topic.value,
      duration: zoomTimeSelected.value,
      start_time: formatDateTimeToISOString(datetime12h.value),
    })
    .then((response) => {
      console.log(response.data);
      registeredStudents.value[selectedStudent.value].status = "scheduled";
      registeredStudents.value[selectedStudent.value].link =
        response.data.join_url;
      csp.value.registeredStudents = registeredStudents.value;
      axios
        .put(
          "https://smooserve-be.vercel.app/api/csp/" + CSPid.value,
          csp.value
        )
        .then((response) => {})
        .catch((error) => {
          console.log(error);
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 3000,
          });
        });
      toast.add({
        severity: "success",
        summary: "Meeting Scheduled",
        detail: response.statusText,
        life: 3000,
      });
      visibleInterview.value = false;
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
    .get("https://smooserve-be.vercel.app/api/getNewAccessToken/" + dbRefreshToken.value)
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
            .then((response) => {})
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
  <Dialog
    v-model:visible="visibleInterview"
    modal
    :header="'Schedule Interview'"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    class="card"
  >
    <div class="p-3 mt-2 mb-2 card">
      <div class="grid align-items-center justify-content-center mb-3"></div>
      <div class="flex flex-column gap-3 mb-6">
        <div>
          <label for="topic">Meeting Topic</label
          ><Button
            class="ml-3"
            size="small"
            rounded
            label="Suggested"
            icon="pi pi-info"
            @click="
              topic =
                'Interview for ' + registeredStudents[selectedStudent].email
            "
          ></Button>
        </div>
        <InputText id="topic" v-model="topic" />

        <label for="calendar-12h"> 12h Format </label>
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
        rounded
        @click="scheduleZoomMeeting()"
        class="w-full align-items-center justify-content-center"
        ><i class="pi pi-save px-2"></i>Schedule</Button
      >
    </div>
  </Dialog>
  <Dialog
    v-model:visible="visibleProfile"
    modal
    :header="'Student Profile'"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    class="card"
  >
    <div class="p-3 mt-2 mb-2 card">
      <div class="surface-section">
        <div class="font-medium text-3xl text-900 mb-3">{{ selectedProfile.displayName }}</div>
        <div class="text-500 mb-5">
            {{ selectedProfile.email }}
        </div>
        <ul class="list-none p-0 m-0">
          <li
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">Title</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              Heat
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
              ></Button>
            </div>
          </li>
          <li
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">Genre</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              <Chip label="Crime" class="mr-2"></Chip>
              <Chip label="Drama" class="mr-2"></Chip>
              <Chip label="Thriller"></Chip>
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
              ></Button>
            </div>
          </li>
          <li
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">Director</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              Michael Mann
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
              ></Button>
            </div>
          </li>
          <li
            class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">Actors</div>
            <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              Robert De Niro, Al Pacino
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
              ></Button>
            </div>
          </li>
          <li
            class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap"
          >
            <div class="text-500 w-6 md:w-2 font-medium">Plot</div>
            <div
              class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3"
            >
              A group of professional bank robbers start to feel the heat from
              police when they unknowingly leave a clue at their latest heist.
            </div>
            <div class="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                class="p-button-text"
              ></Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Dialog>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else class="surface-ground flex flex-column w-full h-screen">
    <CSPNavbar />

    <!-- profile -->

    <div class="grid align-items-center justify-content-center">
      <div class="col-12 md:col-12 lg:col-10">
        <div class="grid">
          <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 surface-0 p-5">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Views</span>
                  <div class="text-900 font-medium text-xl">{{ csp.views }}</div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-eye text-blue-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">24 new </span>
              <span class="text-500">since last visit</span>
            </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 surface-0 p-5">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Sign ups</span>
                  <div class="text-900 font-medium text-xl">
                    {{ registeredStudents.length }}
                  </div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-orange-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-users text-orange-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">%52+ </span>
              <span class="text-500">since last week</span>
            </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 surface-0 p-5">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Accepted</span>
                  <div class="text-900 font-medium text-xl">
                    {{
                      registeredStudents.filter(
                        (student) => student.status === "accepted"
                      ).length
                    }}
                  </div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-check-square text-cyan-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">520 </span>
              <span class="text-500">newly registered</span>
            </div>
          </div>
          <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 surface-0 p-5">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3"
                    >Favourites (WIP)</span
                  >
                  <div class="text-900 font-medium text-xl">152</div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-purple-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-heart text-purple-500 text-xl"></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">85 </span>
              <span class="text-500">responded</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 md:col-12 lg:col-10">
        <Card class="p-3 mt-4 mb-4 card">
          <template #title>Student Sign ups</template>
          <template #content>
            <DataTable
              :value="registeredStudents"
              tableStyle="min-width: 50rem"
            >
              <template #header>
                <div
                  class="flex flex-wrap align-items-center justify-content-between gap-2"
                >
                  <span class="text-xl text-900 font-bold">Students</span>
                  <Button icon="pi pi-refresh" rounded raised />
                </div>
              </template>
              <Column field="email" header="Email"></Column>
              <Column header="Profile">
                <template #body="slotProps">
                  <Button rounded label="View" @click="getProfile(slotProps.data.email)"
                    >View Profile</Button
                  >
                </template>
              </Column>
              <Column field="status" header="Status"></Column>
              <Column field="link" header="Interview Link">
                <template #body="slotProps">
                  <a :href="slotProps.data.link" target="_blank">
                    <Button
                      v-if="slotProps.data.link"
                      rounded
                      label="Start Zoom"
                  /></a>
                </template>
              </Column>
              <Column header="Action">
                <template #body="slotProps">
                  <!-- if registered -->
                  <Button
                    v-if="slotProps.data.status == 'registered'"
                    rounded
                    label="Schedule Interview"
                    @click="
                      (visibleInterview = true),
                        (selectedStudent = slotProps.index)
                    "
                  />
                  <!-- if scheduled -->
                  <Button
                    v-if="slotProps.data.status == 'scheduled'"
                    rounded
                    severity="success"
                    label="Accept"
                    class="mr-3"
                    @click="
                      (selectedStudent = slotProps.index),
                        acceptRejectStudent('accepted')
                    "
                  />
                  <Button
                    v-if="slotProps.data.status == 'scheduled'"
                    rounded
                    severity="danger"
                    label="Reject"
                    @click="
                      (selectedStudent = slotProps.index),
                        acceptRejectStudent('rejected')
                    "
                  />
                </template>
              </Column>
              <template #footer>
                In total there are
                {{ registeredStudents ? registeredStudents.length : 0 }}
                students.
              </template>
            </DataTable>
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

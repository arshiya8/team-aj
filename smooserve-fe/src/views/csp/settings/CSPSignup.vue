<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CSPNavbar from "../CSPNavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/firebase";

const auth = getAuth();

const toast = useToast();

const router = useRouter();

const CSPid = ref();

const csp = ref([]);

const loading = ref(true);
const registerChecked = ref(false);

const visible = ref(false);

const registeredStudents = ref();

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
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      loading.value = true;
      CSPid.value = await getDocumentIdByEmail(user.email, "CSPs");

      axios
        .get("https://smooserve-be.vercel.app/api/csp/" + CSPid.value)
        .then((response) => {
          console.log(response.data.registration.registeredStudents);
          registeredStudents.value =
            response.data.registration.registeredStudents;
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

async function getDocumentIdByEmail(email, collectionName) {
  const q = query(
    collection(db, collectionName),
    where("email", "==", email),
    limit(1)
  );
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
</script>
<template>
  <Toast></Toast>
  <Dialog
    v-model:visible="visible"
    modal
    :header="'Schedule Interview for ' + selectedStudent"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    class="card"
  >
    <div class="p-3 mt-5 mb-4 card">
        <div class="grid align-items-center justify-content-center mb-3"></div>

        <div class="flex flex-column gap-3 mb-3">
          <label for="topic">Meeting Topic</label>
          <InputText id="topic" v-model="topic" />

          <label for="calendar-12h" class="font-bold block"> 12h Format </label>
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
          label="Save"
          @click="scheduleZoomMeeting()"
          class="w-full align-items-center justify-content-center"
          ><i class="pi pi-save px-2"></i>Schedule</Button
        >
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
                  <div class="text-900 font-medium text-xl">152</div>
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
                  <div class="text-900 font-medium text-xl">$2.100</div>
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
                  <div class="text-900 font-medium text-xl">28441</div>
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
                    >Favourites</span
                  >
                  <div class="text-900 font-medium text-xl">152 Unread</div>
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
              <Column field="status" header="Status"></Column>
              <Column header="Action">
                <template #body="slotProps">
                  <!-- if registered -->
                  <Button
                    v-if="slotProps.data.status == 'registered'"
                    rounded
                    label="Schedule Interview"
                    @click="
                      (visible = true), (selectedStudent = slotProps.data.email)
                    "
                  />
                  <!-- if scheduled -->
                  <Button
                    v-if="slotProps.data.status == 'scheduled'"
                    rounded
                    severity="success"
                    label="Accept"
                  />
                  <Button
                    v-if="slotProps.data.status == 'scheduled'"
                    rounded
                    severity="danger"
                    label="Reject"
                  />
                </template>
              </Column>
              <template #footer>
                In total there are
                {{
                  registeredStudents ? registeredStudents.length : 0
                }}
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

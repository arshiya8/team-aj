<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CSPNavbar from "../CSPNavBar.vue";
// import { db, storage } from "@/firebase";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

const toast = useToast();

const route = useRoute();

const CSPid = route.params.id;

const list = ref([]);

const csp = ref([]);

const loading = ref(true);

const buttonColor = ref("");

const CSPImage = ref("");

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
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};

function save() {
  loading.value = true;
  csp.value.title = title.value;
  csp.value.desc = desc.value;
  console.log(csp.value);
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
    .finally(() => (loading.value = false));
}

onMounted(async () => {
  axios
    .get("https://smooserve-be.vercel.app/api/csp/" + CSPid)
    .then((response) => {
      csp.value = response.data;
      response.data.settings.urls
        ? (list.value = response.data.settings.urls)
        : (list.value = []);
      CSPImage.value = csp.value.imageURL;
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
});

watch(
  () => buttonColor,
  (newColor) => {
    // Watch for changes in the buttonColor value and update the button background color
    const buttons = document.querySelectorAll(".selectBtns");
    buttons.forEach((button) => {
      button.style.backgroundColor = newColor;
    });
  }
);
</script>
<template>
  <Toast></Toast>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else class="surface-ground flex flex-column w-full h-screen">
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
                  :style="{ backgroundColor: '#fafafa', width: '6rem', height:'6rem' }"
                />
                <Avatar
                  v-else
                  :label="Array.from(csp.title)[0]"
                  shape="circle"
                  size="xlarge"
                  :style="{ backgroundColor: '#3F51B5', color: '#ffffff', width: '6rem', height:'6rem'}"
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
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 12px;
}
</style>

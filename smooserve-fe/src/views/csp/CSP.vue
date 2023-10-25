<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const toast = useToast();
const visibleShare = ref(false);

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const qrCodeLink = "https://smooserve-fe.vercel.app/#/csp/" + id;

const csp = ref([]);
const btncolour = ref("");
const btnFontcolour = ref("");

const CSPImage = ref("");
const backgroundColor = ref("");
const fontStyle = ref({ family: "", color: "" });

const loading = ref(true);

//copy var and functions
const copy = ref(false);
const copyBtnValue = ref("Copy");

//check if csp owner
const auth = getAuth();
const cspOwner = ref(false);
const loggedIn = ref(false);


async function checkIfOwner(email) {
  if (loggedIn.value) {
    var userEmail = auth.currentUser.email;
    if (userEmail == email) {
      cspOwner.value = true;
    }
  }
}

//check if logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
   // User is signed in
   loggedIn.value = true
   
  } else {
    // User is signed out  
    loggedIn.value = false

  }
});

//Register student
function registerStudent() {
  //if is not cspOwner and first time registered
  if (
    !cspOwner.value &&
    !checkIfStudentRegistered() &&
    loggedIn.value
  ) {
    var studentEmail = auth.currentUser.email;
    loading.value = true;
    csp.value.registration.registeredStudents.push({
      email: studentEmail,
      status: "registered",
    });
    axios
      .put("https://smooserve-be.vercel.app/api/csp/" + id, csp.value)
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
  } else {
    //if owner
    if (cspOwner.value) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Cannot register your own CSP!",
        life: 3000,
      });
      //if registered
    } else if (checkIfStudentRegistered()) {
      toast.add({
        severity: "info",
        summary: "Info",
        detail: "Already registered!",
        life: 3000,
      });
    } else if (!loggedIn.value) {
      toast.add({
        severity: "info",
        summary: "Info",
        detail: "Please login first",
        life: 3000,
      });
    }
  }
}

function checkIfStudentRegistered() {
  var studentEmail = "";
  if (loggedIn.value) {
    studentEmail = auth.currentUser.email;
    csp.value.registration.registeredStudents;
    const found = csp.value.registration.registeredStudents.some(
      (el) => el.email === studentEmail
    );
    if (found) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const copyFunc = async () => {
  try {
    copy.value = true;
    copyBtnValue.value = "Copied";
    await navigator.clipboard.writeText(
      "https://smooserve-fe.vercel.app/#/csp/" + id
    );
    toast.add({
      severity: "success",
      summary: "Copied",
      detail: "",
      life: 3000,
    });
  } catch ($e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Cannot copy",
      life: 3000,
    });
  }
};

onUnmounted(async () => {
  document.body.style.backgroundColor = null;
});

onMounted(async () => {
  axios
    .get("https://smooserve-be.vercel.app/api/csp/" + id)
    .then((response) => {
      csp.value = response.data;

      // btn color
      btncolour.value = "#" + response.data.settings.buttons["button-colour"];
      btnFontcolour.value =
        "#" + response.data.settings.buttons["button-font-colour"];

      //font color
      fontStyle.value.family = response.data.settings.font["font-family"];
      fontStyle.value.color = "#" + response.data.settings.font["font-colour"];

      // bg color
      backgroundColor.value =
        "#" + response.data.settings.background["bg-colour"];

      document.body.style.backgroundColor = backgroundColor.value;

      CSPImage.value = csp.value.imageURL;

      checkIfOwner(response.data.email);
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

const goToCSPSetting = (CSPid) => {
  router.push({ name: "CSPSetting", params: { id: CSPid } });
};
</script>
<template>
  <Toast></Toast>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else class="overflow-x-hidden">
    <Toolbar
      :style="{ backgroundColor: backgroundColor }"
      class="w-full md:w-10 lg:w-9"
    >
      <template #start> </template>
      <template #end>
        <Button
          v-if="cspOwner"
          @click="goToCSPSetting(csp.id)"
          class="mr-2 roundBtn"
          icon="pi pi-pencil"
          severity="primary"
          rounded
          raised
          aria-label="Edit"
        />
        <Button
          class="mr-2 roundBtn"
          icon="pi pi-share-alt"
          rounded
          raised
          aria-label="Bookmark"
          @click="visibleShare = true"
        />
      </template>
    </Toolbar>
    <div class="card flex justify-content-center text-center">
      <Dialog
        v-model:visible="visibleShare"
        position="bottom"
        draggable="false"
        modal
        header="Share this CSP"
        :style="{ width: '75vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
      >
        <div class="card">
          <div class="flex flex-wrap justify-content-center gap-3 mb-4">
            <vue-qrcode :value="qrCodeLink"></vue-qrcode>
          </div>
          <div class="flex flex-wrap justify-content-center gap-3">
            <Button
              @click="copyFunc()"
              icon="pi pi-copy"
              :label="copyBtnValue"
              class="w-5 p-3 text-xl mb-3"
              rounded
              raised
              :style="{ backgroundColor: 'black', color: 'white' }"
            ></Button>
          </div>
        </div>
      </Dialog>
    </div>

    <div
      class="flex align-items-center justify-content-center min-w-screen overflow-hidden"
    >
      <div class="flex flex-column text-center w-10 sm:w-8 md:w-5">
        <div class="flex align-items-center justify-content-center">
          <Avatar
            v-if="CSPImage != ''"
            class="mb-2"
            shape="circle"
            size="xlarge"
            :image="CSPImage"
            :style="{ width: '8rem', height: '8rem' }"
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

        <div class="mb-3 fontStyle">
          <h1>{{ csp.title }}</h1>
          <p>
            {{ csp.desc }}
          </p>

          <Button
            v-if="csp.registration.active"
            rounded
            class="roundBtn"
            @click="registerStudent()"
            >Register</Button
          >
        </div>

        <div v-for="url in csp.settings.urls">
          <a
            v-if="url.url && url.active"
            :href="'http://' + url.url"
            target="_blank"
          >
            <Button
              :icon="'pi pi-' + url.icon"
              type="submit"
              :label="url.title ? url.title : url.url"
              class="w-full p-3 text-xl mb-3"
              v-bind="csp.settings.buttons.type"
            ></Button
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
Button {
  background-color: v-bind("btncolour");
  color: v-bind("btnFontcolour");
  font-family: v-bind("fontStyle.family");
}

.roundBtn {
  background-color: white;
  color: black;
}

.fontStyle {
  font-family: v-bind("fontStyle.family");
  color: v-bind("fontStyle.color");
}
</style>

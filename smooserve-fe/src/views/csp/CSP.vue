<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";
import VueQrcode from "@chenfengyuan/vue-qrcode";

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
        fontStyle.value.color = response.data.settings.font["font-colour"];  

      // bg color
      backgroundColor.value =
        "#" + response.data.settings.background["bg-colour"];
      console.log(backgroundColor.value);
      document.body.style.backgroundColor = backgroundColor.value;

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

const goToCSPSetting = (CSPid) => {
  router.push({ name: "CSPSetting", params: { id: CSPid } });
};
</script>
<template>
  <Toast></Toast>
  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else>
    <Toolbar
      :style="{ backgroundColor: backgroundColor }"
      class="w-full md:w-10 lg:w-9"
    >
      <template #start> </template>
      <template #end>
        <Button
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
        </div>

        <div v-for="url in csp.settings.urls">
          <a :href="url.url">
            <Button
              :icon="'pi pi-' + url.name"
              type="submit"
              :label="url.name"
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
}

.roundBtn {
  background-color: white;
  color: black;
}

.fontStyle {
  font-family: v-bind("fontStyle.family");
}
</style>

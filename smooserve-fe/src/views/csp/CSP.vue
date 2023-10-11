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

const csp = ref([]);
const btncolour = ref('');

const loading = ref(true);

//copy var and functions
const copy = ref(false);
const copyBtnValue = ref("Copy");

const copyFunc = async () => {
  try {
    copy.value = true;
    copyBtnValue.value = "Copied";
    await navigator.clipboard.writeText("https://smooserve-fe.vercel.app/#/csp/" + id);
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
      btncolour.value = response.data.settings.buttons.colour;
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
  <Toolbar>
    <template #start> </template>
    <template #end>
      <Button
        @click="goToCSPSetting(csp.id)"
        class="mr-2"
        icon="pi pi-pencil"
        severity="primary"
        rounded
        aria-label="Edit"
      />
      <Button
        class="mr-2"
        icon="pi pi-share-alt"
        severity="primary"
        rounded
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
          <vue-qrcode
            value="https://fengyuanchen.github.io/vue-qrcode"
          ></vue-qrcode>
        </div>
        <div class="flex flex-wrap justify-content-center gap-3">
          <Button
            @click="copyFunc()"
            icon="pi pi-copy"
            :label="copyBtnValue"
            class="w-5 p-3 text-xl mb-3"
            rounded
            raised
          ></Button>
        </div>
        <!-- <div class="flex flex-wrap justify-content-center gap-3">
          <small v-if="copy">Copied</small>
        </div> -->
      </div>
    </Dialog>
  </div>

  <div
    class="flex align-items-center justify-content-center min-w-screen overflow-hidden"
  >
    <ProgressSpinner v-if="loading"></ProgressSpinner>
    <div v-else class="flex flex-column text-center w-10 sm:w-8 md:w-5">
      <Image
        :src="csp.imageURL"
        width="250"
        preview
        class="mb-2 flex-shrink-0"
      />

      <div class="mb-3">
        <h1>{{ csp.title }}</h1>
        <p>
          {{ csp.desc }}
        </p>
      </div>

      <div v-for="url in csp.settings.urls">
        <a :href="url.url">
          <Button
            :icon="'pi pi-'+url.name"
            type="submit"
            :label="url.name"
            class="w-full p-3 text-xl mb-3"
            v-bind="csp.settings.buttons.type"
          ></Button
        ></a>
      </div>
    </div>
  </div>
</template>
<style>
Button{
  background-color: v-bind(btncolour);
}
</style>
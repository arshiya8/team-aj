<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";

const toast = useToast();

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const csp = ref([]);
const btncolour = ref("");
const btnFontcolour = ref("");


const CSPImage = ref("");
const backgroundColor = ref("");
const fontStyle = ref({ family: "", color: "" });

const loading = ref(true);

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
      />
    </template>
  </Toolbar>

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

      <div v-if="csp.igURL">
        <a :href="csp.igURL">
          <Button
            icon="pi pi-instagram"
            type="submit"
            label="Instagram"
            class="w-full p-3 text-xl mb-3"
            rounded
            raised
          ></Button
        ></a>
      </div>
      <div v-if="csp.telehandle">
        <a :href="csp.telehandle">
          <Button
            icon="pi pi-telegram"
            type="submit"
            label="Telegram"
            class="w-full p-3 text-xl mb-3"
            rounded
            raised
          ></Button
        ></a>
      </div>
      <div v-if="csp.signupFormURL">
        <a :href="csp.signupFormURL">
          <Button
            icon="pi pi-external-link"
            type="submit"
            label="Sign up Form"
            class="w-full p-3 text-xl mb-3"
            rounded
            raised
          ></Button
        ></a>
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

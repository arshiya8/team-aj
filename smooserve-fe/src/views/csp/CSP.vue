<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";

const toast = useToast();

const route = useRoute();
const id = route.params.id;

const csp = ref([]);

const loading = ref(true)

onMounted(async () => {
  axios
    .get("https://smooserve-be.vercel.app/api/csp/" + id)
    .then((response) => (csp.value = response.data))
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
</script>
<template>
  <Toast></Toast>
  <div
  class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
  <ProgressSpinner v-if="loading"></ProgressSpinner>
  <div v-else class="flex flex-column align-items-center justify-content-center">
      <img :src="csp.imageURL" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
              {{ csp.title }}!
            </div>
            <span class="text-600 font-medium"
              >About: {{ csp.desc }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

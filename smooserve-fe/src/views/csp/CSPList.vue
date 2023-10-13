<script setup>
import { onMounted, computed, ref } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import axios from 'axios';
import { useRouter } from "vue-router";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const router = useRouter();

const logoUrl = computed(() => {
  return `/layout/images/logo-white.png`;
});

const csps = ref([
  // {
  //     id: 1,
  //     content: 'Test1'
  // },
  // {
  //     id: 2,
  //     content: 'Test2'
  // },
  // {
  //     id: 3,
  //     content: 'Test3'
  // },
]);

const loading = ref(true);

onMounted(async () => {
  // axios
  // .get('https://smooserve-be.vercel.app/api/csps')
  // .then(response => (csps.value = response.data))
  // .catch((error) => {
  //       console.log(error);
  //       toast.add({ severity: 'info', summary: 'Info', detail: error, life: 3000 });
  //     })
  // .finally(() => loading.value = false)

  onSnapshot(collection(db, "CSPs"), (querySnapshot) => {
    const fbCSP = [];
    querySnapshot.forEach((doc) => {
      const CSP = {
        id: doc.id,
        title: doc.data().title,
        desc: doc.data().desc,
      };
      fbCSP.push(CSP);
    });
    csps.value = fbCSP
  });
});

const goToCSP = (CSPid) => {
    router.push({name: "CSP", params: { id: CSPid}})
}
</script>
<template>
  <Toast></Toast>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <ProgressSpinner v-if="loading" />
      <div v-for="csp in csps" class="m-3">
        <Card style="width: 25em">
          <template #title> {{ csp.title }} </template>
          <template #content>
            <p>
              {{ csp.desc }}
            </p>
          </template>
          <template #footer>
            <Button @click="goToCSP(csp.id)" icon="pi pi-eye" label="View" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

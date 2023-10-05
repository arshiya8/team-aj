<script setup>
import { onMounted, computed, ref } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

const logoUrl = computed(() => {
  return `layout/images/logo-white.png`;
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

onMounted(async () => {
  //   const querySnapshot = await getDocs(collection(db, "CSPs"));
  //   let fbCSP = [];
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     const todo = {
  //       id: doc.id,
  //       country: doc.data().country,
  //       content: doc.data().content,
  //     };
  //     fbCSP.push(todo);
  //   });
  //   csps.value = fbCSP

  onSnapshot(collection(db, "CSPs"), (querySnapshot) => {
    const fbCSP = [];
    querySnapshot.forEach((doc) => {
      const CSP = {
        id: doc.id,
        country: doc.data().country,
        content: doc.data().content,
      };
      fbCSP.push(CSP);
    });
    csps.value = fbCSP
  });
});
</script>
<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div v-for="csp in csps" class="m-3">
        <Card style="width: 25em">
          <template #title> {{ csp.country }} </template>
          <template #content>
            <p>
              {{ csp.content }}
            </p>
          </template>
          <template #footer>
            <Button icon="pi pi-eye" label="View" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

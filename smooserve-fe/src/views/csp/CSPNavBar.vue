<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/firebase";
//login and logout things
const isLoggedIn = ref(false);

const auth = getAuth();
const router = useRouter();

const route = useRoute();
const CSPid = ref();

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true;
      CSPid.value = await getDocumentIdByEmail(user.email, "CSPs");
      console.log(CSPid.value);
    } else {
      isLoggedIn.value = false;
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

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.replace({ name: "Login" });
  });
};

const logoUrl = computed(() => {
  return `layout/images/logo-white.png`;
});

const goToCSP = () =>{
    router.push({name: "CSP", params: { id: CSPid.value}})
}

//menu
const items = ref([
  {
    label: "Sign ups",
    icon: "pi pi-fw pi-user",
    routeName: "CSPSignup",
  },
  {
    label: "Settings",
    icon: "pi pi-fw pi-cog",
    items: [
      {
        label: "Links",
        icon: "pi pi-fw pi-link",
        routeName: "CSPLinks",
      },
      {
        label: "Appearance",
        icon: "pi pi-fw pi-bolt",
        routeName: "CSPApperance",
      },
      {
        label: "Profile",
        icon: "pi pi-fw pi-cog",
        routeName: "CSPSetting",
      },
    ],
  },
]);
</script>

<template>
  <div class="grid align-items-center justify-content-center">
    <div class="col-12 md:col-12 lg:col-10">
      <Menubar
        :model="items"
        :pt="{
          action: ({ props, state, context }) => ({
            class: context.active
              ? 'bg-primary-50 border-round-sm'
              : context.focused
              ? 'bg-primary-100 border-round-sm'
              : undefined,
          }),
        }"
        class="mb-3 shadow-none surface-ground border-none"
      >
        <template #start>
          <img alt="logo" :src="logoUrl" height="60" class="mr-2" />
        </template>
        <template
          #item="{ label, item, props, root, hasSubmenu }"
          class="p-menuitem-active"
        >
          <router-link
            v-if="item.routeName"
            v-slot="routerProps"
            :to="{ name: item.routeName, params: { id: CSPid } }"
            custom
            :exact="true"
          >
            <a :href="routerProps.href" v-bind="props.action">
              <span v-bind="props.icon" />
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </router-link>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
            <span
              :class="[
                hasSubmenu &&
                  (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right'),
              ]"
              v-bind="props.submenuicon"
            />
          </a>
        </template>
        <template #end>
          <Button
            v-if="!isLoggedIn"
            label="Login"
            class="p-button-rounded border-none ml-5 font-light text-white line-height-2"
          ></Button>

          <div v-if="isLoggedIn">
            <Button @click="goToCSP()" v-tooltip.bottom="'Your CSP Page'" icon="pi pi-external-link" severity="primary" rounded outlined aria-label="User" />
            <Button
              label="Sign out"
              class="p-button-rounded border-none ml-5 font-light text-white line-height-2"
              @click="handleSignOut()"
            ></Button>
          </div>
        </template>
      </Menubar>
    </div>
  </div>
</template>

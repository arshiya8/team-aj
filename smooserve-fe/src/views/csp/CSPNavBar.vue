<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

//login and logout things
const isLoggedIn = ref(false);

const auth = getAuth();
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.replace({ name: "Login" });
  });
};
const route = useRoute();
const CSPid = route.params.id;

const logoUrl = computed(() => {
  return `layout/images/logo-white.png`;
});

//menu
const items = ref([
  {
    label: "Sign ups",
    icon: "pi pi-fw pi-user",
    routeName: "CSPSignup"
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
  <Menubar
    :model="items"
    :pt="{
      action: ({ props, state, context }) => ({
        class: context.active
          ? 'bg-primary-200 border-round-sm'
          : context.focused
          ? 'bg-primary-300 border-round-sm'
          : undefined,
      }),
    }"
    class="mb-3"
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
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
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

      <Button
        v-if="isLoggedIn"
        label="Sign out"
        class="p-button-rounded border-none ml-5 font-light text-white line-height-2"
        @click="handleSignOut()"
      ></Button>
    </template>
  </Menubar>
</template>

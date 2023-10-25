<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const CSPid = route.params.id;

//menu
const items = ref([
  {
    label: "Links",
    icon: "pi pi-fw pi-link",
    routeName: "CSPLinks",
  },
  {
    label: "Appearance",
    icon: "pi pi-fw pi-bolt",
    routeName: "CSPApperance"
  },
  {
    label: "Settings",
    icon: "pi pi-fw pi-cog",
    routeName: "CSPSetting",
  },
]);

</script>

<template>
<div class="card relative z-2">
      <Menubar :model="items">
        <template #item="{ label, item, props, root, hasSubmenu }">
          <router-link
            v-if="item.routeName"
            v-slot="routerProps"
            :to="{ name: item.routeName, params: { id: CSPid } }"
            custom
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
      </Menubar>
    </div>
</template>
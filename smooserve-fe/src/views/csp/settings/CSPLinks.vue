<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";
import draggable from "vuedraggable";
import CSPNavBar from "../CSPNavBar.vue";

const toast = useToast();

const route = useRoute();

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

const CSPid = route.params.id;

const list = ref([]);

const csp = ref([]);

const loading = ref(true);

const drag = ref(true);

const fontColor = ref("");
const buttonColor = ref("");

// options for button type
const value = ref(null);
const options = ref([
  { icon: "outlined", value: "outlined", outlined: true, rounded: false },
  { icon: "rounded", value: "rounded", outlined: false, rounded: true },
]);

function removeAt(idx) {
  list.value.splice(idx, 1);
}

function add() {
  list.value.push({ name: "paperclip", text: "" });
}

function save() {
  loading.value = true;
  csp.urls = list.value;
  axios
    .put("https://smooserve-be.vercel.app/api/csp/" + CSPid, csp.value)
    .then((response) => {
      toast.add({
        severity: "success",
        summary: "Saved",
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
}

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});

onMounted(async () => {
  axios
    .get("https://smooserve-be.vercel.app/api/csp/" + CSPid)
    .then((response) => {
      csp.value = response.data;
      response.data.settings.urls
        ? (list.value = response.data.settings.urls)
        : (list.value = []);
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

watch(
  () => buttonColor,
  (newColor) => {
    // Watch for changes in the buttonColor value and update the button background color
    const buttons = document.querySelectorAll(".selectBtns");
    buttons.forEach((button) => {
      button.style.backgroundColor = newColor;
    });
  }
);
</script>
<template>
  <Toast></Toast>

  <div v-if="loading" class="card">
        <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
  <div v-else class="surface-ground flex flex-column w-full h-screen">
    <!-- menu -->
   <CSPNavBar />

    <!-- Links -->
    <div class="grid align-items-center justify-content-center">
      <div class="col-12 md:col-12 lg:col-6">
        <Card class="p-2 mt-4 mb-4 card">
          <template #title> <span class="px-5">Links </span></template>
          <template #content>
            <div class="mx-5">
              <Button
                rounded
                @click="add()"
                class="w-full align-items-center justify-content-center"
                ><i class="pi pi-plus px-2"></i
                ><span class="px-2">Add Link</span></Button
              >
            </div>
            <draggable
              class="list-group mr-5"
              tag="transition-group"
              :component-data="{
                tag: 'ul',
                type: 'transition-group',
                name: !drag ? 'flip-list' : null,
              }"
              v-model="list"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
              item-key="order"
            >
              <template #item="{ element, index }">
                <li class="p-inputgroup mb-3">
                  <span class="p-inputgroup-addon">
                    <i :class="'pi pi-' + element.name"></i>
                  </span>
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-sort-alt handle"></i>
                  </span>

                  <InputText
                    type="text"
                    class="form-control"
                    v-model="element.url"
                  />
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-times close" @click="removeAt(index)"></i>
                  </span>
                </li>
              </template>
            </draggable>
            <div class="mx-5">
            <Button
              text
              rounded
              label="Save"
              @click="save()"
              class="w-full align-items-center justify-content-center"
              ><i class="pi pi-save px-2"></i>Save</Button
            >
        </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style>

.card {
    border-radius: 12px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 1;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>

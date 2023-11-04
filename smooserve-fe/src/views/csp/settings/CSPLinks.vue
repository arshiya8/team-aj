<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import draggable from "vuedraggable";
import CSPNavBar from "@/views/csp/CSPNavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocumentIdByEmail } from "@/helper/helperFunctions.js";

const auth = getAuth();

const toast = useToast();

const router = useRouter();

const CSPid = ref();

const urlList = ref([]);

const csp = ref([]);

const loading = ref(true);

const drag = ref(true);

const buttonColor = ref("");

//dialog
const visible = ref(false);

const currentIcon = ref();
const currentIndex = ref();

//icons
const selectedIcon = ref();
const icons = ref([
  { name: "facebook" },
  { name: "instagram" },
  { name: "paperclip" },
  { name: "info" },
  { name: "info-circle" },
  { name: "reddit" },
  { name: "google" },
  { name: "android" },
  { name: "apple" },
  { name: "microsoft" },
  { name: "heart" },
  { name: "home" },
  { name: "pencil" },
  { name: "user" },
  { name: "star-fill" },
  { name: "arrow-right" },
  { name: "star-fill" },
]);
function validateAndSave() {
  const invalidLinks = urlList.value.filter((item) => {
    const url = item.url.trim();
    return url.startsWith("http://") || url.startsWith("https://");
  });

  if (invalidLinks.length > 0) {
    // Display an alert for invalid links
    toast.add({
      severity: "error",
      summary: "Invalid Link Format",
      detail: "Please check that the link is in a valid format (without 'http://' or 'https://').",
      life: 3000,
    });
  } else {
    // All links are valid, proceed with saving
    save();
  }
}

function removeAt(idx) {
  urlList.value.splice(idx, 1);
}

function add() {
  urlList.value.unshift({ title: "", url: "", icon: "paperclip" });
}

function passIcon(name, index) {
  currentIcon.value = name;
  currentIndex.value = index;
}

function changeIcon(name, index) {
  urlList.value[index].icon = name.name;
}

function save() {

  loading.value = true;
  csp.value.settings.urls = urlList.value;
  axios
    .put("https://smooserve-be.vercel.app/api/csp/" + CSPid.value, csp.value)
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
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      loading.value = true;
      console.log(CSPid);
      CSPid.value = await getDocumentIdByEmail(user.email, "CSPs", "id");

      //check if is student
      let data = await getDocumentIdByEmail(user.email, "Users");
      if (data.role == "student") {
        router.replace({ name: "Home" });
      }

      axios
        .get("https://smooserve-be.vercel.app/api/csp/" + CSPid.value)
        .then((response) => {
          csp.value = response.data;
          response.data.settings.urls != null
            ? (urlList.value = response.data.settings.urls)
            : (urlList.value = []);
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
    } else {
      // User is signed out
      router.push({ name: "Login" });
    }
  });
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
  <Dialog v-model:visible="visible" modal header="Add Icon" :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
    <div class="card flex justify-content-center">
      <Listbox filter v-model="selectedIcon" :options="icons" optionLabel="name" :style="{ width: '100vw' }"
        listStyle="max-height:250px">
        <template #option="slotProps">
          <div class="flex align-items-center">
            <i :class="'pi pi-' + slotProps.option.name + ' px-2'"></i>
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Listbox>
    </div>
    <template #footer>
      <div class="card flex justify-content-center">
        <Button rounded label="Add" icon="pi pi-plus"
          @click="(visible = false), changeIcon(selectedIcon, currentIndex)" />
      </div>
    </template>
  </Dialog>

  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else class="surface-ground flex flex-column w-full h-screen">
    <!-- menu -->
    <CSPNavBar />

    <!-- Links -->
    <div class="grid align-items-center justify-content-center">
      <div class="col-12 md:col-12 lg:col-7">
        <!-- <iframe width="390" height="844" src="https://smooserve-fe.vercel.app/#/csp/3m4Ve00zxGcbeD0J98xi"></iframe> -->
        <Card class="shadow-none surface-ground p-2 mt-4 mb-4 card">
          <template #title> <span class="px-5">Links</span></template>
          <template #content>
            <div class="md:mx-5">
              <Button rounded @click="add()" class="w-full align-items-center justify-content-center mb-3"><i
                  class="pi pi-plus px-2"></i><span class="px-2">Add Link</span></Button>
              <draggable class="list-group" tag="transition-group" :component-data="{
                tag: 'ul',
                type: 'transition-group',
                name: !drag ? 'flip-list' : null,
              }" v-model="urlList" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="order"
                handle=".handle">
                <template #item="{ element, index }">
                  <li class="mb-3" style="list-style-type: none">
                    <div class="bg-white p-2 mt-4 mb-4 card cardLink">
                      <div class="grid gap-3 align-items-center">
                        <div class="col-1 text-center handle h-full">
                          <i class="pi pi-sort-alt" v-tooltip.top="'Drag to re-arrange your links'"></i>
                        </div>
                        <!-- <div class="col-1 text-center">
                          <i
                            :class="
                              'hover:bg-primary-100 p-inputgroup-addon pi pi-' +
                              element.icon
                            "
                            @click="(visible = true), passIcon(element, index)"
                          ></i>
                        </div> -->
                        <div class="col-7 lg:col-9">
                          <div class="grid">
                            <div class="col-12">
                              <div class="flex flex-column gap-3">
                                <label class="font-bold">Title</label>
                                <InputText id="title" v-model="element.title" />
                                <label class="font-bold">URL</label>
                                <p size="small" style="font-style: italic">Format: www.website.com instead of http://www.website.com
                                </p>
                                <InputText id="link" v-model="element.url" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-1 lg:col-1 text-center">
                          <div class="grid gap-1">
                            <div class="col-12">
                              <i :class="'hover:bg-primary-100 p-inputgroup-addon pi pi-' +
                                element.icon
                                " @click="
    (visible = true), passIcon(element, index)
    "></i>
                            </div>
                            <div class="col-12">
                              <InputSwitch v-model="element.active" v-tooltip.top="element.active
                                  ? 'This link is active'
                                  : 'This link is not active'
                                " />
                            </div>
                            <div class="col-12">
                              <i class="pi pi-trash close" @click="removeAt(index)"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <span class="p-inputgroup-addon">
                    <i class="pi pi-sort-alt handle"></i>
                  </span>
                  <span
                    class="p-inputgroup-addon"
                    @click="(visible = true), passIcon(element, index)"
                  >
                    <i :class="'pi pi-' + element.icon"></i>
                  </span>
                  

                  <InputText
                    type="text"
                    class="form-control"
                    v-model="element.url"
                  />
                  
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-times close" @click="removeAt(index)"></i>
                  </span> -->
                  </li>
                </template>
              </draggable>

              <Button text rounded label="Save" @click="validateAndSave"
                class="w-full align-items-center justify-content-center">
                <i class="pi pi-save px-2"></i>Save
              </Button>

            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
}

.cardLink {
  border-radius: 30px;
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
  min-height: 25px;
}

ul.list-group {
  padding: 0;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>

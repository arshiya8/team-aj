<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CSPNavbar from "../CSPNavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/firebase";
import { getDocumentIdByEmail } from "@/helper/helperFunctions.js";

const auth = getAuth();
const toast = useToast();

const router = useRouter();

const CSPid = ref();

const list = ref([]);

const csp = ref([]);

const loading = ref(true);

const fontColor = ref("");
const buttonColor = ref("");
const buttonFontColor = ref("");
const bgColor = ref("");

// dropdown font
const selectedFont = ref();
const fontOptions = ref([
  { name: "Times New Roman" },
  { name: "Arial" },
  { name: "Verdana" },
  { name: "Lucida Console" },
  { name: "Courier" },
  { name: "monospace" },
  { name: "fantasy" },
]);

// options for button type
const buttonValue = ref(null);
const options = ref([
  { value: "outlined", outlined: true, rounded: false },
  { value: "rounded", outlined: false, rounded: true },
]);

function save() {
  loading.value = true;
  csp.value.settings.font["font-family"] = selectedFont.value.name;
  csp.value.settings.font["font-colour"] = fontColor.value;
  csp.value.settings.buttons["button-colour"] = buttonColor.value;
  csp.value.settings.buttons["button-font-colour"] = buttonFontColor.value;
  csp.value.settings.background["bg-colour"] = bgColor.value;
  // csp.value.settings.buttons.
  console.log(buttonValue.value);
  csp.value.settings.buttons.type = buttonValue.value;

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

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      loading.value = true;
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
          response.data.settings.urls
            ? (list.value = response.data.settings.urls)
            : (list.value = []);
          selectedFont.value = { name: csp.value.settings.font["font-family"] };
          fontColor.value = csp.value.settings.font["font-colour"];
          buttonColor.value = csp.value.settings.buttons["button-colour"];
          buttonFontColor.value =
            csp.value.settings.buttons["button-font-colour"];
          bgColor.value = csp.value.settings.background["bg-colour"];
          buttonValue.value = csp.value.settings.buttons.type;
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

  <div v-if="loading" class="card">
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </div>
  <div v-else class="surface-ground flex flex-column w-full h-full">
    <!-- menu -->
    <CSPNavbar />

    <!-- Background -->
    <div class="grid align-items-center justify-content-center mt-3">
      <div class="col-12 md:col-12 lg:col-6">
        <div class="card">
          <Fieldset legend="Background" :toggleable="true">
            <div class="flex flex-wrap gap-5 align-items-center p-4">
              <div class="flex flex-wrap gap-5 align-items-center">
                <div class="flex flex-column align-items-center">
                  <label for="cp-hex" class="font-bold block mb-3">
                    Colour
                  </label>
                  <ColorPicker
                    v-model="bgColor"
                    inputId="cp-hex"
                    format="hex"
                    class="mb-3"
                  />
                </div>
                <div class="align-items-center">
                  <InputText
                    type="text"
                    v-model="bgColor"
                    class="w-full md:w-9rem"
                  />
                </div>
              </div>
            </div>
          </Fieldset>
        </div>
      </div>
    </div>

    <!-- Fonts -->
    <div class="grid align-items-center justify-content-center mt-3">
      <div class="col-12 md:col-12 lg:col-6">
        <div class="card">
          <Fieldset legend="Fonts" :toggleable="true">
            <div class="flex flex-wrap gap-5 align-items-center p-4">
              <div class="flex flex-column gap-3 mb-3 w-full">
                <label for="font" class="font-bold block">Font</label>
                <Dropdown
                  v-model="selectedFont"
                  :options="fontOptions"
                  filter
                  optionLabel="name"
                  placeholder="Select a Font"
                  class="w-full md:w-14rem"
                  id="font"
                  :pt="{
                    root: { class: 'w-full md:w-14rem' },
                    item: ({ props, state, context }) => ({
                      class: context.selected
                        ? 'bg-primary'
                        : context.focused
                        ? 'bg-blue-100'
                        : undefined,
                    }),
                  }"
                >
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex align-items-center">
                      <div :style="{ fontFamily: slotProps.value.name }">
                        {{ slotProps.value.name }}
                      </div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex align-items-center">
                      <div :style="{ fontFamily: slotProps.option.name }">
                        {{ slotProps.option.name }}
                      </div>
                    </div>
                  </template>
                </Dropdown>
              </div>
              <div class="flex flex-wrap gap-5 align-items-center">
                <div class="flex flex-column align-items-center">
                  <label for="cp-hex" class="font-bold block mb-3">
                    Colour
                  </label>
                  <ColorPicker
                    v-model="fontColor"
                    inputId="cp-hex"
                    format="hex"
                    class="mb-3"
                  />
                </div>
                <div class="align-items-center">
                  <InputText
                    type="text"
                    v-model="fontColor"
                    class="w-full md:w-9rem"
                  />
                </div>
              </div>
            </div>
          </Fieldset>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="grid align-items-center justify-content-center mt-3">
      <div class="col-12 md:col-12 lg:col-6">
        <div class="card mb-3">
          <Fieldset legend="Buttons" :toggleable="true">
            <div class="flex flex-wrap gap-5 align-items-center p-4">
              <div class="flex flex-column gap-3 mb-3 w-full">
                <SelectButton
                  v-model="buttonValue"
                  :options="options"
                  optionLabel="value"
                  dataKey="value"
                  aria-labelledby="custom"
                >
                  <template #option="slotProps">
                    <Button
                      disabled
                      :rounded="slotProps.option.rounded"
                      :outlined="slotProps.option.outlined"
                      class="align-items-center justify-content-center selectBtns"
                    >
                    </Button>
                  </template>
                </SelectButton>
              </div>
              <div class="flex flex-wrap gap-5 align-items-center">
                <div class="flex flex-column align-items-center">
                  <label for="cp-hex" class="font-bold block mb-3">
                    Button Colour
                  </label>
                  <ColorPicker
                    v-model="buttonColor"
                    inputId="cp-hex"
                    format="hex"
                    class="mb-3"
                  />
                </div>
                <div class="align-items-center">
                  <InputText
                    type="text"
                    v-model="buttonColor"
                    class="w-full md:w-9rem"
                  />
                </div>
              </div>
              <div class="flex flex-wrap gap-5 align-items-center">
                <div class="flex flex-column align-items-center">
                  <label for="cp-hex" class="font-bold block mb-3">
                    Button Font Colour
                  </label>
                  <ColorPicker
                    v-model="buttonFontColor"
                    inputId="cp-hex"
                    format="hex"
                    class="mb-3"
                  />
                </div>
                <div class="align-items-center">
                  <InputText
                    type="text"
                    v-model="buttonFontColor"
                    class="w-full md:w-9rem"
                  />
                </div>
              </div>
            </div>
          </Fieldset>
        </div>
        <Button
          rounded
          label="Save"
          @click="save()"
          class="w-full align-items-center justify-content-center mt-5 mb-8"
          ><i class="pi pi-save px-2"></i>Save</Button
        >
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 12px;
}
</style>

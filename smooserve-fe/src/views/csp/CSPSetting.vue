<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";
import draggable from "vuedraggable";

const toast = useToast();

const route = useRoute();

const CSPid = route.params.id;

const list = ref([]);

const csp = ref([]);

const loading = ref(true);

const drag = ref(true);

const fontColor = ref("6466f1");
const buttonColor = ref("6466f1");

// options for button type
const value = ref(null);
const options = ref([
  { icon: "outlined", value: "outlined", outlined: true, raised: false, rounded: false},
  { icon: "raised", value: "raised", outlined: false, raised: true, rounded: false},
  { icon: "rounded", value: "rounded", outlined: false, raised: false, rounded: true},
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
        summary: "Done",
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
</script>
<template>
  <Toast></Toast>
  <div
    class="flex align-items-center justify-content-center min-w-screen overflow-hidden"
  >
    <ProgressSpinner v-if="loading"></ProgressSpinner>
    <div v-else class="flex flex-column text-center w-10 sm:w-8 md:w-5">
      <Card class="mt-4 mb-4">
        <template #title> CSP Profile </template>
        <template #content>
          <Image
            :src="csp.imageURL"
            width="250"
            preview
            class="mb-2 flex-shrink-0"
          />
          <div class="card flex justify-content-center">
            <div class="flex flex-column gap-2 mb-3">
              <label for="title">Username</label>
              <InputText id="title" :value="csp.title" v-model="title" />

              <label for="desc">Description</label>
              <Textarea
                id="desc"
                :value="csp.desc"
                v-model="desc"
                rows="5"
                cols="30"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Fonts -->
      <div class="card">
        <Fieldset legend="Fonts" :toggleable="true">
          <div class="card flex flex-wrap gap-3 align-items-center">
            <div class="flex-1 flex flex-column align-items-center">
              <label for="cp-hex" class="font-bold block mb-2"> Colours </label>
              <ColorPicker
                v-model="fontColor"
                inputId="cp-hex"
                format="hex"
                class="mb-3"
              />
              <span>{{ fontColor }}</span>
            </div>
            <div class="flex-1 flex flex-column align-items-center">
              <InputText type="text" v-model="fontColor" />
            </div>
          </div>
        </Fieldset>
      </div>

      <!-- Buttons -->
      <div class="card">
        <Fieldset legend="Buttons" :toggleable="true">
          <div class="card flex flex-wrap gap-3 align-items-center mb-4">
            <div class="flex-1 flex flex-column align-items-center">
              <ColorPicker
                v-model="buttonColor"
                inputId="cp-hex"
                format="hex"
                class="mb-3"
              />
              <span>{{ buttonColor }}</span>
            </div>
            <div class="flex-1 flex flex-column align-items-center">
              <InputText type="text" v-model="buttonColor" />
            </div>
          </div>
          <div class="card flex justify-content-center">
            <SelectButton
              v-model="value"
              :options="options"
              optionLabel="value"
              dataKey="value"
              aria-labelledby="custom"
            >
              <template #option="slotProps">
                <Button
                  :rounded="slotProps.option.rounded"
                  :raised="slotProps.option.raised"
                  :outlined="slotProps.option.outlined"
                  :label="slotProps.option.icon"
                  :class="'align-items-center justify-content-center'"

                ></Button>
              </template>
            </SelectButton>
          </div>
        </Fieldset>
      </div>

      <!-- Links -->
      <Card class="mt-4 mb-4">
        <template #title> Links </template>
        <template #content>
          <Button
            rounded
            @click="add()"
            class="align-items-center justify-content-center"
            ><i class="pi pi-plus px-2"></i>Add</Button
          >
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
          <Button
            rounded
            label="Save"
            @click="save()"
            class="align-items-center justify-content-center"
            ><i class="pi pi-save px-2"></i>Save</Button
          >
        </template>
      </Card>
    </div>
  </div>
</template>

<style>
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

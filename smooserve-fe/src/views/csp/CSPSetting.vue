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

function removeAt(idx) {
  this.list.splice(idx, 1);
}

function add() {
  this.list.push({ name: "paperclip", text: "" });
  console.log(this.list);
}

function save() {
  this.csp.urls = this.list;

  axios
    .put("https://smooserve-be.vercel.app/api/csp/" + CSPid, this.csp)
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
    .get("http://localhost:8080/api/csp/" + CSPid)
    .then((response) => {
      csp.value = response.data;
      response.data.urls ? list.value = response.data.urls : list.value;
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
      <Image
        :src="csp.imageURL"
        width="250"
        preview
        class="mb-2 flex-shrink-0"
      />

      <div class="mb-3">
        <h1>{{ csp.title }}</h1>
        <p>
          {{ csp.desc }}
        </p>
      </div>

      <Button rounded @click="add()" class="align-items-center justify-content-center"><i class="pi pi-plus px-2"></i>Add</Button>
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
      <Button rounded label="Save" @click="save()" class="align-items-center justify-content-center"><i class="pi pi-save px-2"></i>Save</Button>
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

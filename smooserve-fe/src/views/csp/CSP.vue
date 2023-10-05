<script setup>
import { computed } from 'vue'

defineProps({
  id: String,
  name: String
})
    const logoUrl = computed(() => {
    return `layout/images/logo-white.png`;
});
</script>
<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, {{ $route.params.id }}!</div>
                        <span class="text-600 font-medium">Email: {{ $route.params.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
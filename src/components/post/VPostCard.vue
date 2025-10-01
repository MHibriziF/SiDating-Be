<script setup lang="ts">
interface Props {
  username: string
  caption: string
  imageUrl: string
}

const props = defineProps<Props>()
</script>

<template>
  <article class="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <img :src="props.imageUrl" alt="post image" class="w-full aspect-square object-cover block" />
    <div class="p-3 flex-1">
      <h3 class="m-0 mb-1 text-base font-semibold text-gray-900">{{ props.username }}</h3>
      <p class="m-0 text-sm text-gray-700 leading-snug">{{ props.caption }}</p>
    </div>
    <div class="p-3 pt-0 mt-auto">
      <slot name="actions" />
    </div>
  </article>
  
</template>




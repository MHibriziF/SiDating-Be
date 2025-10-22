<script setup lang="ts">
import VButton from '../common/VButton.vue'
import { usePostStore } from '@/stores/post/post.store';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['deleted'])
const postStore = usePostStore();
const router = useRouter();
const route = useRoute();
const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
})

const deletePost = async () => {
    const deleted = await postStore.deletePost({id: props.postId});
    if (deleted) {      
      if (route.name === 'detail-post') {
        await router.push({ name: 'post' });
      }
    }
}
</script>

<template>
  <VButton @click="deletePost" class="del-button">Hapus</VButton>
</template>

<style scoped>
@reference "@/assets/main.css";

.del-button {
  @apply bg-rose-600 hover:bg-rose-800 text-white;
}
</style>

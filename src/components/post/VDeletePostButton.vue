<script setup lang="ts">
import VButton from '../common/VButton.vue'
import { postService } from '@/services/post.service';
import { toast } from 'vue-sonner'

const emit = defineEmits(['deleted'])

const { postId: postId } = defineProps({
  postId: {
    type: String,
    required: true,
  },
})

const deletePost = () => {
  const removed = postService.deletePost(postId)
  if (removed) {
    toast.success('Post deleted successfully')
    emit('deleted', postId)
  } else {
    toast.error('Failed to delete post')
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

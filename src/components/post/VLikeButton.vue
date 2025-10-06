<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import VButton from '../common/VButton.vue'
import VDropdown from '../common/VDropdown.vue'
import { postService } from '@/services/post.service'
import { profileService } from '@/services/profile.service'
import { toast } from 'vue-sonner'

const emit = defineEmits<{ (e: 'toggled', postId: string, liked: boolean): void }>()

const { postId } = defineProps({
  postId: {
    type: String,
    required: true,
  },
})

const selectedUserId = ref<string | null>(null)

const userOptions = computed(() =>
  profileService.getAllProfiles().map(p => ({ value: p.id, label: p.name }))
)

const likedState = ref(false)

function recomputeLikedState() {
  const post = postService.getPost(postId)
  likedState.value = !!(post && selectedUserId.value && post.likes.includes(selectedUserId.value))
}

watch(selectedUserId, () => {
  recomputeLikedState()
}, { immediate: true })

const likePost = () => {
  if (!selectedUserId.value) {
    toast.error('Please select a user to like as')
    return
  }
  const liked = postService.likePost(postId, selectedUserId.value)
  if (liked) {
    toast.success('Post liked')
  } else {
    toast.success('Like removed')
  }
  likedState.value = liked
  emit('toggled', postId, liked)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <VDropdown
      id="like-user"
      label=""
      :options="userOptions"
      v-model="selectedUserId"
    />
    <VButton @click="likePost" class="like-button w-auto px-3 py-1 rounded-xl">{{ likedState ? 'Unlike' : 'Like' }}</VButton>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.like-button {
  @apply bg-blue-600 hover:bg-blue-800 text-white;
}
</style>

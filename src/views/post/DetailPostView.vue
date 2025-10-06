<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postService } from '@/services/post.service'
import { profileService } from '@/services/profile.service'
import VButton from '@/components/common/VButton.vue'
import VDeletePostButton from '@/components/post/VDeletePostButton.vue'
import VLikeButton from '@/components/post/VLikeButton.vue'

const route = useRoute()
const router = useRouter()

const postId = computed(() => String(route.params.id))
const post = computed(() => postService.getPost(postId.value))

const displayName = computed(() => {
  if (!post.value) return ''
  const profile = profileService.getAllProfiles().find(p => p.id === post.value!.userId)
  return profile?.name ?? post.value!.userId
})

const likeCount = ref(0)
watch(
  () => post.value,
  (p) => {
    likeCount.value = p?.likes.length ?? 0
  },
  { immediate: true }
)
const createdAt = computed(() => post.value?.createdAt ? new Date(post.value.createdAt).toLocaleString() : '')
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 pt-20 pb-10">
    <div class="mb-4">
      <VButton @click="router.push({ name: 'post' })" class="bg-gray-200 hover:bg-gray-300 text-gray-900 w-auto px-4 py-2 rounded-xl">Back</VButton>
    </div>
    <div v-if="post" class="max-w-3xl mx-auto">
      <div class="flex flex-col rounded-2xl border border-gray-200 bg-white shadow overflow-hidden">
        <img :src="post.imageUrl" alt="post image" class="w-full aspect-[4/3] object-cover" />
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ displayName }}</h2>
          <p class="text-base text-gray-800 mb-4">{{ post.caption }}</p>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span>Likes: <strong>{{ likeCount }}</strong></span>
            <span>Created: {{ createdAt }}</span>
          </div>
          <div class="mt-6 space-y-3">
            <div class="flex gap-2">
              <VButton @click="router.push({ name: 'edit-post', params: { id: post!.id } })" class="bg-amber-500 hover:bg-amber-600 text-white w-auto px-3 py-1 rounded-xl">Edit</VButton>
              <VDeletePostButton :post-id="post!.id" @deleted="() => router.push({ name: 'post' })" />
            </div>
            <div>
              <VLikeButton :post-id="post!.id" @toggled="() => { const p = postService.getPost(post!.id); likeCount = p ? p.likes.length : 0 }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

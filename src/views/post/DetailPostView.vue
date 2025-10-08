<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { usePostStore } from '@/stores/post/post.store'
import { useUserProfileStore } from '@/stores/profile/profile.store'

import VButton from '@/components/common/VButton.vue'
import VDeletePostButton from '@/components/post/VDeletePostButton.vue'
import VLikeButton from '@/components/post/VLikeButton.vue'
import type { Post } from '@/interfaces/post.interface'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const userProfileStore = useUserProfileStore()


const { profilesById } = storeToRefs(userProfileStore)

const post = ref<Post | null>(null)
const isLoading = ref(true)
const postId = route.params.id as string

async function fetchPostDetails() {
  const fetchedPost = await postStore.getPostById(postId)
  post.value = fetchedPost

 
  if (fetchedPost) {
    userProfileStore.fetchProfiles()
  }
}


onMounted(async () => {
  try {
    await fetchPostDetails()
  } catch (error) {
    console.error("Failed to load post details:", error)
  } finally {
    isLoading.value = false
  }
})

// 5. Sederhanakan computed properties
const displayName = computed(() => {
  if (!post.value) return ''
  // Gunakan getter dari store untuk performa lebih baik
  return profilesById.value.get(post.value.userProfileId) ?? post.value.userProfileId
})

const likeCount = computed(() => post.value?.likes.length ?? 0)

const createdAt = computed(() => {
  return post.value?.createdAt ? new Date(post.value.createdAt).toLocaleString() : ''
})
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 pt-20 pb-10">
    <div class="mb-4">
      <VButton @click="router.push({ name: 'post' })" class="bg-gray-200 hover:bg-gray-300 text-gray-900 w-auto px-4 py-2 rounded-xl">Back</VButton>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-gray-600">
      Loading post details... ⏳
    </div>

    <div v-else-if="post" class="max-w-3xl mx-auto">
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
              <VButton @click="router.push({ name: 'edit-post', params: { id: post.id } })" class="bg-amber-500 hover:bg-amber-600 text-white w-auto px-3 py-1 rounded-xl">Edit</VButton>
              <VDeletePostButton :post-id="post.id" @deleted="() => router.push({ name: 'post' })" />
            </div>
            <div>
                <VLikeButton 
                  :post-id="post.id" 
                  :likes="post.likes" 
                  @like-updated="fetchPostDetails" 
                />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-10 text-gray-600">
      <h2>Post not found</h2>
      <p>The post you are looking for does not exist or has been deleted.</p>
    </div>
  </div>
</template>
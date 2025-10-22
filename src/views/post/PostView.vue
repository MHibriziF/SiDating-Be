<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VPostCard from '@/components/post/VPostCard.vue'
import VButton from '@/components/common/VButton.vue'
import VDeletePostButton from '@/components/post/VDeletePostButton.vue'
import VLikeButton from '@/components/post/VLikeButton.vue'
import VPostFilterDropdown from '@/components/post/VPostFilterDropdown.vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post/post.store'
import { useUserProfileStore } from '@/stores/profile/profile.store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const postStore = usePostStore();
const userProfileStore = useUserProfileStore();

const { posts, loading: postsLoading } = storeToRefs(postStore)
const { profiles, profilesById, loading: profilesLoading } = storeToRefs(userProfileStore)

const selectedUserId = ref<string | null>(null)
const selectedDate = ref<string | null>(null)

onMounted(() => {
  userProfileStore.fetchProfiles()
  postStore.fetchPosts()
});

function applyFilters() {
  postStore.fetchPosts({
    userId: selectedUserId.value,
    date: selectedDate.value
  })
}

function clearDateFilter() {
    selectedDate.value = null;
    applyFilters();
}

const userOptions = computed(() => [
  { value: '', label: 'All users' },
  ...profiles.value.map(p => ({ value: p.id, label: p.name }))
])

function getDisplayName(userId: string): string {
  return profilesById.value.get(userId) ?? userId
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 pt-20 pb-24">
    <div class="mb-4 flex items-center justify-between">
      <VButton @click="router.push({ name: 'create-post' })" class="bg-indigo-600 hover:bg-indigo-700 text-white w-auto px-4 py-2 rounded-xl">Create Post</VButton>
    </div>

    <div class="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      <VPostFilterDropdown
        id="filter-user"
        label="Filter by user"
        :options="userOptions"
        v-model="selectedUserId"
        @update:modelValue="applyFilters"
      />
      
      <div class="flex flex-col">
        <label for="filter-date" class="block text-sm font-medium text-gray-700">Filter by date</label>
        <div class="mt-1 flex items-center gap-2">
            <input
              type="date"
              id="filter-date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              v-model="selectedDate"
              @change="applyFilters"
            />
            <button 
              v-if="selectedDate"
              @click="clearDateFilter" 
              class="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md">
              Clear
            </button>
        </div>
      </div>
    </div>

    <div v-if="postsLoading || profilesLoading" class="py-12 text-center text-gray-600">
      Loading posts...
    </div>

    <section v-else-if="posts.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-4">
      <VPostCard
        v-for="p in posts"
        :key="p.id"
        :username="getDisplayName(p.userProfileId)"
        :caption="p.caption"
        :image-url="p.imageUrl"
      >
        <template #actions>
          <div class="space-y-2">
            <div class="flex gap-2">
              <VButton @click="router.push({ name: 'detail-post', params: { id: p.id } })" class="bg-blue-600 hover:bg-blue-700 text-white w-auto px-3 py-1 rounded-xl">View</VButton>
              <VButton @click="router.push({ name: 'edit-post', params: { id: p.id } })" class="bg-amber-500 hover:bg-amber-600 text-white w-auto px-3 py-1 rounded-xl">Edit</VButton>
              <VDeletePostButton :post-id="p.id" />
            </div>
            <div>
              <VLikeButton :post-id="p.id" :likes="p.likes" />
            </div>
          </div>
        </template>
      </VPostCard>
    </section>
    
    <div v-else class="py-12 text-center text-gray-600">
      No post yet. Be the first to make one!
    </div>
  </div>
</template>
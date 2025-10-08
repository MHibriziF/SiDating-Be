<script setup lang="ts">
import { computed, ref } from 'vue'
import { postService } from '@/services/post.service'
import { profileService } from '@/services/profile.service'
import VPostCard from '@/components/post/VPostCard.vue'
import VButton from '@/components/common/VButton.vue'
import VDeletePostButton from '@/components/post/VDeletePostButton.vue'
import VLikeButton from '@/components/post/VLikeButton.vue'
import VPostFilterDropdown from '@/components/post/VPostFilterDropdown.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const posts = ref(postService.getAllPosts())
const selectedUserId = ref<string | null>(null)
const selectedSort = ref<'asc' | 'desc' | null>(null)
function handleDeleted(id: string) {
  posts.value = posts.value.filter(p => p.id !== id)
}

const profilesById = computed(() => {
  const map = new Map<string, string>()
  for (const profile of profileService.getAllProfiles()) {
    map.set(profile.id, profile.name)
  }
  return map
})

function getDisplayName(userId: string): string {
  return profilesById.value.get(userId) ?? userId
}

const userOptions = computed(() => [{ value: '', label: 'All users' }, ...profileService.getAllProfiles().map(p => ({ value: p.id, label: p.name }))])
const sortOptions = [
  { value: 'desc', label: 'Newest first' },
  { value: 'asc', label: 'Oldest first' },
]

function applyFilters() {
  let data = postService.getAllPosts()
  if (selectedUserId.value) {
    data = postService.filter(String(selectedUserId.value), selectedSort.value ?? 'desc')
  } else if (selectedSort.value) {
    data = postService.sortPosts(selectedSort.value)
  }
  posts.value = data
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 pt-20 pb-24">
    <div class="mb-4 flex items-center justify-between">
      
    <VButton @click="router.push({ name: 'create-post' })" class="bg-indigo-600 hover:bg-indigo-700 text-white w-auto px-4 py-2 rounded-xl">Create Post</VButton>
    </div>
    <div class="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <VPostFilterDropdown
        id="filter-user"
        label="Filter by user"
        :options="userOptions"
        v-model="selectedUserId"
        @update:modelValue="applyFilters"
      />
      <VPostFilterDropdown
        id="sort-date"
        label="Sort by date"
        :options="sortOptions"
        v-model="selectedSort"
        @update:modelValue="applyFilters"
      />
    </div>
    <section v-if="posts.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-4">
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
              <VDeletePostButton :post-id="p.id" @deleted="handleDeleted" />
            </div>
            <div>
              <VLikeButton :post-id="p.id" />
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


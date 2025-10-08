  <script setup lang="ts">
  import { ref, computed, onMounted, type PropType, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { toast } from 'vue-sonner'
  import { useUserProfileStore } from '@/stores/profile/profile.store'
  import { usePostStore } from '@/stores/post/post.store'

  import VButton from '../common/VButton.vue'
  import VDropdown from '../common/VDropdown.vue'


  const emit = defineEmits<{ (e: 'like-updated'): void }>()

  const props = defineProps({
    postId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array as PropType<string[]>, 
      required: true,
    },
  })

  const userProfileStore = useUserProfileStore()
  const postStore = usePostStore()
  const { profiles, loading: profilesLoading } = storeToRefs(userProfileStore)

  const selectedUserId = ref<string | null>(null)

  const userOptions = computed(() =>
    profiles.value.map(p => ({ value: p.id, label: p.name }))
  )

  const likedState = computed(() => {
    if (!selectedUserId.value) return false
    return props.likes.includes(selectedUserId.value)
  })

  const likePost = async () => {
    if (!selectedUserId.value) {
      toast.error('Please select a user to like as')
      return
    }

    const payload = {
      postId: props.postId,
      userProfileId: selectedUserId.value,
    }

    const success = await postStore.likePost(payload)
    
    if (success) {
      emit('like-updated')
    }
  }
  </script>

  <template>
    <div class="flex items-center gap-2">
      <VDropdown
        id="like-user"
        label=""
        :options="userOptions"
        v-model="selectedUserId"
        :disabled="profilesLoading"
        :placeholder="profilesLoading ? 'Loading...' : 'Select user'"
      />
      <VButton @click="likePost" class="like-button w-auto px-3 py-1 rounded-xl">
        {{ likedState ? 'Unlike' : 'Like' }}
      </VButton>
    </div>
  </template>

  <style scoped>
  @reference "@/assets/main.css";

  .like-button {
    @apply bg-blue-600 hover:bg-blue-800 text-white;
  }
  </style>
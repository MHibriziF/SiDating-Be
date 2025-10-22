<script setup lang="ts">
import VButton from '../common/VButton.vue'
import { useUserProfileStore } from '@/stores/profile/profile.store'

const userProfileStore = useUserProfileStore()

const { profileId } = defineProps({
  profileId: {
    type: String,
    required: true,
  },
})

const deleteProfile = () => {
  userProfileStore.deleteProfile(profileId)
}
</script>

<template>
  <VButton @click="deleteProfile" class="del-button">Hapus</VButton>
</template>

<style scoped>
@reference "@/assets/main.css";

.del-button {
  @apply bg-rose-600 hover:bg-rose-800 text-white;
}
</style>

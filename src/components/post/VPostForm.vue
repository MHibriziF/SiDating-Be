<script setup lang="ts">
import VInput from '../common/VInput.vue';
import VTextArea from '../common/VTextArea.vue';
import VButton from '../common/VButton.vue';
import { type PropType, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router'; 
import type { PostRequest } from '@/interfaces/post.interface';
import { profileService } from '@/services/profile.service';
import VDropdown from '../common/VDropdown.vue';

const router = useRouter();
const users = profileService.getAllProfiles();

const props = defineProps({
  action: {
    type: Function as PropType<(data: PostRequest) => Promise<void>>,
    required: true
  },
  postModel: {
    type: Object as PropType<PostRequest>,
    required: true
  }
});

const model = toRefs(props).postModel;

const emit = defineEmits(['update:modelValue']);

watch(
  () => model,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
  { deep: true }
);

const handleSubmit = async () => await props.action(model.value);
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 py-4">
    <VDropdown
      v-model="model.userId"
      :options="users.map(u => ({ value: u.id, label: u.name }))"
      id="user"
      name="user"
      label="Posted By"
    />
    <VTextArea v-model="model.caption" id="caption" name="caption" label="Caption" />
    <VInput v-model="model.imageUrl" id="imageUrl" name="imageUrl" label="Image URL" />
    <div class="flex justify-end gap-2 pt-4">
      <VButton @click="router.back()" type="button" class="bg-slate-600 hover:bg-slate-800 text-white">Kembali</VButton>
      <VButton type="submit" class="bg-pink-600 hover:bg-pink-800 text-white">Simpan</VButton>
    </div>
  </form>
</template>

<style scoped>
</style>

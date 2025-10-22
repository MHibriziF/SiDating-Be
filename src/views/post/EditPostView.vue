<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VPostForm from '@/components/post/VPostForm.vue'
import type { PostRequest, UpdatePostRequest } from '@/interfaces/post.interface'
import { toast } from 'vue-sonner'
import { usePostStore } from '@/stores/post/post.store'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore() 

const id = route.params.id as string

const postModel = reactive<PostRequest>({
  userProfileId: '', 
  imageUrl: '',
  caption: '',
})


onMounted(async () => {
  const existingPost = await postStore.getPostById(id)

  if (existingPost) {
    postModel.userProfileId = existingPost.userProfileId
    postModel.imageUrl = existingPost.imageUrl
    postModel.caption = existingPost.caption
  } else {

    toast.error('Post not found!')
    router.replace('/posts')
  }
})


const handleUpdate = async (formData: PostRequest) => {
  const payload: UpdatePostRequest = {
    id: id,
    userProfileId: formData.userProfileId,
    caption: formData.caption,
    imageUrl: formData.imageUrl,
  }

  const result = await postStore.updatePost(payload)
  if (result) { 
    router.push('/posts')
  } 
}
</script>

<template>
  <main class="w-full min-h-screen bg-pink-500/20 pt-24 py-10 px-4 overflow-y-auto">
    <div class="mx-auto w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col gap-4">
      <h1 class="text-pink-600 font-bold text-xl">Edit Post</h1>
      <VPostForm :postModel="postModel" :action="handleUpdate"/>
    </div>
  </main>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postService } from '@/services/post.service'
import VPostForm from '@/components/post/VPostForm.vue'
import type { PostRequest } from '@/interfaces/post.interface'
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()

const id = route.params.id as string
const existing = postService.getPost(id)

if (!existing) {
  router.replace('/posts')
}

const postModel = reactive<PostRequest>({
  userProfileId: existing?.userProfileId || '',
  imageUrl: existing?.imageUrl || '',
  caption: existing?.caption || '',
})

const updatePost = async (bodyRequest: PostRequest) => {
  if (await postService.updatePost(id, bodyRequest)) {
    toast.success('Post updated successfully')
  } else {
    toast.error('Failed to update post')
  }
  router.push('/posts')
}
</script>

<template>
  <main class="w-full min-h-screen bg-pink-500/20 pt-24 py-10 px-4 overflow-y-auto">
    <div class="mx-auto w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col gap-4">
      <h1 class="text-pink-600 font-bold text-xl">Edit Post</h1>
      <VPostForm :postModel="postModel" :action="updatePost"/>
    </div>
  </main>
</template>

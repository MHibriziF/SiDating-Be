<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { postService } from '@/services/post.service'
import VPostForm from '@/components/post/VPostForm.vue'
import type { PostRequest } from '@/interfaces/post.interface'
import { toast } from 'vue-sonner'

const router = useRouter();

const postModel = reactive<PostRequest>({
  userId: "",
  imageUrl: "",
  caption: "",
});

const addPost = async (bodyRequest: PostRequest) => {
  if (await postService.createPost(bodyRequest)) {
    router.push('/posts')
  } else {
    toast.error('Failed to create post')
    return
  }
  toast.success('Post created successfully')
}

console.log("postModel", postModel);
</script>
<template>
  <main class="w-full min-h-screen bg-pink-500/20 pt-24 py-10 px-4 overflow-y-auto">
    <div class="mx-auto w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col gap-4">
      <h1 class="text-pink-600 font-bold text-xl">Tambah Profil</h1>
      <VPostForm :postModel="postModel" :action="addPost"/>
    </div>
  </main>
</template>


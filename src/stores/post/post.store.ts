import type { Post, PostRequest, UpdatePostRequest, LikePostRequest, DeletePostRequest } from '@/interfaces/post.interface';
import { defineStore } from 'pinia'
import axios from "axios";
import { toast } from 'vue-sonner';
import type { CommonResponseInterface } from '@/interfaces/common.response.interface';

const basePostUrl = import.meta.env.VITE_API_URL + '/posts';
interface PostFilters {
  userId?: string | null;
  date?: string | null; 
}

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [] as Post[],
        loading: false,
        error: null as null | string,
    }),
    actions: {
        async fetchPosts(filters: PostFilters = {}) {
            this.loading = true;
            this.error = null;

            try {
                const params = new URLSearchParams();
                if (filters.userId) {
                    params.append('userId', filters.userId);
                }
    
                if (filters.date) {
                    params.append('date', filters.date);    
                }

                const response = await axios.get<CommonResponseInterface<Post[]>>(`${basePostUrl}?${params.toString()}`);
                this.posts = response.data.data;
                if (this.posts.length === 0) {
                    toast.warning('Data post kosong')
                }
                else {
                    toast.success('Data post berhasil dimuat')
                }
                return response.data.data;
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Unknown error';
                toast.error(`Error saat memuat post: ${this.error}`);
            } finally {
                this.loading = false;
            }
        },

        async getPostById(postId: string) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get<CommonResponseInterface<Post>>(`${basePostUrl}/${postId}`);
                return response.data.data;
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Unknown error';
                toast.error(`Error saat memuat post: ${this.error}`);
                return null;
            } finally {
                this.loading = false;
            }
        },

        async createPost(postData: PostRequest) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.post<CommonResponseInterface<Post>>(`${basePostUrl}/create`, postData);
                if (response.status === 201) {
                    this.posts.push(response.data.data);
                    toast.success('Post berhasil dibuat')
                    return response.data.data;
                }
                else if (response.status === 400) {
                    toast.warning('Gagal membuat post: Data tidak valid atau ada kesalahan pada permintaan.')
                }
            }
            catch (error) {
                this.error = error instanceof Error ? error.message : 'Unknown error';
                toast.error(`Error saat membuat post: ${this.error}`);
            } finally {
                this.loading = false;
            }
        },

        async updatePost(postData: UpdatePostRequest) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.put<CommonResponseInterface<Post>>(`${basePostUrl}/update`, postData);

                if (response.status === 200) {
                    toast.success('Post berhasil diperbarui')
                    return response.data.data;
                }
                else if (response.status === 400) {
                    toast.warning('Gagal memperbarui post: Data tidak valid atau ada kesalahan pada permintaan.')
                }
                else if (response.status === 404) {
                    toast.warning('Post tidak ditemukan: Data post yang akan diperbarui tidak ditemukan.')
                }
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Unknown error';
                toast.error(`Error saat memperbarui post: ${this.error}`);

            } finally {
                this.loading = false;
            }
        },

        async deletePost(postData: DeletePostRequest) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.delete<CommonResponseInterface<Post>>(`${basePostUrl}/delete`, { data: postData });
                if (response.status === 200) {
                    await this.fetchPosts();
                    toast.success('Post berhasil dihapus: Data post telah berhasil dihapus.');
                    return true;
                }
                else if (response.status === 404) {
                    toast.warning('Post tidak ditemukan: Data post yang akan dihapus tidak ditemukan.');
                }
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Unknown error';
                toast.error(`Error saat menghapus post: ${this.error}`);
            } finally {
                this.loading = false;
            }
        },

        async likePost(likeData: LikePostRequest) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post<CommonResponseInterface<Post>>(`${basePostUrl}/like`, likeData);
                if (response.status === 200) {
                    toast.success(`${response.data.message}`);
                    return response.data.data;
                }
                else if (response.status === 400) {
                    toast.warning('Gagal menyukai post: Data tidak valid atau ada kesalahan pada permintaan.');
                }
                else if (response.status === 404) {
                    toast.warning('Post tidak ditemukan: Data post yang akan disukai tidak ditemukan.');
                }
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Unknown error';
                toast.error(`Error saat menyukai post: ${this.error}`);
                return null;
            } finally {
                this.loading = false;
            }
        }
    }
})
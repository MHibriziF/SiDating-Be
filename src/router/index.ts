import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/profile/ProfileView.vue'
import DetailProfileView from '../views/profile/DetailProfileView.vue'
import CreateProfileView from '@/views/profile/CreateProfileView.vue'
import EditProfileView from '@/views/profile/EditProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profiles',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/profiles/:id',
      name: 'detail-profile',
      component: DetailProfileView,
    },
    {
      path: '/profiles/add',
      name: 'create-profile',
      component: CreateProfileView,
    },    
    {
      path: '/profiles/:id/edit',
      name: 'edit-profile',
      component: EditProfileView,
    },
    
  ],
})

export default router

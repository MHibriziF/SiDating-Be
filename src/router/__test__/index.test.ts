import {
  describe,
  it,
  expect
} from 'vitest'
import {
  createMemoryHistory
} from 'vue-router'
import router from '../index'
import HomeView from '../../views/HomeView.vue'
import ProfileView from '../../views/profile/ProfileView.vue'

describe('Router', () => {
  it('should have correct route configuration', () => {
    const routes = router.getRoutes()

    expect(routes).toHaveLength(5)

    // Check home route
    const homeRoute = routes.find(route => route.path === '/')
    expect(homeRoute).toBeDefined()
    expect(homeRoute ?.name).toBe('home')
    expect(homeRoute ?.components ?.default).toBe(HomeView)

    // Check profiles route
    const profilesRoute = routes.find(route => route.path === '/profiles')
    expect(profilesRoute).toBeDefined()
    expect(profilesRoute ?.name).toBe('profile')
    expect(profilesRoute ?.components ?.default).toBe(ProfileView)

    // Check create profile route
    const createProfileRoute = routes.find(route => route.path === '/profiles/add')
    expect(createProfileRoute).toBeDefined()
    expect(createProfileRoute ?.name).toBe('create-profile')

    // Check edit profile route
    const editProfileRoute = routes.find(route => route.path === '/profiles/:id/edit')
    expect(editProfileRoute).toBeDefined()
    expect(editProfileRoute ?.name).toBe('edit-profile')

    // Check detail profile route
    const detailProfileRoute = routes.find(route => route.path === '/profiles/:id')
    expect(detailProfileRoute).toBeDefined()
    expect(detailProfileRoute ?.name).toBe('detail-profile')
  })

  it('should navigate to home route', async () => {
    await router.push('/')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('should navigate to profiles route', async () => {
    await router.push('/profiles')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/profiles')
    expect(router.currentRoute.value.name).toBe('profile')
  })

  it('should use web history mode', () => {
    expect(router.options.history.location).toBeDefined()
  })

  it('should use correct base URL from environment', () => {
    // The router uses import.meta.env.BASE_URL
    expect(router.options.history.base).toBeDefined()
  })

  it('should handle route navigation programmatically', async () => {
    // Start at home
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')

    // Navigate to profiles
    await router.push('/profiles')
    expect(router.currentRoute.value.name).toBe('profile')

    // Navigate back to home
    await router.push({
      name: 'home'
    })
    expect(router.currentRoute.value.name).toBe('home')
    expect(router.currentRoute.value.path).toBe('/')
  })

  it('should handle route navigation by name', async () => {
    await router.push({
      name: 'profile'
    })
    expect(router.currentRoute.value.name).toBe('profile')
    expect(router.currentRoute.value.path).toBe('/profiles')
  })

  it('should maintain route state during navigation', async () => {
    await router.push('/')
    const homeRoute = router.currentRoute.value

    await router.push('/profiles')
    const profilesRoute = router.currentRoute.value

    expect(homeRoute.path).not.toBe(profilesRoute.path)
    expect(homeRoute.name).not.toBe(profilesRoute.name)
  })
})
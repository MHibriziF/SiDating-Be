import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import EditProfileView from '../EditProfileView.vue'
import { profileService } from '../../../services/profile.service'
import { toast } from 'vue-sonner'

// Mock the profile service
vi.mock('@/services/profile.service', () => ({
  profileService: {
    getProfile: vi.fn(),
    updateProfile: vi.fn()
  }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/profiles/:id/edit', component: EditProfileView },
    { path: '/profiles', component: { template: '<div>Profiles</div>' } }
  ]
})

describe('EditProfileView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockProfile = {
    id: 'test-profile-id',
    name: 'John Doe',
    nickname: 'johndoe',
    birthdate: new Date('1990-01-01'),
    gender: 'Male',
    location: 'Jakarta, Indonesia',
    bio: 'A software developer',
    hobbies: ['reading', 'gaming'],
    interests: ['technology', 'sports'],
    email: 'john@example.com',
    phoneNumber: '+628123456789',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-06-01'),
    isActive: true
  }

  it('should render correctly with existing profile data', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('h1').text()).toBe('Edit Profil')
    expect(wrapper.find('h1').classes()).toContain('text-pink-600')
    expect(wrapper.find('h1').classes()).toContain('font-bold')
    expect(wrapper.find('h1').classes()).toContain('text-xl')
  })

  it('should have correct layout structure', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    expect(main.classes()).toContain('w-full')
    expect(main.classes()).toContain('min-h-screen')
    expect(main.classes()).toContain('bg-pink-500/20')
    expect(main.classes()).toContain('pt-24')
    expect(main.classes()).toContain('py-10')
    expect(main.classes()).toContain('px-4')
    expect(main.classes()).toContain('overflow-y-auto')
    
    const container = wrapper.find('div.max-w-3xl')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('mx-auto')
    expect(container.classes()).toContain('w-full')
    expect(container.classes()).toContain('bg-white')
    expect(container.classes()).toContain('shadow-lg')
    expect(container.classes()).toContain('rounded-2xl')
  })

  it('should render VProfileForm component with correct props', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    const profileForm = wrapper.findComponent({ name: 'VProfileForm' })
    expect(profileForm.exists()).toBe(true)
    
    const props = profileForm.props()
    expect(props.profileModel).toBeDefined()
    expect(props.action).toBe((wrapper.vm as any).updateProfile)
  })

  it('should initialize profileModel with existing profile data', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    const profileModel = (wrapper.vm as any).profileModel
    expect(profileModel.name).toBe('John Doe')
    expect(profileModel.nickname).toBe('johndoe')
    expect(profileModel.email).toBe('john@example.com')
    expect(profileModel.phoneNumber).toBe('+628123456789')
    expect(profileModel.bio).toBe('A software developer')
    expect(profileModel.birthdate).toBe('1990-01-01')
    expect(profileModel.gender).toBe('Male')
    expect(profileModel.location).toBe('Jakarta, Indonesia')
    expect(profileModel.hobbies).toEqual(['reading', 'gaming'])
    expect(profileModel.interests).toEqual(['technology', 'sports'])
  })

  it('should handle missing profile data gracefully', async () => {
    // Clear previous mock calls
    vi.clearAllMocks()
    
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(undefined)
    
    // Create a fresh router for this test
    const testRouter = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/profiles/:id/edit', component: EditProfileView },
        { path: '/profiles', component: { template: '<div>Profiles</div>' } }
      ]
    })
    
    await testRouter.push('/profiles/non-existent-id/edit')
    await testRouter.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [testRouter]
      }
    })
    
    expect(mockGetProfile).toHaveBeenCalledWith('non-existent-id')
    // Should initialize with empty values when profile doesn't exist
    const profileModel = (wrapper.vm as any).profileModel
    expect(profileModel.name).toBe('')
    expect(profileModel.nickname).toBe('')
    expect(profileModel.email).toBe('')
  })

  it('should call profileService.updateProfile when updateProfile is called', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    const mockUpdateProfile = vi.mocked(profileService.updateProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    mockUpdateProfile.mockResolvedValue(mockProfile)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    const profileRequest = {
      name: 'Updated Name',
      nickname: 'updateduser',
      email: 'updated@example.com',
      phoneNumber: '+628987654321',
      bio: 'Updated bio',
      birthdate: '1990-01-01',
      gender: 'Male',
      location: 'Updated Location',
      hobbies: ['updated hobby'],
      interests: ['updated interest']
    }
    
    await (wrapper.vm as any).updateProfile(profileRequest)
    
    expect(mockUpdateProfile).toHaveBeenCalledWith('test-profile-id', profileRequest)
    expect(toast.success).toHaveBeenCalledWith('Profile updated successfully')
  })

  it('should show error toast when profile update fails', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    const mockUpdateProfile = vi.mocked(profileService.updateProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    mockUpdateProfile.mockResolvedValue(undefined)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    const profileRequest = {
      name: 'Updated Name',
      nickname: 'updateduser',
      email: 'updated@example.com',
      phoneNumber: '+628987654321',
      bio: 'Updated bio',
      birthdate: '1990-01-01',
      gender: 'Male',
      location: 'Updated Location',
      hobbies: ['updated hobby'],
      interests: ['updated interest']
    }
    
    await (wrapper.vm as any).updateProfile(profileRequest)
    
    expect(toast.error).toHaveBeenCalledWith('Failed to update profile')
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('should navigate back to profiles page after successful update', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    const mockUpdateProfile = vi.mocked(profileService.updateProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    mockUpdateProfile.mockResolvedValue(mockProfile)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    // Spy on the router push method after mounting
    const routerPushSpy = vi.spyOn(wrapper.vm.$router, 'push')
    
    const profileRequest = {
      name: 'Updated Name',
      nickname: 'updateduser',
      email: 'updated@example.com',
      phoneNumber: '+628987654321',
      bio: 'Updated bio',
      birthdate: '1990-01-01',
      gender: 'Male',
      location: 'Updated Location',
      hobbies: ['updated hobby'],
      interests: ['updated interest']
    }
    
    await (wrapper.vm as any).updateProfile(profileRequest)
    
    expect(routerPushSpy).toHaveBeenCalledWith('/profiles')
  })

  it('should handle birthdate conversion correctly', async () => {
    const profileWithDate = {
      ...mockProfile,
      birthdate: new Date('1995-06-15')
    }
    
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(profileWithDate)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    const profileModel = (wrapper.vm as any).profileModel
    expect(profileModel.birthdate).toBe('1995-06-15')
  })

  it('should handle arrays correctly in profileModel', async () => {
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    
    router.push('/profiles/test-profile-id/edit')
    await router.isReady()
    
    const wrapper = mount(EditProfileView, {
      global: {
        plugins: [router]
      }
    })
    
    const profileModel = (wrapper.vm as any).profileModel
    expect(Array.isArray(profileModel.hobbies)).toBe(true)
    expect(Array.isArray(profileModel.interests)).toBe(true)
    expect(profileModel.hobbies).toEqual(['reading', 'gaming'])
    expect(profileModel.interests).toEqual(['technology', 'sports'])
    
    // Should be copies, not references
    expect(profileModel.hobbies).not.toBe(mockProfile.hobbies)
    expect(profileModel.interests).not.toBe(mockProfile.interests)
  })

  it('should extract profile ID from route params correctly', async () => {
    // Clear previous mock calls
    vi.clearAllMocks()
    
    const mockGetProfile = vi.mocked(profileService.getProfile)
    mockGetProfile.mockReturnValue(mockProfile)
    
    // Create a fresh router for this test
    const testRouter = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/profiles/:id/edit', component: EditProfileView },
        { path: '/profiles', component: { template: '<div>Profiles</div>' } }
      ]
    })
    
    await testRouter.push('/profiles/specific-test-id/edit')
    await testRouter.isReady()
    
    mount(EditProfileView, {
      global: {
        plugins: [testRouter]
      }
    })
    
    expect(mockGetProfile).toHaveBeenCalledWith('specific-test-id')
  })
})
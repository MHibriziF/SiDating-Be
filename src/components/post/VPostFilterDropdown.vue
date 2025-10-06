<script setup lang="ts">
import VDropdown from '@/components/common/VDropdown.vue'

interface Option {
  value: string | number
  label: string
}

const props = withDefaults(defineProps<{
  id: string
  label?: string | null
  options: Option[]
  modelValue: string | number | null
  class?: string
}>(), {
  modelValue: null,
  label: null,
  class: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()
</script>

<template>
  <div :class="['w-full sm:w-64', props.class]">
    <VDropdown
      :id="props.id"
      :label="props.label ?? ''"
      :options="props.options"
      :model-value="props.modelValue"
      @update:modelValue="val => emit('update:modelValue', val)"
    />
  </div>
</template>



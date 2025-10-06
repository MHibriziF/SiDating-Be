<script setup lang="ts">
import VSelect from "./VSelect.vue";

interface Option {
  value: string | number;
  label: string;
}

const props = withDefaults(defineProps<{
  id: string;
  label?: string | null;
  name?: string;
  modelValue: string | number | null;
  options: Option[];
}>(), {
  modelValue: null,
  options: () => [] as Option[],
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
}>();
</script>

<template>
  <VSelect
    :id="id"
    :label="label"
    :name="name"
    :model-value="modelValue != null ? String(modelValue) : ''"
    @update:modelValue="val => emit('update:modelValue', (options.find(o => String(o.value) === val)?.value ?? val))"
  >
    <option v-for="opt in options" :key="opt.value" :value="String(opt.value)">
      {{ opt.label }}
    </option>
  </VSelect>
</template>

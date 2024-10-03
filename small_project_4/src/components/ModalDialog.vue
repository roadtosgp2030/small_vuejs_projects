<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    v-if="isOpen"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
    ref="modalElement"
  >
    <div class="bg-white p-5 rounded max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Add New Card</h2>
      <input
        type="text"
        placeholder="Card Title"
        aria-label="Card Title"
        class="w-full p-2 mb-4 border rounded"
        ref="titleInput"
        v-model="localCard.title"
      />
      <textarea
        class="w-full p-2 mb-4 border rounded"
        placeholder="Description"
        aria-label="Card Description"
        v-model="localCard.description"
      ></textarea>

      <div class="flex justify-end gap-2">
        <button
          class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          @click="$emit('save', localCard)"
        >
          {{ mode === 'add' ? 'Add' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import type { Card } from '@/types';

const { isOpen, card } = defineProps<{
  isOpen: boolean
  card: Card | null
  mode: 'add' | 'edit' 
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'save', card: Card): void
}>()

const titleInput = ref<HTMLInputElement | null>(null)
const modalElement = ref<HTMLDivElement | null>(null)
const localCard = ref<Card>({ id: 0, title: '', description: '' })
const { activate, deactivate } = useFocusTrap(modalElement)

watch(() => card, (newCard) => {
  console.log(card);
  if (newCard) {
    localCard.value = {...newCard}
  } else {
    localCard.value = { id: 0, title: '', description: '' }
  }
}, {immediate: true})

watch(
  () => isOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      activate()
      titleInput.value?.focus()
    } else {
      deactivate()
    }
  }
)
</script>

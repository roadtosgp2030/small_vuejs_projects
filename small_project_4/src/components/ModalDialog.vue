<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    v-if="isOpen"
    @click="$emit('close')"
    @keydown.esc="$emit('close')"
    ref="modalElement"
  >
    <div class="bg-white p-5 rounded max-w-md w-full" @click.stop>
      <h2 class="text-xl font-bold mb-4">Add New Card</h2>
      <input
        type="text"
        placeholder="Card Title"
        aria-label="Card Title"
        class="w-full p-2 mb-4 border rounded"
        ref="titleInput"
      />
      <textarea
        class="w-full p-2 mb-4 border rounded"
        placeholder="Description"
        aria-label="Card Description"
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
          @click="$emit('close')"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const { isOpen } = defineProps<{
  isOpen: boolean
}>()
defineEmits<{
  (e: 'close'): void
}>()

const titleInput = ref<HTMLInputElement | null>(null)

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

const modalElement = ref<HTMLDivElement | null>(null)
const { activate, deactivate } = useFocusTrap(modalElement)
</script>

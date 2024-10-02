<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBookings">
      Could not load bookings at the moment. Please try again.
    </ErrorCard>
  </template>

  <template v-else>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!loading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel="cancelBooking(booking.id)"
        ></BookingItem>
      </template>
      <template v-else>
        <LoadingBookingCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>

<script setup>
import { onMounted } from 'vue'
import BookingItem from './BookingItem.vue'
import LoadingBookingCard from './LoadingBookingCard.vue'
import useBookings from '@/composables/useBookings'
import ErrorCard from '@/components/ErrorCard.vue'

const { bookings, loading, error, cancelBooking, fetchBookings } = useBookings()

onMounted(fetchBookings)
</script>

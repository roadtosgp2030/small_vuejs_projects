import { ref } from 'vue'

const bookings = ref([])
const loading = ref(false)
const error = ref(null)

const fetchBookings = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3001/bookings')
    bookings.value = await response.json()
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const findBookingById = (bookingId) => bookings.value.findIndex((b) => b.id === bookingId)

const handleRegistration = async (event) => {
  if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('You are already registered for this event.')
    return
  }

  const newBooking = {
    id: crypto.randomUUID(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending'
  }

  bookings.value.push(newBooking)

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...newBooking, status: 'confirmed' })
    })

    if (response.ok) {
      const index = findBookingById(newBooking.id)
      bookings.value[index] = await response.json()
    } else {
      throw new Error('Failed to confirm booking.')
    }
  } catch (error) {
    console.error(`Failed to register for event: `, error)
    bookings.value = bookings.value.filter((booking) => booking.id !== newBooking.id)
  }
}

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId)
  const originalBooking = bookings.value[index]
  bookings.value.splice(index, 1)

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Booking could not ve cancelled.')
    }
  } catch (error) {
    console.error(`Failed to cancel booking:`, error)
    bookings.value.splice(index, 0, originalBooking)
  }
}

export default function useBookings() {
  return {
    bookings,
    loading,
    error,
    fetchBookings,
    handleRegistration,
    cancelBooking
  }
}

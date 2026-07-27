export const getBookingDetails = async (id) => {
  const res = await fetch(`process.env.NEXT_PUBLIC_BASE_URL/my-bookings/api/single-booking/${id}`)
  const data = await res.json();
  return data;
} 
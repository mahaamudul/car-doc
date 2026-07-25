export const getBookingDetails = async (id) => {
  const res = await fetch(`http://localhost:3000/my-bookings/api/single-booking/${id}`)
  const data = await res.json();
  return data;
}
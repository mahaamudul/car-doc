export const getServices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`)
  const data = await res.json();
  return data;
}

export const getServiceDetails = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`)
  const data = await res.json();
  return data;
} 
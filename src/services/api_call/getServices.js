export const getServices = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`, {
      cache: "no-store", // Ensures fresh data
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    // Handles whether your API returns { services: [...] } or direct array [...]
    return data.services || data || [];
  } catch (err) {
    console.error("Failed to fetch services:", err);
    return [];
  }
};

export const getServiceDetails = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`)
  const data = await res.json();
  return data;
} 
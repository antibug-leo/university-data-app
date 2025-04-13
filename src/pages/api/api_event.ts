export const fetchUniversities = async (
  country: string,
  search: string,
  page: number,
  limit: number
) => {
  const url = `/api/main?country=${encodeURIComponent(
    country
  )}&search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch universities");
  return response.json();
};

export const toggleFavorite = async (id: string) => {
  const response = await fetch("/api/main", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uni_id: id }),
  });
  if (!response.ok) throw new Error("Failed to toggle favorite");
  return response.status;
};

export const fetchFavorites = async () => {
  const response = await fetch("/api/main?type=favorites");
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
};
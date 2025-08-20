import { MOVIES_API_URL } from "../data/data";

export async function fetchMovies() {
  const res = await fetch(MOVIES_API_URL);
  if (!res.ok) throw new Error("Error fetching movies");
  return res.json();
}

export async function addMovie(movie: {
  title: string;
  description: string;
  ageLimit: number;
}) {
  const res = await fetch(MOVIES_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Error while adding movie");
  return res.json();
}

export async function editMovie(
  id: number | string,
  movie: { title: string; description: string; ageLimit: number }
) {
  const res = await fetch(`${MOVIES_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Error while editing movie");
  return res;
}

export async function deleteMovie(id: number) {
  const res = await fetch(`${MOVIES_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting movie");
  return res;
}

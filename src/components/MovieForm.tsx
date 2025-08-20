"use client";
import { useState } from "react";
import { addMovie, editMovie } from "../utils/api";
import type { Movie } from "../types";

type MovieFormProps = {
  onSuccess?: () => void;
  movie?: Movie | null;
};

export default function MovieForm({ onSuccess, movie }: MovieFormProps) {
  const [form, setForm] = useState<Movie>(
    movie
      ? {
          title: movie.title,
          description: movie.description,
          ageLimit: movie.ageLimit,
          _id: movie._id,
        }
      : { title: "", description: "", ageLimit: 12 }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles adding or editing a movie.
   * If the movie has no id (not in the database), it calls a POST request (addMovie).
   * If the movie has an id (already in the database), it calls a PUT request (editMovie).
   * In API terminology: POST = insert, PUT = update.
   * @param e React form event
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (movie && movie._id) {
        await editMovie(movie._id, {
          title: form.title,
          description: form.description,
          ageLimit: form.ageLimit,
        });
      } else {
        await addMovie({
          title: form.title,
          description: form.description,
          ageLimit: form.ageLimit,
        });
        setForm({ title: "", description: "", ageLimit: 12 });
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "ageLimit" ? Number(value) : value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded shadow p-6 flex flex-col gap-4 mt-8"
    >
      <h2 className="text-xl font-bold mb-2">
        {movie ? "Edit movie" : "Add new movie"}
      </h2>
      <label className="font-medium">
        Title
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full text-black"
        />
      </label>
      <label className="font-medium">
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 p-2 border rounded w-full text-black"
        />
      </label>
      <label className="font-medium">
        Age limit
        <input
          type="number"
          name="ageLimit"
          value={form.ageLimit}
          onChange={handleChange}
          min={0}
          max={21}
          required
          className="mt-1 p-2 border rounded w-full text-black"
        />
      </label>
      <button
        type="submit"
        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? movie
            ? "Saving..."
            : "Saving..."
          : movie
          ? "Save changes"
          : "Add"}
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}

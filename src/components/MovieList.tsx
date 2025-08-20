"use client";
import { useState } from "react";
import { AGE_LIMITS } from "../data/data";
import ListRow from "./ListRow";
import type { Movie } from "../types";

type MovieListProps = {
  movies: Movie[];
  loading: boolean;
  onDelete: (id: number) => void;
  deletingId: number | null;
  onEdit: (movie: Movie) => void;
};

export default function MovieList({
  movies,
  loading,
  onDelete,
  deletingId,
  onEdit,
}: MovieListProps) {
  const [selectedAge, setSelectedAge] = useState<number | "">("");

  const filteredMovies =
    selectedAge === ""
      ? movies
      : movies.filter((m) => m.ageLimit <= Number(selectedAge));

  if (loading) return <div className="text-center py-8">Loading movies...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor="ageLimit" className="font-medium">
          Age limit filter:
        </label>
        <select
          id="ageLimit"
          className="border rounded px-2 py-1 text-black"
          value={selectedAge}
          onChange={(e) =>
            setSelectedAge(e.target.value === "" ? "" : Number(e.target.value))
          }
        >
          <option value="">All</option>
          {AGE_LIMITS.map((age) => (
            <option key={age} value={age}>
              {age}+
            </option>
          ))}
        </select>
      </div>
      {filteredMovies.length === 0 ? (
        <div className="text-center text-gray-500">There is no movie.</div>
      ) : (
        filteredMovies
          .filter((movie) => movie._id !== undefined)
          .map((movie) => (
            <ListRow
              key={movie._id}
              movie={movie}
              onEdit={onEdit}
              onDelete={onDelete}
              deletingId={deletingId}
            />
          ))
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { AGE_LIMITS } from "../data/data";
import ListRow from "./ListRow";
import type { Movie } from "../types";
import DropDown from "./DropDown";

type MovieListProps = {
  movies: Movie[];
  loading: boolean;
  onDelete: (id: string) => void;
  deletingId: string | null;
  onEdit: (movie: Movie) => void;
  onAdd: () => void;
};

export default function MovieList({
  movies,
  loading,
  onDelete,
  deletingId,
  onEdit,
  onAdd,
}: MovieListProps) {
  const [selectedAge, setSelectedAge] = useState<number | "">("");

  const filteredMovies =
    selectedAge === ""
      ? movies
      : movies.filter((m) => m.ageLimit <= Number(selectedAge));

  if (loading) return <div className="text-center py-8">Loading movies...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <DropDown
            options={AGE_LIMITS}
            value={selectedAge}
            onChange={setSelectedAge}
            label="Age limit:"
            display={(option) => (option === "" ? "All" : `${option}+`)}
          />
        </div>
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={onAdd}
          type="button"
        >
          Add new movie
        </button>
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

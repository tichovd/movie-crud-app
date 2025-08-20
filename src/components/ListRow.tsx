import React from "react";

type ListRowProps = {
  movie: {
    _id: number;
    title: string;
    description: string;
    ageLimit: number;
  };
  onEdit: (movie: {
    _id: number;
    title: string;
    description: string;
    ageLimit: number;
  }) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
};

const ListRow: React.FC<ListRowProps> = ({
  movie,
  onEdit,
  onDelete,
  deletingId,
}) => (
  <div className="bg-white rounded shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p className="mb-2 text-gray-700">{movie.description}</p>
      <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
        Age limit: {movie.ageLimit}+
      </span>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(movie)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
      >
        Modify
      </button>
      <button
        onClick={() => onDelete(movie._id)}
        disabled={deletingId === movie._id}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
      >
        {deletingId === movie._id ? "Deleting..." : "Delete"}
      </button>
    </div>
  </div>
);

export default ListRow;

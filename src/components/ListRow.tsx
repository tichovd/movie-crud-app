import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

type ListRowProps = {
  movie: {
    _id: string;
    title: string;
    description: string;
    ageLimit: number;
  };
  onEdit: (movie: {
    _id: string;
    title: string;
    description: string;
    ageLimit: number;
  }) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
};

const ListRow: React.FC<ListRowProps> = ({
  movie,
  onEdit,
  onDelete,
  deletingId,
}) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className="bg-white rounded shadow p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2
          className="text-xl font-bold flex-1 min-w-0 truncate cursor-pointer hover:underline"
          onClick={() => setOpenDetails((prev) => !prev)}
        >
          {movie.title}
        </h2>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(movie)}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Modify
          </button>
          <button
            onClick={() => onDelete(movie._id)}
            disabled={deletingId === movie._id}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {deletingId === movie._id ? "Deleting..." : "Delete"}
          </button>
          <EllipsisVerticalIcon
            className="h-6 w-6 text-gray-600"
            onClick={() => setOpenDetails(!openDetails)}
          />
        </div>
      </div>

      {openDetails && (
        <div className="space-y-2">
          <p className="text-gray-700">{movie.description}</p>
          <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
            Age limit: {movie.ageLimit}+
          </span>
        </div>
      )}
    </div>
  );
};

export default ListRow;

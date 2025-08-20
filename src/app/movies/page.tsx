"use client";
import MovieForm from "../../components/MovieForm";
import MovieList from "../../components/MovieList";
import type { Movie } from "../../types";
import ConfirmModal from "../../components/ConfirmModal";
import { useState, useEffect } from "react";
import { fetchMovies, deleteMovie } from "../../utils/api";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the list of movies from the API.
   * Sets movies, loading, and error state.
   */
  async function fetchMoviesHandler() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies();
      setMovies(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  function handleSuccess() {
    setShowModal(false);
    setEditMovie(null);
    fetchMoviesHandler();
  }

  function handleEdit(movie: Movie) {
    setEditMovie(movie);
    setShowModal(true);
  }

  function handleDelete(id: number) {
    setConfirmDeleteId(id);
  }

  /**
   * Deletes the selected movie by its id.
   * Calls deleteMovie API, refreshes the movie list, and manages UI feedback.
   */
  async function confirmDelete() {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    setError(null);
    try {
      await deleteMovie(confirmDeleteId);
      await fetchMoviesHandler();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-6">
      <div className="w-full flex flex-col items-center mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Movies</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Add new movie
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-md">
            <button
              onClick={() => {
                setShowModal(false);
                setEditMovie(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
            <MovieForm onSuccess={handleSuccess} movie={editMovie} />
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!confirmDeleteId}
        loading={deletingId === confirmDeleteId}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />

      <MovieList
        movies={movies}
        loading={loading}
        onDelete={handleDelete}
        deletingId={deletingId}
        onEdit={handleEdit}
      />
    </main>
  );
}

import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Are you sure you want to delete this movie?",
  confirmText = "Yes, delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-sm flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            disabled={loading}
          >
            {loading ? "Törlés..." : confirmText}
          </button>
          <button
            onClick={onCancel}
            className="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            disabled={loading}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

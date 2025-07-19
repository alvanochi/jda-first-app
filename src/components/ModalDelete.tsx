type ModalDeleteProps = {
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
  children?: React.ReactNode
}

export default function ModalDelete({ onClose, onConfirm, loading = false, children }: ModalDeleteProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white border-8 border-red-600 p-12 shadow-[12px_12px_0px_0px_rgba(255,0,0,1)] flex flex-col items-center max-w-md w-full transform -rotate-2">
        <h2 className="text-4xl font-black text-red-600 mb-6 tracking-tighter text-center">
          Confirm Delete
        </h2>
        <div className="text-lg font-bold text-black mb-8 text-center">
          {children || (
            <>
              Are you sure you want to delete this item?<br />
              This action cannot be undone.
            </>
          )}
        </div>
        <div className="flex gap-6">
          <button
            className="bg-red-600 text-white px-8 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] text-xl hover:bg-black hover:text-red-600 transition-all"
            onClick={onConfirm}
            disabled={loading}
          >
            DELETE
          </button>
          <button
            className="bg-black text-yellow-300 px-8 py-3 font-black border-2 border-yellow-300 shadow-[4px_4px_0px_0px_rgba(255,255,0,1)] text-xl hover:bg-yellow-300 hover:text-black transition-all"
            onClick={onClose}
            disabled={loading}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

import { IArt } from '@/types/IArt'

type ArtListProps = {
    art: IArt
    handleEdit: (value: IArt) => void
    handleDelete: (value: number) => void
}

export default function ArtList({art, handleEdit, handleDelete}: ArtListProps) {
  return (
        <li key={art.art_id} className="bg-white text-black border-4 border-yellow-300 p-4 shadow-[6px_6px_0px_0px_rgba(255,255,0,1)] flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <span className="font-black text-xl">{art.name}</span>
                <span className="font-bold">Rp {Number(art.price).toLocaleString("id-ID")}</span>
            </div>
            <div className="text-xs mb-2 truncate">{art.description}</div>
            <div className="flex gap-4">
                <button
                    className="bg-yellow-300 text-black px-4 py-1 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-yellow-300 transition-all"
                    onClick={() => handleEdit(art)}
                >
                    EDIT
                </button>
                <button
                    className="bg-red-600 text-white px-4 py-1 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,0,0,1)] hover:bg-black hover:text-red-600 transition-all"
                    onClick={() => handleDelete(art.art_id)}
                >
                    DELETE
                </button>
            </div>
        </li>
    )
}

export const ArtListLoading = () => {
    return (
          <div className="bg-gray-200 my-4 animate-pulse border-4 border-yellow-300 p-4 shadow-[6px_6px_0px_0px_rgba(255,255,0,1)] flex flex-col gap-2">
              <div className="flex justify-between items-center">
                  <span className="w-32 h-4 bg-black"></span>
                  <span className="w-10 h-2 bg-black"></span>
              </div>
              <div className="w-full h-4 mt-4 bg-gray-500"></div>
              <div className="w-full h-4 bg-gray-500"></div>
              <div className="w-1/2 h-4 bg-gray-500"></div>
          </div>
      )
    
}
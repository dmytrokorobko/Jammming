import { IoArrowBack } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

export const UserPlaylistTop = ({selectedPlaylist, handleBackClick, handleDeleteClick}) => {
   return (
      <div className={selectedPlaylist && "playlist-top"}>
         {selectedPlaylist && <button onClick={handleBackClick}><IoArrowBack /></button>}
         <h2>{selectedPlaylist ? selectedPlaylist.name : 'My Playlists'}</h2>
         {selectedPlaylist && <button onClick={() => handleDeleteClick(selectedPlaylist)}><IoTrashOutline /></button>}
      </div>
   )
}
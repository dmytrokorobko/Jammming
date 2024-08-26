export const UserPlaylistTop = ({selectedPlaylist, handleBackClick, handleDeleteClick}) => {
   return (
      <div className={selectedPlaylist && "playlist-top"}>
         {selectedPlaylist && <button onClick={handleBackClick}>Back</button>}
         <h2>{selectedPlaylist ? selectedPlaylist.name : 'My Playlists'}</h2>
         {selectedPlaylist && <button onClick={() => handleDeleteClick(selectedPlaylist)}>Delete</button>}
      </div>
   )
}
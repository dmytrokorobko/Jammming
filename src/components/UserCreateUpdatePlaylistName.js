export const UserCreateUpdatePlaylistName = ({newPlaylistText, setNewPlaylistText, handlePlaylistName, selectedPlaylist}) => {
   return (
      <div className="filter-text">
         <label htmlFor="createPlaylistText">Name:</label>
         <input type="text" id="createPlaylistText" value={newPlaylistText} onChange={(e) => setNewPlaylistText(e.target.value)} />   
         <button className="create-new-playlist-button" onClick={handlePlaylistName}>{selectedPlaylist ? 'Update' : 'Create'}</button>                  
      </div>
   )
}
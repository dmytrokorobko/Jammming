import { PlaylistItem } from "./PlaylistItem"

export const UserPlaylistsList = ({userPlaylists, handlePlaylistItemClick}) => {
   return (
      <div className="list-user-playlists">
         {userPlaylists ? (
            <ul>
               {userPlaylists.map(playlist => <li className="li-playlist-item" key={playlist.id} onClick={() => handlePlaylistItemClick(playlist)}><PlaylistItem playlist={playlist} /></li>)}
            </ul>
         ) : <p>No playlists to show</p>}
      </div>
   )
}
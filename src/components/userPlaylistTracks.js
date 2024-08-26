import { TrackItem } from "./TrackItem"

export const UserPlaylistTracks = ({playlistTracks, serverLoading, removeTrackFromUserList}) => {
   return (
      <div className="list-tracks">
         {playlistTracks ? (
            <ul>
               {playlistTracks.map(track => <li className="li-track-item" key={track.id}><TrackItem track={track} onButtonClick={() => removeTrackFromUserList(track)} /></li>)}
            </ul>
         ) : (
            serverLoading ? (
               <div className="list-usertracks-loading">
                  <div className={serverLoading ? 'cd-disk show' : 'cd-disk'}></div>
               </div>
            ) : (
               <p>No tracks to show</p>
            )
         ) }
      </div>
   )
}
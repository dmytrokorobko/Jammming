import { TrackItem } from "./TrackItem"

export const ServerTracks = ({filterText, tracks, addTrackToUserList}) => {
   return (
      <div className="list-tracks">
         {!filterText || filterText.length === 0 ? <h3>Recommended tracks</h3> : ''}
         {tracks ? (
            <ul>
               {tracks.map(track => <li className="li-track-item" key={track.id}><TrackItem track={track} isServerList={true} onButtonClick={() => addTrackToUserList(track)} /></li>)}
            </ul>
         ) : <p>No tracks to show</p>}
      </div>
   )
}
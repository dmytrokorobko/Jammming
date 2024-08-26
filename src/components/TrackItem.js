export const TrackItem = ({track, isServerList, onButtonClick}) => {
   return (
      <div className="track-item">
         <div>
            <div>
               <p className="track-name">{track.name}</p>
            </div>
            <div className="track-info">
               <p className="track-artist">Artists: {track.artist}</p>
               <p className="track-artist">Album: {track.album}</p>
            </div>
         </div>
         <div className="track-item-controls">
            <button className="track-item-add" onClick={onButtonClick}>{isServerList ? '+' : '-'}</button>
         </div>
      </div>
   )
}
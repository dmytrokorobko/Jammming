export const PlaylistItem = ({playlist}) => {
   return (
      <div className="playlist-item">
         <p className="playlist-name">{playlist.name}</p>
      </div>
   )
}
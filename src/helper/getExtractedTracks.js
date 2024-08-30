export const getExtractedTracks = (tracks) => {
   return tracks.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      type: track.type
   }));
}
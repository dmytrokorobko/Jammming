import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsernameThunk } from "../../store/slices/thunks/auth/getUsernameThunk";
import { Link, useNavigate } from "react-router-dom";
import { DiskSpinner } from "../../components/DiskSpinner";
import { getRecommendationThunk } from "../../store/slices/thunks/tracks/getRecommendationThunk";
import { TrackItem } from "../../components/TrackItem";
import { getFilterThunk } from "../../store/slices/thunks/tracks/getFilterThunk";
import { getUserPlaylistsThunk } from "../../store/slices/thunks/tracks/getUserPlaylistsThunk";
import { PlaylistItem } from "../../components/PlaylistItem";
import { clearSelectedPlaylist, createPlaylistName, selectPlaylist, updatePlaylistName } from "../../store/slices/TracksSlice";
import { getPlaylistTracksThunk } from "../../store/slices/thunks/tracks/getPlaylistTracksThunk";
import { generateUniqueId } from "../../helper/generateUniqueId";

export const Dashboard = () => {
   const user = useSelector(state => state.auth.user);
   const tracks = useSelector(state => state.tracks.spotifyTracks);
   const userPlaylists = useSelector(state => state.tracks.userPlaylists);
   const selectedPlaylist = useSelector(state => state.tracks.selectedPlaylist);
   const playlistTracks = useSelector(state => state.tracks.playlistTracks);
   const serverLoading = useSelector(state => state.tracks.loading);
   const serverError = useSelector(state => state.tracks.error);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [filterText, setFilterText] = useState('');
   const [loading, setLoading] = useState(false);
   const [firstLoad, setFirstLoad] = useState(true);
   const [newPlaylistText, setNewPlaylistText] = useState('');

   useEffect(() => {
      setLoading(true);
      const handleFirstLoad = async() => {
         await dispatch(getUsernameThunk({navigate}));
         //await dispatch(getRecommendationThunk({navigate}));
         await dispatch(getUserPlaylistsThunk(navigate));
         setLoading(false);
      }
      handleFirstLoad();
   },[dispatch, navigate]);

   useEffect(() => {
      if (firstLoad) {
         setFirstLoad(false);         
         return;
      }

      setLoading(true);
      const pause = setTimeout(() => {
         const handleFilterText = async() => {
            if (filterText.length === 0) {
               //await dispatch(getRecommendationThunk({navigate}));
            } else {
               await dispatch(getFilterThunk({filterText, navigate}));
            }
            setLoading(false);
         }
         handleFilterText();
      }, 1000);

      return () => {
         clearTimeout(pause);         
      }
   }, [filterText]);

   const handlePlaylistClick = async(playlist) => {
      console.log(playlist);
      await dispatch(selectPlaylist(playlist));      
      setNewPlaylistText(playlist.name);
      await dispatch(getPlaylistTracksThunk({playlistId: playlist.id, navigate}));
   }

   const handleBackClick = () => {
      dispatch(clearSelectedPlaylist());
      setNewPlaylistText('');
   }

   const handlePlaylistName = () => {
      if (!newPlaylistText || newPlaylistText.length === 0) return;

      if (selectedPlaylist && selectedPlaylist.id.length > 0) {
         //update name
         const newPlaylist = {
            id: selectedPlaylist.id,
            name: newPlaylistText
         }
         dispatch(updatePlaylistName(newPlaylist));
      } else {
         //create name
         const newPlaylist = {
            id: 'local' + generateUniqueId(),
            name: newPlaylistText
         }
         dispatch(createPlaylistName(newPlaylist));
      }
      
   }

   return (
      <>
         <header>
            <div className="server-notifications">
               {serverLoading && <div className="server-loading">Loading...</div>}
               {serverError && <div className="server-error">Error: {serverError}</div>}
            </div>
            <div className="username">
               <p><Link to='/logout'>Logout</Link></p>
               <h2>Hello, {user.name ? (<Link to={user.urlSpotify} target="_blank">{user.name}<img src={user.avatar} alt="avatar"/></Link>) : 'guest'}</h2>
            </div>
         </header>
         <section>             
            <div className="lists">
               <div className="list spotify-list">
                  <div className="filter-text">
                     <label htmlFor="filterText">Filter:</label>
                     <input type="text" id="filterText" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                     <DiskSpinner loading={loading} />
                  </div>
                  <div className="list-tracks">
                     {!filterText || filterText.length === 0 ? <h3>Recommended tracks</h3> : ''}
                     {tracks ? (
                        <ul>
                           {tracks.map(track => <li className="li-track-item" key={track.id}><TrackItem track={track} /></li>)}
                        </ul>
                     ) : <p>No tracks to show</p>}
                  </div>
               </div>
               <div className="list user-list">
                  <div className={selectedPlaylist && "playlist-top"}>
                     {selectedPlaylist && <button onClick={handleBackClick}>Back</button>}
                     <h2>{selectedPlaylist ? selectedPlaylist.name : 'My Playlists'}</h2>
                     {selectedPlaylist && <button>Delete</button>}
                  </div>
                  <div className="filter-text">
                     <label htmlFor="createPlaylistText">Name:</label>
                     <input type="text" id="createPlaylistText" value={newPlaylistText} onChange={(e) => setNewPlaylistText(e.target.value)} />   
                     <button className="create-new-playlist-button" onClick={handlePlaylistName}>{selectedPlaylist ? 'Update' : 'Create'}</button>                  
                  </div>
                  {(!selectedPlaylist) ? (
                     <div className="list-user-playlists">
                        {userPlaylists ? (
                           <ul>
                              {userPlaylists.map(playlist => <li className="li-playlist-item" key={playlist.id} onClick={() => handlePlaylistClick(playlist)}><PlaylistItem playlist={playlist} /></li>)}
                           </ul>
                        ) : <p>No playlists to show</p>}
                     </div>
                  ) : (
                     <div className="list-tracks">
                        {playlistTracks ? (
                           <ul>
                              {playlistTracks.map(track => <li className="li-track-item" key={track.id}><TrackItem track={track} /></li>)}
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
                  )}                  
               </div>
            </div>            
         </section>
         <footer>
            <p>&copy; 2024. Dmytro Korobko</p>
         </footer>
      </>
   )
}
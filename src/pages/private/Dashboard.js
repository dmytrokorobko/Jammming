import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsernameThunk } from "../../store/slices/thunks/auth/getUsernameThunk";
import { Link, useNavigate } from "react-router-dom";
import { DiskSpinner } from "../../components/DiskSpinner";
import { getRecommendationThunk } from "../../store/slices/thunks/tracks/getRecommendationThunk";
import { TrackItem } from "../../components/TrackItem";
import { getFilterThunk } from "../../store/slices/thunks/tracks/getFilterThunk";
import { getUserPlaylistsThunk } from "../../store/slices/thunks/tracks/getUserPlaylistsThunk";

export const Dashboard = () => {
   const user = useSelector(state => state.auth.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [filterText, setFilterText] = useState('');
   const [loading, setLoading] = useState(false);
   const [firstLoad, setFirstLoad] = useState(true);
   const tracks = useSelector(state => state.tracks.spotifyTracks);
   const userPlaylists = useSelector(state => state.tracks.userPlaylists);
   const [newPlaylistText, setNewPlaylistText] = useState('');

   useEffect(() => {
      setLoading(true);
      const handleFirstLoad = async() => {
         await dispatch(getUsernameThunk({navigate}));
         await dispatch(getRecommendationThunk({navigate}));
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
            await dispatch(getFilterThunk({filterText, navigate}));
            setLoading(false);
         }
         handleFilterText();
      }, 1000);

      return () => {
         clearTimeout(pause);         
      }
   }, [filterText]);

   return (
      <>
         <header>
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
                     {!filterText && <h3>Recommended tracks</h3>}
                     {tracks ? (
                        <ul>
                           {tracks.map(track => <li className="li-track-item" key={track.id}><TrackItem track={track} /></li>)}
                        </ul>
                     ) : <p>No tracks to show</p>}
                  </div>
               </div>
               <div className="list user-list">
                  <div className="filter-text">
                     <label htmlFor="createPlaylistText">Name:</label>
                     <input type="text" id="createPlaylistText" value={newPlaylistText} onChange={(e) => setNewPlaylistText(e.target.value)} />   
                     <button className="create-new-playlist-button">Create</button>                  
                  </div>
                  <div className="list-user-playlists">
                     {userPlaylists ? (
                        <ul>
                           {userPlaylists.map(playlist => <li className="li-playlist-item" key={playlist.id}>{playlist.name}</li>)}
                        </ul>
                     ) : <p>No playlists to show</p>}
                  </div>
               </div>
            </div>            
         </section>
         <footer>
            <p>&copy; 2024. Dmytro Korobko</p>
         </footer>
      </>
   )
}
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsernameThunk } from "../../store/slices/thunks/auth/getUsernameThunk";
import { useNavigate } from "react-router-dom";
import { getRecommendationThunk } from "../../store/slices/thunks/tracks/getRecommendationThunk";
import { getFilterThunk } from "../../store/slices/thunks/tracks/getFilterThunk";
import { getUserPlaylistsThunk } from "../../store/slices/thunks/tracks/getUserPlaylistsThunk";
import { addTrackToSelectedPlaylist, clearSelectedPlaylist, clearServerError, createPlaylistName, removePlaylistName, removeSpotifyTrackFromPlaylist, removeTrackFromSelectedPlaylist, selectPlaylist, updatePlaylistName } from "../../store/slices/TracksSlice";
import { getPlaylistTracksThunk } from "../../store/slices/thunks/tracks/getPlaylistTracksThunk";
import { generateUniqueId } from "../../helper/generateUniqueId";
import { ServerNotifications } from "../../components/ServerNotifications";
import { UserAccountCorner } from "../../components/UserAccountCorner";
import { Filter } from "../../components/Filter";
import { ServerTracks } from "../../components/ServerTracks";
import { UserPlaylistTop } from "../../components/UserPlaylistTop";
import { UserCreateUpdatePlaylistName } from "../../components/UserCreateUpdatePlaylistName";
import { UserPlaylistsList } from "../../components/UserPlaylistsList";
import { UserPlaylistTracks } from "../../components/userPlaylistTracks";
import { refreshAccessTokenThunk } from "../../store/slices/thunks/auth/refreshAccessTokenThunk";
import { addTrackToUserListThunk } from "../../store/slices/thunks/tracks/addTrackToUserListThunk";
import { createPlaylistThunk } from "../../store/slices/thunks/tracks/createPlaylistThunk";
import { deletePlaylistThunk } from "../../store/slices/thunks/tracks/deletePlaylistThunk";
import { removeTrackFromUserListThunk } from "../../store/slices/thunks/tracks/removeTrackFromUserListThunk";

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
   const [clientError, setClientError] = useState('');
   const [firstLoad, setFirstLoad] = useState(true);
   const [newPlaylistText, setNewPlaylistText] = useState('');

   //update accessToken with resfreshToken
   useEffect(() => {
      const interval = setInterval(() => {
         const expiresIn = localStorage.getItem('expiresIn');
         if (Date.now() > expiresIn) {
            const refreshToken = sessionStorage.getItem('refreshToken');
            if (!refreshToken) return navigate('/login');
            try {
               dispatch(refreshAccessTokenThunk({refreshToken}));
            } catch(err) {
               return navigate('/login');
            }            
         }
      }, 5 * 60 * 1000);

      return (() => {
         clearInterval(interval);
      });
   }, []);

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

   useEffect(() => {
      const clientErrorTimer = setTimeout(() => {
         setClientError('');
         dispatch(clearServerError());
      }, 5000);

      return () => {
         clearTimeout(clientErrorTimer);
      }
   }, [clientError, serverError])

   const handlePlaylistItemClick = async(playlist) => {
      await dispatch(selectPlaylist(playlist));      
      setNewPlaylistText(playlist.name);
      await dispatch(getPlaylistTracksThunk({playlistId: playlist.id, navigate}));
   }

   const handleBackClick = () => {
      dispatch(clearSelectedPlaylist());
      setNewPlaylistText('');
   }

   const handlePlaylistName = async () => {
      if (!newPlaylistText || newPlaylistText.length === 0) {
         setClientError('Enter playlist name');
         return;
      } 

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
         try {
            await dispatch(createPlaylistThunk({playlist: newPlaylist})).unwrap();
            setNewPlaylistText('');
         } catch(err) {
            dispatch(removePlaylistName(newPlaylist));
         }         
      }
   }

   const handleDeletePlaylistName = async(playlist) => {
      if (window.confirm('Are you sure to delete this playlist with all tracks inside?')) {
         try {
            await dispatch(deletePlaylistThunk({playlist, navigate})).unwrap();
            dispatch(removePlaylistName(playlist));
            handleBackClick();
         } catch(err) {

         }
      }
   }

   const addTrackToUserList = async (track) => {
      if (selectedPlaylist) {         
         if (!playlistTracks.some(t => t.id === track.id)) {
            try {
               await dispatch(addTrackToUserListThunk({playlist: selectedPlaylist, track, navigate})).unwrap();
               dispatch(addTrackToSelectedPlaylist(track));
            } catch(err) {
               //dispatch(removeTrackFromSelectedPlaylist(track));
            }            
         } else {
            setClientError('Selected track is already in playlist');
            dispatch(removeSpotifyTrackFromPlaylist(track));
         } 
      } else setClientError('First select playlist to add tracks');
   }

   const removeTrackFromUserList = async(track) => {
      if (selectedPlaylist) {
         try {
            await dispatch(removeTrackFromUserListThunk({playlist: selectedPlaylist, track, navigate})).unwrap();
            dispatch(removeTrackFromSelectedPlaylist(track));
         } catch (err) {

         }
      }
   }

   return (
      <>
         <header>
            <ServerNotifications serverLoading={serverLoading} serverError={serverError} clientError={clientError} />
            <UserAccountCorner user={user} />
         </header>
         <section>             
            <div className="lists">
               <div className="list spotify-list">
                  <Filter filterText={filterText} setFilterText={setFilterText} loading={loading} />
                  <ServerTracks filterText={filterText} tracks={tracks} addTrackToUserList={addTrackToUserList} />
               </div>
               <div className="list user-list">
                  <UserPlaylistTop selectedPlaylist={selectedPlaylist} handleBackClick={handleBackClick} handleDeleteClick={handleDeletePlaylistName} />
                  <UserCreateUpdatePlaylistName newPlaylistText={newPlaylistText} setNewPlaylistText={setNewPlaylistText} handlePlaylistName={handlePlaylistName} selectedPlaylist={selectedPlaylist} />
                  {(!selectedPlaylist) ? (
                     <UserPlaylistsList userPlaylists={userPlaylists} handlePlaylistItemClick={handlePlaylistItemClick} />
                  ) : (
                     <UserPlaylistTracks playlistTracks={playlistTracks} serverLoading={serverLoading} removeTrackFromUserList={removeTrackFromUserList} />
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
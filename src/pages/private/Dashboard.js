import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsernameThunk } from "../../store/slices/thunks/auth/getUsernameThunk";
import { useNavigate } from "react-router-dom";
import { getRecommendationThunk } from "../../store/slices/thunks/tracks/getRecommendationThunk";
import { getFilterThunk } from "../../store/slices/thunks/tracks/getFilterThunk";
import { getUserPlaylistsThunk } from "../../store/slices/thunks/tracks/getUserPlaylistsThunk";
import { addTrackToSelectedPlaylist, clearSelectedPlaylist, createPlaylistName, removePlaylistName, removeTrackFromSelectedPlaylist, selectPlaylist, updatePlaylistName } from "../../store/slices/TracksSlice";
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

   useEffect(() => {
      
   })

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
      }, 5000);

      return () => {
         clearTimeout(clientErrorTimer);
      }
   }, [clientError])

   const handlePlaylistItemClick = async(playlist) => {
      await dispatch(selectPlaylist(playlist));      
      setNewPlaylistText(playlist.name);
      await dispatch(getPlaylistTracksThunk({playlistId: playlist.id, navigate}));
   }

   const handleBackClick = () => {
      dispatch(clearSelectedPlaylist());
      setNewPlaylistText('');
   }

   const handlePlaylistName = () => {
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
         setNewPlaylistText('');
      }
   }

   const handleDeletePlaylistName = (playlist) => {
      console.log(playlist);
      if (window.confirm('Are you sure to delete this playlist with all tracks?')) {
         dispatch(removePlaylistName(playlist));
         handleBackClick();
      }
   }

   const addTrackToUserList = (track) => {
      if (selectedPlaylist) {
         dispatch(addTrackToSelectedPlaylist(track));
      } else setClientError('First choose playlist to add tracks');
   }

   const removeTrackFromUserList = (track) => {
      if (selectPlaylist) {
         dispatch(removeTrackFromSelectedPlaylist(track));
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
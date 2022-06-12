import React, { useEffect } from 'react';
import { Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { useGetListQuery } from '../../services/TMDB';
import { userSelector } from '../../features/auth';
import RatedCards from '../../RatedCards/RatedCards';

const Profile = () => {
    const {user} = useSelector(userSelector);
    const isMobile = useMediaQuery('(max-width:600px)');
    const {data: favoriteMovies, refetch: refetchFavorites} = useGetListQuery({listName: "favorite/movies", accountId: user.id, sessionId: localStorage.getItem("session_id"), page: 1});
    const {data: watchlistMovies, refetch: refetchWatchlisted} = useGetListQuery({listName: "watchlist/movies", accountId: user.id, sessionId: localStorage.getItem("session_id"), page: 1});
    
    console.log(favoriteMovies)
    console.log(watchlistMovies)

    useEffect(() => {
      refetchFavorites();
      refetchWatchlisted();
    }, [])
    
  
    const logout = () => {
      localStorage.clear();
      window.location.href = '/';
    }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='h4' gutterBottom>
         {!isMobile ? `My Profile - ${user.username}` : "My Profile" }
        </Typography>
        <Button color='inherit' onClick={logout} >
          Logout &nbsp; <ExitToApp/>
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ?
       <Typography variant='h5'>
         Add favorites or watchlist some movies to see them here!
         
       </Typography>: (<Box>
           <RatedCards title="Favirote Movies" data={favoriteMovies}/>
           <RatedCards title="Watchlist" data={watchlistMovies}/>
         </Box>)}
    </Box>
  )
}

export default Profile
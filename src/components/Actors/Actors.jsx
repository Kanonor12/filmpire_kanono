import React, { useState } from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorsDetailsQuery, useGetMovieByActorIdQuery } from '../../services/TMDB';
import Pagination from "../Pagination/Pagination";

import MovieList from "../MovieList/MovieList"
import useStyles from "./styles";

const Actors = () => {
 const { id } = useParams();
 const history = useHistory();
 const [page, setPage] = useState(1);

 const classes = useStyles();
 

 const {data, isFetching, error} = useGetActorsDetailsQuery(id);
 const {data: actorMovies} =  useGetMovieByActorIdQuery({id, page})

 if(isFetching) {
   return (
     <Box display="flex" justifyContent="center">
       <CircularProgress size="8rem"/>
     </Box>
   )
 }
 if(error) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
     <Button startIcon={<ArrowBack/>} onClick={() => history.goBack()} color="primary">
      Go back
     </Button>
    </Box>
  )
}

  return (
  <>
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <img
        className={classes.image}
        src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
        alt={data?.name}
        />
      </Grid>
      <Grid item lg={7} xl={8} style={{display: "flex", justifyContent:"center", flexDirection: "column"}}>
        <Typography variant="h2" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant="body1" align="justify" paragraph gutterBottom>
          {data?.biography || "sorry, no biography yet ..."}
        </Typography>
        <Box marginTop="2rem" display="flex" justifyContent="space-around">
          <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
          <Button startIcon={<ArrowBack/>} color="primary" onClick={() => history.goBack()}>Back</Button>
        </Box>
      </Grid>
    </Grid>
    <Box container style={{marginTop: "20px"}}>
      <Typography variant="h2" align="center" gutterBottom>Movies</Typography>
      { actorMovies && <MovieList movies={actorMovies} numberOfMovies={12}/>}
      <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages}/>
    </Box>
  </>
  )
}

export default Actors
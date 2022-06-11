import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import {MovieInformation, Actors, Movies, NavBar, Profile}  from '../components'

import useStyles from './styles';
import useAlan from "./Alan";
import { useRef } from "react";


const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();

  return (

    <div className={classes.root}>
    <CssBaseline/>
    <NavBar/>
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
            <Route exact path='/movie/:id'>
             <MovieInformation/>
            </Route>
            <Route exact path='/actors/:id'>
             <Actors/>
            </Route>
            <Route exact path='/'>
              <Movies/>
            </Route>
            <Route exact path='/profile/:id'>
              <Profile/>
            </Route>
        </Switch>
    </main>
    <div ref={alanBtnContainer}/>
    </div>
  )
}

export default App
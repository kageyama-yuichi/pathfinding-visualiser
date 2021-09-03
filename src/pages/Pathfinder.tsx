import React, {useState} from 'react'
import {createTheme, ThemeProvider, Typography, Box, makeStyles, CssBaseline } from '@material-ui/core';

import Header from '../components/header/Header'
import Grid from '../components/grid/Grid'

import {Algorithm, CellType, GridCell } from '../helpers/Interfaces';

const theme = createTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    h3: {
      fontFamily: 'Consolas',
      color: '#FFF',
      paddingBottom: '20px',
    },
  }
});

const Pathfinder = (): JSX.Element => {

  const [type, setType] = useState(CellType.Start);
  const [world, setWorld] = useState({});
  const [algorithm, setAlgorithm] = useState(Algorithm.AStar)


  const handleType = (newType: CellType) => {
    setType(newType)
  }

  const handleAlgorithm = (newAlgo: Algorithm) => {
    setAlgorithm(newAlgo)
  }

  const handleWorld = (newWorld: {[key:string]: GridCell}) => {
    setWorld(newWorld);
  }

  const GridProps = {
    type: type,
    handleWorld: handleWorld,
    world: world
  }

  const HeaderProps = {
    type: type,
    handleType: handleType,
    algorithm: algorithm,
    handleAlgorithm: handleAlgorithm
  }

  const useStyles = makeStyles({
    root: {
      background: '#303030',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 48,
      padding: '15px 30px',
      marginBottom: '20px'
    },
  });
  
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
          <Typography variant="h3">Interactive Pathfinder</Typography>
      <div style={{ zIndex: 100 }}>
        
          <Header {...HeaderProps}></Header>
        
        <Grid {...GridProps}></Grid>
      </div>
      <div className="overlay"></div>
      <div className="overlay glitch"></div>
      </ThemeProvider>
    </div>
  );
}

export default Pathfinder;
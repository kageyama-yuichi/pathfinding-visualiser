import React, {useState, useEffect} from 'react'
import {createTheme, ThemeProvider, Typography,  makeStyles } from '@material-ui/core';

import Header from '../components/header/Header'
import Grid from '../components/grid/Grid'

import {Algorithm, CellType, GridCell, PathfindingStep } from '../helpers/Interfaces';
import { NUM_COLS, NUM_ROWS, STEP_SIZE } from '../helpers/Constants';
import pathfind from '../helpers/PathfindingFunctions';
import { getNextWorld, resetWorld } from '../helpers/WorldFunctions';

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
  const [algorithm, setAlgorithm] = useState(Algorithm.BFS)

  // Initializes world on mount
  // Scuffed map storing x,y as a string since storing array[x,y] can only be gotten by reference
  // Has better performance than using a 2d array due to faster deep copy.
  useEffect(() => {
    
    let map: { [key: string]: GridCell } = {}
    for (let x = 0; x < NUM_COLS; x++){
      for (let y = 0; y < NUM_ROWS; y++){
        map[`${x},${y}`] =  {type: CellType.Empty, x: x, y: y}
      }
    }

    // Set random start and end positions.
    let x1 = Math.floor(Math.random() * NUM_COLS);
    let y1 = Math.floor(Math.random() * NUM_ROWS);
    let x2 = Math.floor(Math.random() * NUM_COLS);
    let y2 = Math.floor(Math.random() * NUM_ROWS);

    map[`${x1},${y1}`].type = CellType.Start;
    map[`${x2},${y2}`].type = CellType.Goal;
    

    handleWorld(map)

  }, [])

  const handlePathfind = () => {
    const newWorld = resetWorld(world)
    setWorld(newWorld)
    const steps = pathfind(newWorld, algorithm);
    // Remove start position
    steps.shift()
    
    setNextWorld(steps, newWorld)
    
  }

  const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const setNextWorld = async (steps: Array<PathfindingStep>, w: any) => {
    if (steps.length > 0) {
      await timeout(50);
      let nextWorld = getNextWorld(w, steps.splice(0, STEP_SIZE))
      setWorld(nextWorld)
      setNextWorld(steps, nextWorld)
      
    }
    return;
  }


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
    handleAlgorithm: handleAlgorithm,
    handlePathfind: handlePathfind
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
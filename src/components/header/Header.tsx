import React from 'react'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { Grid, Container, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Algorithm, CellType } from '../../helpers/Interfaces';

interface HeaderProps {
  type: CellType;
  handleType: (type: CellType) => void;
  algorithm: Algorithm;
  handleAlgorithm: (algorithm: Algorithm) => void;
  handlePathfind: () => void;
}

const Header = ({ handleType, type, algorithm, handleAlgorithm, handlePathfind }: React.PropsWithChildren<HeaderProps>) => {
  
  const handleTypeChange = (event: any, newType: CellType) => {
    handleType(newType)
  }

  const handleAlgoChange = (event: React.ChangeEvent<{value: unknown }>) => {
    handleAlgorithm(event.target.value as Algorithm)
  }

  return (
    <Container maxWidth="lg">
    <Grid container spacing={3} alignItems="flex-end" >
      <Grid xs={4} item>
        <ToggleButtonGroup size="small" value={type} exclusive onChange={handleTypeChange}>
            <ToggleButton value={CellType.Start}>Start</ToggleButton>
            <ToggleButton value={CellType.Checkpoint}>Checkpoint</ToggleButton>
          <ToggleButton value={CellType.Goal}>Goal</ToggleButton>
          <ToggleButton value={CellType.Wall}>Wall</ToggleButton>
          <ToggleButton value={CellType.Empty}>Erase</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid xs={4} item>
        <FormControl style={{minWidth: '120px'}}>
          <InputLabel>Algorithm</InputLabel>
          <Select
            
            value={algorithm}
            onChange={handleAlgoChange}
            label="Algorithm"
          >
            <MenuItem value={Algorithm.AStar}>AStar</MenuItem>
            <MenuItem value={Algorithm.Dijkstra}>Dijkstra</MenuItem>
            <MenuItem value={Algorithm.BFS}>BFS</MenuItem>
            <MenuItem value={Algorithm.DFS}>DFS</MenuItem>
            <MenuItem value={Algorithm.Random}>Random</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      

      <Grid xs={4} item>
          <Button onClick={handlePathfind} variant="contained" color="primary">
        PATHFIND
        </Button>
      </Grid>
      
      </Grid>
      </Container>
  )
}
export default Header;
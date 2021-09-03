import { CELL_SIZE, NUM_COLS, NUM_ROWS } from "./Constants";
import { GridCell, CellType, PathfindingStep } from "./Interfaces";

const cloneDeep = require('lodash/cloneDeep')


export const getNearestCell = (coords: Array<number>): Array<number> => {
  let [x, y] = [...coords];

  x = Math.floor(x / CELL_SIZE)
  y = Math.floor(y / CELL_SIZE)
  return [x, y]
}

const getTypeOfCell = (grid: {[key: string]: GridCell}, type: CellType): string => {
  for (const key in grid) {
    if (grid[key].type === type) {
      return key;
    }
  }
  return "";
}

export const getGoalCell = (grid: {[key: string]: GridCell}): string => {
  return getTypeOfCell(grid, CellType.Goal)
}
export const getStartCell = (grid: {[key: string]: GridCell}): string => {
  return getTypeOfCell(grid, CellType.Start)
}

export const resetWorld = (world: { [key: string]: GridCell }): { [key: string]: GridCell } => {
  let clonedWorld = cloneDeep(world)
  for (let k in clonedWorld) {
    if (clonedWorld[k].type === CellType.Visited) {
      clonedWorld[k].type = CellType.Empty
    }
  }
  return clonedWorld
}

export const getNextWorld = (world: { [key: string]: GridCell }, steps: Array<PathfindingStep>):  { [key: string]: GridCell }=> {
  let clonedWorld = cloneDeep(world)
  for (let i = 0; i < steps.length; i++){
    
    const step = steps[i]
    if (clonedWorld[step.key].type === CellType.Empty) {
      clonedWorld[step.key].type = step.newType;
    }
  }
  return clonedWorld
}

export const getAdjacent = (world: { [key: string]: GridCell }, key: string): Array<string> => {
  const {x,y} = parseKey(key);
  const adjacent = [];

  if (x > 0) {
    adjacent.push(`${x-1},${y}`)
  }
  if (y > 0) {
    adjacent.push(`${x},${y-1}`)
  }
  if (x < NUM_COLS - 1) {
    adjacent.push(`${x+1},${y}`)
  }
  if (y < NUM_ROWS - 1) {
    adjacent.push(`${x},${y+1}`)
  }
  return adjacent
}

export const parseKey = (key: string): { x: number, y: number } => {
  const [x, y] = key.split(",").map(Number);
  return {x,y}
}

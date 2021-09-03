import { CELL_SIZE } from "./Constants";
import { GridCell, CellType } from "./Interfaces";

export const getNearestCell = (coords: Array<number>): Array<number> => {
  let [x, y] = [...coords];

  x = Math.floor(x / CELL_SIZE)
  y = Math.floor(y / CELL_SIZE)
  return [x, y]
}

const getTypeOfCell = (grid: {[key: string]: GridCell}, type: CellType): string | void => {
  for (const key in grid) {
    if (grid[key].type === type) {
      return key;
    }
  }
}

export const getGoalCell = (grid: {[key: string]: GridCell}): string | void => {
  return getTypeOfCell(grid, CellType.Goal)
}
export const getStartCell = (grid: {[key: string]: GridCell}): string | void => {
  return getTypeOfCell(grid, CellType.Start)
}

export const getAdjacent = (world: { [key: string]: GridCell }, position: string): Array<string> => {
  
  return []
}

export const parseKey = (key: string): { x: number, y: number } => {
  let [x, y] = key.split(",").map(Number);
  return {x,y}
}

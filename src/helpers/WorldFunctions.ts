import { CELL_SIZE, NUM_COLS, NUM_ROWS } from "./Constants";
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

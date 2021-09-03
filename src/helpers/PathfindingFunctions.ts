import { Algorithm, CellType, GridCell, PathfindingStep } from "./Interfaces";
import { getAdjacent, getGoalCell, getStartCell } from "./WorldFunctions";

const pathfind = (world: { [key: string]: GridCell }, algo: Algorithm): Array<PathfindingStep> => {

  //If there is a goal and start
  if (getStartCell(world) && getGoalCell(world)) {
    switch (algo) {
      case Algorithm.BFS:
        return bfs(world)
      case Algorithm.DFS:
        return dfs(world)
      case Algorithm.AStar:
        return astar(world)
      case Algorithm.Dijkstra:
        return dijkstra(world)
      case Algorithm.Random:
        return random(world)
      default:
        return bfs(world)
    }
  }
  return []
}


const bfs = (world: { [key: string]: GridCell }): Array<PathfindingStep> => {
  const steps: Array<PathfindingStep> = []
  const queue: Array<string> = [];
  const explored: Array<string> = [];
  const start = getStartCell(world)
  explored.push(start);
  queue.push(start);
  let current = "";
  while (queue.length > 0) {

    current = queue.shift();

    if (world[current].type === CellType.Goal) {
      console.log("found")
      break;
    }
    for (let adj of getAdjacent(current)) {
      if (world[adj].type !== CellType.Wall) {
        if (!explored.includes(adj)) {
          explored.push(adj)
          queue.push(adj)
        }
      }
      
    }
    steps.push({key:current, newType: CellType.Visited})

  }
  return steps
}

const dfs = (world: { [key: string]: GridCell }): Array<PathfindingStep> => {
  const steps: Array<PathfindingStep> = [];
  const stack: Array<string> = [];
  const explored: Array<string> = []
  const start = getStartCell(world)
  stack.push(start)
  let current = ""
  while (stack.length > 0) {
    current = stack.pop();
    if (world[current].type === CellType.Goal) {
      break;
    }
    if (!explored.includes(current)) {
      explored.push(current)
      for (let adj of getAdjacent(current)) {
        if (world[adj].type !== CellType.Wall) {
        stack.push(adj)
          
        }
      }
      steps.push({key:current, newType: CellType.Visited})

    }

  }

  return steps;
}

const astar = (world: { [key: string]: GridCell }): Array<PathfindingStep> => {
  return []
}

const dijkstra = (world: { [key: string]: GridCell }): Array<PathfindingStep> => {
  return []
}

const random = (world: { [key: string]: GridCell }): Array<PathfindingStep> => {
  return []
}





export default pathfind;
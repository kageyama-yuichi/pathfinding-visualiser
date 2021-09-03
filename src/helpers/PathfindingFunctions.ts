import { Algorithm, GridCell, PathfindStep } from "./Interfaces";
import { getGoalCell, getStartCell } from "./WorldFunctions";

const pathfind = (world: { [key: string]: GridCell }, algo: Algorithm): Array<PathfindStep> | void => {

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


const bfs = (world: { [key: string]: GridCell }): Array<PathfindStep> => {

  return []
}

const dfs = (world: { [key: string]: GridCell }): Array<PathfindStep> => {
  return []
}

const astar = (world: { [key: string]: GridCell }): Array<PathfindStep> => {
  return []
}

const dijkstra = (world: { [key: string]: GridCell }): Array<PathfindStep> => {
  return []
}

const random = (world: { [key: string]: GridCell }): Array<PathfindStep> => {
  return []
}





export default pathfind;
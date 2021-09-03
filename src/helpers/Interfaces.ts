export enum CellType {
  Empty,
  Goal,
  Start,
  Wall,
  Checkpoint,
  Visited
}

export enum Algorithm {
  AStar,
  Dijkstra,
  DFS,
  BFS,
  Random
}

export interface GridCell{
  type: CellType,
  readonly x: number,
  readonly y: number
}
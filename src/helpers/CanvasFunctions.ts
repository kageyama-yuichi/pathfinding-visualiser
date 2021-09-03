import { GridCell, CellType } from "./Interfaces";
import { CELL_SIZE, LINE_WIDTH } from "./Constants";

export const drawLine = (context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
  context.strokeStyle = '#94167F';
  context.lineWidth = LINE_WIDTH;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

export const drawCell = (context: CanvasRenderingContext2D, cell: GridCell) => {
  switch (cell.type) {
    case CellType.Empty:
      context.fillStyle = '#300350';
      break;
    case CellType.Visited:
      context.fillStyle = '#DD517F';
      break;
    case CellType.Wall:
      context.fillStyle = "#5F97AA";
      break;
    case CellType.Start: 
      context.fillStyle = "#4C9C42";
      break;
    case CellType.Checkpoint:
      context.fillStyle = "#0083FF  ";
      break;
    case CellType.Goal:
      context.fillStyle = "#FF0072";
      break;
  }

  context.beginPath();
  context.rect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
  context.fill();
}
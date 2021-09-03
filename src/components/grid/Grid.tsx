import React, { useState, useEffect, useRef } from 'react';
import { CELL_SIZE, WIDTH, HEIGHT, NUM_COLS, NUM_ROWS} from '../../helpers/Constants'
import { drawLine, drawCell } from '../../helpers/CanvasFunctions'
import { CellType, GridCell } from '../../helpers/Interfaces';
import {getNearestCell, getGoalCell, getStartCell} from '../../helpers/WorldFunctions'
import './Grid.css'

const cloneDeep = require('lodash/cloneDeep')

interface GridProps{
  type: CellType;
  world: {[key:string]: GridCell}
  handleWorld: (newWorld: {[key:string]: GridCell}) => void;
}

var isDrawing = false;


const Grid = (props: GridProps) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const { world, handleWorld } = {...props}

  const canvasRef = useRef<HTMLCanvasElement>(null)


  // Mounts and unmounts an event listener on the canvas every time world state is changed
  // Seems like world state is store locally in the handleMouseDown function
  useEffect(() => {
    const canvas = canvasRef.current

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing === true) {
        const canvas = canvasRef.current
        let [x,y] = [...getNearestCell(getCursorPosition(canvas, e))];
        let clonedWorld = cloneDeep(world)
        if (props.type === CellType.Goal) {
          let currentGoal = getGoalCell(clonedWorld);
          if (currentGoal) {
            clonedWorld[currentGoal].type = CellType.Empty;
          }
        }else if (props.type === CellType.Start) {
          let currentStart = getStartCell(clonedWorld);
          if (currentStart) {
            clonedWorld[currentStart].type = CellType.Empty;
          }
        }
        clonedWorld[`${x},${y}`].type = props.type; 
        handleWorld(clonedWorld);
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true
      handleMouseMove(e)
    }
    const handleMouseUp = (e: MouseEvent) => {
      if (isDrawing) {
        handleMouseMove(e)
        isDrawing = false
      }
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [world, props.type])


  useEffect(() => {
    const canvas = canvasRef.current

    setContext(canvas.getContext('2d'));
    if (context) {
      context.canvas.width = WIDTH;
      context.canvas.height = HEIGHT;
      let width = context.canvas.width;
      let height = context.canvas.height;
      
      // Draw cells
      for (const key in world) {
        drawCell(context, world[key])
      }    

      // Draw vertical grid lines
      for (let i = 1; i < NUM_COLS; i++){
        drawLine(context, i * CELL_SIZE, 0, i * CELL_SIZE, height)
      }
      // Draw horizontal grid lines
      for (let i = 1; i < NUM_ROWS; i++){
        drawLine(context, 0, i* CELL_SIZE, width, i * CELL_SIZE)
      }
    }
  }, [world])

  return (
    <canvas className="Grid" ref={canvasRef}/>
  )
}

const getCursorPosition = (canvas: HTMLCanvasElement, event: MouseEvent): Array<number> => {
  const rect = canvas.getBoundingClientRect()

  const scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
  const scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  return [x, y]
}


export default Grid;


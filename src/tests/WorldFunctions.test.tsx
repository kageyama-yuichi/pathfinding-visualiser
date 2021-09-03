import { NUM_COLS, NUM_ROWS } from "../helpers/Constants";
import { GridCell, CellType } from "../helpers/Interfaces";
import { parseKey, getAdjacent } from "../helpers/WorldFunctions";

const world: { [key: string]: GridCell } = {}

beforeAll(() => {
  for (let x = 0; x < NUM_COLS; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      world[`${x},${y}`] =  {type: CellType.Empty, x: x, y: y}
    }
  }
})

describe("parseKey function", () => {
  test("Should return x, y dict", () => {
    let key = "0,0";
    let expected = { x: 0, y: 0 };
    expect(parseKey(key)).toEqual(expected)
  })

  test("Should return x, y dict", () => {
    let key = "10,20";
    let expected = { x: 10, y: 20 };
    expect(parseKey(key)).toEqual(expected)
  })
})


describe("getAdjacent function", () => {
  test("Should return 2 elements for top left corner", () => {
    let key = "0,0"
    expect(getAdjacent(key)).toHaveLength(2)
  })
  test("Should return 4 elements for 1,1", () => {
    let key = "1,1"
    expect(getAdjacent(key)).toHaveLength(4)
  })
  test("Should return 2 elements for bottom right corner", () => {
    let key = `${NUM_COLS - 1}, ${NUM_ROWS - 1}`
    let expected = [`${NUM_COLS - 2},${NUM_ROWS-1}`, `${NUM_COLS - 1},${NUM_ROWS-2}`]
    expect(getAdjacent(key)).toHaveLength(2)
    expect(getAdjacent(key)).toEqual(expected)
  })
})
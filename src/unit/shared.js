import {tryToCompose} from './words'

export function findMatch(matrix, current, row, column) {
  let line = matrix.get(row)
  const left = line.get(column - 1)
  const right = line.get(column + 1)
  let nextLine = matrix.get(row + 1)
  let down
  if (nextLine) {
    down = nextLine.get(column)
  }
  console.log(13, left, right, down)
  let result
  if (typeof left === 'string') {
    result = tryToCompose(left, current)
  }
  console.log(18, result)
  if (result) {
    line = line.set(column - 1, result)
    line = line.set(column, 0)
    matrix = matrix.set(row, line)
    return matrix
  }
  if (typeof right === 'string') {
    console.log(26, current, right)
    result = tryToCompose(current, right)
  }
  console.log(28, result)
  if (result) {
    line = line.set(column + 1, result)
    line = line.set(column, 0)
    matrix = matrix.set(row, line)
    return matrix
  }
  if (typeof down === 'string') {
    result = tryToCompose(down, current)
  }
  console.log(38, result)
  if (result) {
    nextLine = nextLine.set(column, result)
    line = line.set(column, 0)
    matrix = matrix.set(row, line)
    matrix = matrix.set(row + 1, nextLine)
    return matrix
  }
  return matrix
}

import { fileToArray } from "../common/utils.js";

const strings = fileToArray("day9/input.txt");

function next(line) {
  if (line.every((item) => item === 0)) {
    return 0;
  } else {
    return (
      line.at(-1) +
      next([...Array(line.length - 1).keys()].map((i) => line[i + 1] - line[i]))
    );
  }
}

function prev(line) {
  if (line.every((item) => item === 0)) {
    return 0;
  } else {
    return (
      line[0] -
      prev([...Array(line.length - 1).keys()].map((i) => line[i + 1] - line[i]))
    );
  }
}

function part1(strings) {
  return strings
    .map((line) => next(line.split(" ").map((item) => parseInt(item))))
    .reduce((p, c) => p + c, 0);
}

function part2(strings) {
  return strings
    .map((line) => prev(line.split(" ").map((item) => parseInt(item))))
    .reduce((p, c) => p + c, 0);
}

console.log(part1(strings));
console.log(part2(strings));

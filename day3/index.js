import { fileToArray } from "../common/utils.js";
const strings = fileToArray("day3/input.txt");

// All the differences to search around a point
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

function adjacentToSymbol(strings, y, x) {
  return directions.some((direction) => {
    const char = strings?.[y + direction[0]]?.[x + direction[1]];
    return char && isNaN(char) && char !== ".";
  });
}

function part1(strings) {
  const width = strings[0].length;
  const height = strings.length;
  let currentNumber = "";
  let isPartNum = false;
  let validParts = [];
  function finishUp() {
    if (currentNumber) {
      if (isPartNum) {
        validParts.push(currentNumber);
      }
    }
    isPartNum = false;
    currentNumber = "";
  }
  for (let y = 0; y < height; y++) {
    finishUp();
    for (let x = 0; x < width; x++) {
      // If you find a number
      if (!isNaN(strings[y][x])) {
        // Add it to the string
        currentNumber += strings[y][x];
        // If there's a part nearby
        if (adjacentToSymbol(strings, y, x)) {
          // Set a flag
          isPartNum = true;
        }
      } else {
        finishUp();
      }
    }
  }
  finishUp();
  return validParts.reduce((p, c) => p + parseInt(c), 0);
}

function adjacentToSymbolPt2(strings, y, x) {
  return directions
    .map((direction) => {
      const char = strings?.[y + direction[0]]?.[x + direction[1]];
      return char && char === "*" ? [y + direction[0], x + direction[1]] : null;
    })
    .filter((item) => item);
}

function part2(strings) {
  const width = strings[0].length;
  const height = strings.length;
  const stringCopy = JSON.parse(JSON.stringify(strings)).map((item) =>
    item.split("").map((item) => [])
  );
  let currentNumber = "";
  let isPartNum = [];
  let validParts = [];
  function finishUp() {
    if (currentNumber) {
      if (isPartNum.length) {
        const uniqueCoords = [...new Set(isPartNum)];
        uniqueCoords.forEach((item) => {
          const split = item.split(",");
          stringCopy[parseInt(split[0])][parseInt(split[1])] = [
            ...stringCopy[parseInt(split[0])][parseInt(split[1])],
            currentNumber,
          ];
        });
        validParts.push(currentNumber);
      }
    }
    isPartNum = [];
    currentNumber = "";
  }
  for (let y = 0; y < height; y++) {
    finishUp();
    for (let x = 0; x < width; x++) {
      // If you find a number
      if (!isNaN(strings[y][x])) {
        // Add it to the string
        currentNumber += strings[y][x];
        // If there's a part nearby
        if (adjacentToSymbolPt2(strings, y, x).length) {
          // Set a flag
          isPartNum = [
            ...isPartNum,
            ...adjacentToSymbolPt2(strings, y, x).map((item) => item.join(",")),
          ];
        }
      } else {
        finishUp();
      }
    }
  }
  finishUp();
  return stringCopy
    .flat()
    .filter((item) => item.length === 2)
    .map((item) => parseInt(item[0]) * parseInt(item[1]))
    .reduce((p, c) => p + c, 0);
}

console.log(part1(strings));
console.log(part2(strings));

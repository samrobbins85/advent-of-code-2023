import { fileToArray } from "../common/utils.js";

const strings = fileToArray("day1/input.txt");

function part1(strings) {
  return strings
    .map((str) => {
      const arr = str.split("").filter((char) => !isNaN(char));
      return parseInt(`${arr[0]}${arr.at(-1)}`);
    })
    .reduce((p, c) => p + c, 0);
}

function part2(strings) {
  const map = {
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine",
  };
  const newstrings = strings.map((str) => {
    Object.entries(map).forEach(([k, v]) => {
      str = str.replaceAll(k, v);
    });
    return str;
  });
  return part1(newstrings);
}

console.log(part1(strings));
console.log(part2(strings));

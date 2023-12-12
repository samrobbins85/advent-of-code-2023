import { fileToArray } from "../common/utils.js";

const strings = fileToArray("day4/input.txt");

function part1(strings) {
  return strings
    .map((item) =>
      item
        .split(":")[1]
        .trim()
        .split("|")
        .map((item) => item.trim().split(/[ ]+/))
    )
    .map((item) => {
      const overlap = item[1].filter((value) => item[0].includes(value));
      return overlap.length ? 2 ** (overlap.length - 1) : 0;
    })
    .reduce((p, c) => p + c, 0);
}

function part2(strings) {
  const scores = strings
    .map((item) =>
      item
        .split(":")[1]
        .trim()
        .split("|")
        .map((item) => item.trim().split(/[ ]+/))
    )
    .map((item) => {
      const overlap = item[1].filter((value) => item[0].includes(value));
      return overlap.length;
    });
  const counts = [...scores].map(() => 1);
  scores.forEach((item, index) => {
    if (item) {
      for (let i = index + 1; i <= index + item; i++) {
        counts[i] = counts[i] + counts[index];
      }
    }
  });
  return counts.reduce((p, c) => p + c, 0);
}
console.log(part1(strings));
console.log(part2(strings));

import { fileToArray } from "../common/utils.js";

const strings = fileToArray("day6/input.txt");

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

function beatsRecord(held, time, distance) {
  return distance < held * (time - held);
}

function part1(strings) {
  const input = strings.map((item) =>
    item
      .split(":")[1]
      .trim()
      .split(/[ ]+/)
      .map((item) => parseInt(item))
  );
  const output = input[0].map((item, index) => {
    const time = item;
    const distance = input[1][index];
    const possible_times = range(1, time - 1).map((held) =>
      beatsRecord(held, time, distance)
    );
    return possible_times;
  });
  return output
    .map((item) => item.filter((i) => i).length)
    .reduce((p, c) => p * c, 1);
}

function part2(strings) {
  const input = strings.map((item) =>
    parseInt(item.split(":")[1].trim().replaceAll(" ", ""))
  );
  const t = input[0];
  const d = input[1];
  const h1 = Math.floor((t + Math.sqrt(t ** 2 - 4 * d)) / 2);
  const h2 = Math.ceil((t - Math.sqrt(t ** 2 - 4 * d)) / 2);
  return h1 - h2 + 1;
}

console.log(part1(strings));
console.log(part2(strings));

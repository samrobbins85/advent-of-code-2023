import fs from "fs";

const fileToArray = (fileName) =>
  fs.readFileSync(fileName).toString().split("\n\n");

function part1(string) {
  const seeds = string[0]
    .split(": ")[1]
    .split(" ")
    .map((i) => parseInt(i));
  const maps = string.slice(1).map((a) =>
    a
      .split("\n")
      .slice(1)
      .map((b) => b.split(" ").map((c) => parseInt(c)))
  );
  const map = (value, i) => {
    if (i === maps.length) {
      return value;
    }
    for (let [destination, source, range] of maps[i]) {
      if (source <= value && value < source + range)
        return map(destination + value - source, i + 1);
    }
    return map(value, i + 1);
  };
  return Math.min(...seeds.map((seed) => map(seed, 0)));
}

function range(j, k) {
  return Array.apply(null, Array(k - j + 1)).map(function (_, n) {
    return n + j;
  });
}

function part2(string) {
  const seedsRanges = string[0]
    .split(": ")[1]
    .split(" ")
    .map((i) => parseInt(i));

  const maps = string.slice(1).map((a) =>
    a
      .split("\n")
      .slice(1)
      .map((b) => b.split(" ").map((c) => parseInt(c)))
  );
  const reverseMap = (value, i) => {
    if (i === -1) {
      return value;
    }
    for (let [destination, source, range] of maps[i]) {
      if (destination <= value && value < destination + range)
        return reverseMap(source + value - destination, i - 1);
    }
    return reverseMap(value, i - 1);
  };
  for (let i = 0; i < Infinity; i++) {
    const seed = reverseMap(i, 6);
    for (let j = 0; j < seedsRanges.length; j = j + 2) {
      if (
        seed <= seedsRanges[j] + seedsRanges[j + 1] &&
        seed >= seedsRanges[j]
      ) {
        return i;
      }
    }
  }
}

console.log(part1(fileToArray("day5/input.txt")));
// This one takes about a minute and a half
console.log(part2(fileToArray("day5/input.txt")));

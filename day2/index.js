import { fileToArray } from "../common/utils.js";

const strings = fileToArray("day2/input.txt");

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

function part1(strings) {
  return strings
    .map((str) =>
      str
        .split(": ")[1]
        .split(";")
        .map((set) =>
          set.split(",").map((item) => {
            const split = item.trim().split(" ");
            return parseInt(split[0]) <= bag[split[1]];
          })
        )
        .flat(Infinity)
    )
    .reduce((p, c, i) => p + (c.every((ind) => ind) ? i + 1 : 0), 0);
}

function part2(strings) {
  return strings
    .map((str) =>
      Object.values(
        str
          .split(": ")[1]
          .split(";")
          .map((set) => set.split(","))
          .flat(Infinity)
          .reduce(
            (p, c) => {
              const split = c.trim().split(" ");
              return {
                ...p,
                [split[1]]: Math.max(p[split[1]], parseInt(split[0])),
              };
            },
            { red: 0, green: 0, blue: 0 }
          )
      ).reduce((p, c) => p * c, 1)
    )
    .reduce((p, c) => p + c, 0);
}

console.log(part1(strings));
console.log(part2(strings));

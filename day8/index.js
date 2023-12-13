import fs from "fs";

const fileToArray = (fileName) =>
  fs.readFileSync(fileName).toString().split("\n\n");

const strings = fileToArray("day8/input.txt");

function part1(strings) {
  const directions = strings[0];
  console.log(directions);
  const map = Object.fromEntries(
    strings[1]
      .split("\n")
      .map((item) => item.split(" = ("))
      .map(([key, value]) => [key, value.slice(0, -1).split(", ")])
  );
  let position = "AAA";
  let i;
  for (i = 0; true; i++) {
    const activeDirection = directions[i % directions.length];
    position = map[position][activeDirection === "L" ? 0 : 1];
    if (position === "ZZZ") {
      break;
    }
  }
  return i + 1;
}

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

function part2(strings) {
  const directions = strings[0];
  const map = Object.fromEntries(
    strings[1]
      .split("\n")
      .map((item) => item.split(" = ("))
      .map(([key, value]) => [key, value.slice(0, -1).split(", ")])
  );
  let positions = Object.keys(map).filter((key) => key.endsWith("A"));
  let finished = [];
  let i;
  for (i = 0; true; i++) {
    const activeDirection = directions[i % directions.length];
    positions = positions.map(
      (item) => map[item][activeDirection === "L" ? 0 : 1]
    );
    if (positions.filter((position) => position.endsWith("Z")).length) {
      finished.push(i + 1);
    }
    positions = positions.filter((position) => !position.endsWith("Z"));
    if (positions.length === 0) {
      break;
    }
  }
  return finished.reduce(lcm);
}

console.log(part1(strings));
console.log(part2(strings));

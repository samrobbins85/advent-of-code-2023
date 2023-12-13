import { fileToArray } from "../common/utils.js";

const strings = fileToArray("day7/input.txt");

const strengths = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const pt2strengths = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

function getHand(cards) {
  const count = {};
  cards.split("").forEach((card) => (count[card] = (count[card] || 0) + 1));
  const countArr = Object.values(count);
  if (countArr.includes(5)) {
    return 6;
  }
  if (countArr.includes(4)) {
    return 5;
  }
  if (countArr.includes(3) && countArr.includes(2)) {
    return 4;
  }
  if (countArr.includes(3)) {
    return 3;
  }
  if (countArr.includes(2) && countArr.length === 3) {
    return 2;
  }
  if (countArr.includes(2) && countArr.length === 4) {
    return 1;
  }
  if (countArr.length === 5) {
    return 0;
  }
}

function getHigherString(a, b) {
  for (let i = 0; i < 5; i++) {
    if (strengths.indexOf(a[i]) < strengths.indexOf(b[i])) {
      return 1;
    }
    if (strengths.indexOf(b[i]) < strengths.indexOf(a[i])) {
      return -1;
    }
  }
}

function part1(strings) {
  return strings
    .map((item) => item.split(" "))
    .sort((a, b) => {
      const aHand = getHand(a[0]);
      const bHand = getHand(b[0]);
      if (aHand < bHand) {
        return -1;
      } else if (bHand < aHand) {
        return 1;
      } else {
        return getHigherString(a[0], b[0]);
      }
    })
    .map((item, index) => (index + 1) * parseInt(item[1]))
    .reduce((p, c) => p + c, 0);
}

function part2getHand(cards) {
  const count = {};
  cards.split("").forEach((card) => (count[card] = (count[card] || 0) + 1));
  if (count.J === 5) {
    return 6;
  }
  const modifiedCount = { ...count, J: 0 };
  const highestKey = Object.keys(modifiedCount).reduce((a, b) =>
    modifiedCount[a] > modifiedCount[b] ? a : b
  );
  const countJokers = count?.["J"] || 0;
  count[highestKey] += countJokers;
  delete count.J;
  const countArr = Object.values(count);
  if (countArr.includes(5)) {
    return 6;
  }
  if (countArr.includes(4)) {
    return 5;
  }
  if (countArr.includes(3) && countArr.includes(2)) {
    return 4;
  }
  if (countArr.includes(3)) {
    return 3;
  }
  if (countArr.includes(2) && countArr.length === 3) {
    return 2;
  }
  if (countArr.includes(2) && countArr.length === 4) {
    return 1;
  }
  if (countArr.length === 5) {
    return 0;
  }
}

function part2getHigherString(a, b) {
  for (let i = 0; i < 5; i++) {
    if (pt2strengths.indexOf(a[i]) < pt2strengths.indexOf(b[i])) {
      return 1;
    }
    if (pt2strengths.indexOf(b[i]) < pt2strengths.indexOf(a[i])) {
      return -1;
    }
  }
}

function part2(strings) {
  return strings
    .map((item) => item.split(" "))
    .sort((a, b) => {
      const aHand = part2getHand(a[0]);
      const bHand = part2getHand(b[0]);
      if (aHand < bHand) {
        return -1;
      } else if (bHand < aHand) {
        return 1;
      } else {
        return part2getHigherString(a[0], b[0]);
      }
    })
    .map((item, index) => (index + 1) * parseInt(item[1]))
    .reduce((p, c) => p + c, 0);
}

console.log(part1(strings));
console.log(part2(strings));

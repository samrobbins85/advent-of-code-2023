import fs from "fs";
export const fileToArray = (fileName) =>
  fs.readFileSync(fileName).toString().split("\n");

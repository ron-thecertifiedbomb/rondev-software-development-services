#!/usr/bin/env node
import fs from "fs";
import path from "path";

function printDir(dirPath, prefix = "", depth = 0, maxDepth = 5) {
  if (depth > maxDepth) return;

  const dirents = fs.readdirSync(dirPath, { withFileTypes: true });
  dirents.forEach((dirent, i) => {
    const isLast = i === dirents.length - 1;
    const item = dirent.name;
    const fullPath = path.join(dirPath, item);

    const line = `${prefix}${isLast ? "└──" : "├──"} ${item}`;
    console.log(line);

    if (
      dirent.isDirectory() &&
      !["node_modules", ".git", ".next"].includes(item)
    ) {
      printDir(
        fullPath,
        prefix + (isLast ? "    " : "│   "),
        depth + 1,
        maxDepth,
      );
    }
  });
}

printDir(process.cwd());

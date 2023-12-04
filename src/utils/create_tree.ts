import { Directory, File } from "../types";
import { parseCommand } from "./parse_command";

export const createTree = (lines: Array<string>): Directory => {
  const root: Directory = {
    name: '/',
    isDirectory: true,
    children: [],
  };

  let currentNode: Directory | File = root;
  let currentCommand = '';

  for (const line of lines) {
    if (line.startsWith('$')) {
      const { command, argument } = parseCommand(line);

      currentCommand = command;

      if (currentCommand === 'cd') {
        const target = argument;
        if (target === '/') {
          currentNode = root;
        } else if (target === '..') {
          currentNode = currentNode.parent!;
        } else {
          if ('children' in currentNode) {
            currentNode = currentNode.children.find(
              (child) => child.isDirectory && child.name === target,
            )!;
          }
        }
      }
    } else {
      if (currentCommand === 'ls') {
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
        if (fileMatch && 'children' in currentNode) {
          if (!fileMatch.groups) {
            throw new Error(`Could not parse file: ${line}`);
          }

          currentNode.children.push({
            name: fileMatch.groups.name,
            isDirectory: false,
            size: Number(fileMatch.groups.size),
            parent: currentNode,
          });
        }

        const dirMatch = /^dir (?<name>.+)$/.exec(line);
        if (dirMatch && 'children' in currentNode) {
          if (!dirMatch.groups) {
            throw new Error(`Could not parse directory: ${line}`);
          }

          currentNode.children.push({
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          });
        }
      }
    }
  }

  return root;
};
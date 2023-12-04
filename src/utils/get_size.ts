import { Callback, Directory, File } from "../types";

export const getSize = (node: Directory | File, callback: Callback) => {
  if (!node.isDirectory && 'size' in node) {
    return node.size ?? 0;
  }

  let directorySize = 0;
  if ('children' in node) {
    directorySize = node.children
      .map((child: Directory | File) => getSize(child, callback))
      .reduce((a: number, b: number) => a + b, 0);
  }

  callback(directorySize);
  return directorySize;
};
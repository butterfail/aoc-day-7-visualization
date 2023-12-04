export interface FileSystemNode {
  name: string;
  isDirectory: boolean;
  parent?: Directory;
}

export interface Directory extends FileSystemNode {
  children: Array<Directory | File>;
}

export interface File extends FileSystemNode {
  size: number;
}

export type Callback = (...args: any) => void;
export const parseCommand = (line: string): { command: string; argument?: string } => {
  const cmdMatch = /^\$ (?<command>\w+)(?: (?<argument>.+))?$/.exec(line);
  if (!cmdMatch || !cmdMatch.groups) {
    throw new Error(`Could not parse command: ${line}`);
  }
  return { command: cmdMatch.groups.command, argument: cmdMatch.groups.argument };
};
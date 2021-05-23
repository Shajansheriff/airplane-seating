export const unreachable = (any: never): never => {
  throw new Error(`cannot be reached ${JSON.stringify(any)}`);
};

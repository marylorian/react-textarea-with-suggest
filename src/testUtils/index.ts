export const wait = async (ms: number) =>
  setTimeout(() => Promise.resolve(), ms);

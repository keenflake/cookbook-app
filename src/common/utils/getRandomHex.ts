export const getRandomHex = (len: number): string =>
  [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

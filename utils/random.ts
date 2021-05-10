export const randomPair = (uniqueValues: number) => {
  const arr = [];
  while (arr.length < uniqueValues) {
    const rNum = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(rNum) === -1) arr.push(rNum);
  }
  return [...arr, ...arr];
};

export const shuffle = (inputArr: number[]) => {
  let currIndex = inputArr.length;
  while (currIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;
    const temporaryValue = inputArr[currIndex];
    inputArr[currIndex] = inputArr[randomIndex];
    inputArr[randomIndex] = temporaryValue;
  }
  return inputArr;
};

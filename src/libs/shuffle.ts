export const shuffle = <T>(array: T[]): T[] => {
  // let currentIndex = array.length;
  // let temporaryValue: T;
  // let randomIndex: number;

  // while (0 !== currentIndex) {
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   currentIndex -= 1;

  //   temporaryValue = array[currentIndex];
  //   array[currentIndex] = array[randomIndex];
  //   array[randomIndex] = temporaryValue;
  // }

  for (let i = array.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }

  return array;
};

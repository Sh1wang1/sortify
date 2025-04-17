export const bubbleSort=(array)=> {
    let animations = [];
    let tempArray = [...array];
    for (let i = 0; i < tempArray.length - 1; i++) {
      for (let j = 0; j < tempArray.length - i - 1; j++) {
        if (tempArray[j] > tempArray[j + 1]) {
          animations.push([j, j + 1, true]);
          let temp = tempArray[j];
          tempArray[j] = tempArray[j + 1];
          tempArray[j + 1] = temp;
        } else {
          animations.push([j, j + 1, false]);
        }
      }
    }
    return { animations, sorted: tempArray };
  }
  
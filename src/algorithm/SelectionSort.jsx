export const selectionSort = (array) => {
  const animations = [];
  const auxiliaryArray = array.slice();

  for (let i = 0; i < auxiliaryArray.length; i++) {
    let minIdx = i;

    for (let j = i + 1; j < auxiliaryArray.length; j++) {
      animations.push([minIdx, j, false]); 
      if (auxiliaryArray[j] < auxiliaryArray[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      animations.push([i, minIdx, true]); 
      [auxiliaryArray[i], auxiliaryArray[minIdx]] = [auxiliaryArray[minIdx], auxiliaryArray[i]];
    }

    animations.push([i, i, false, true]); 
  }

  return { animations, sorted: auxiliaryArray };
};

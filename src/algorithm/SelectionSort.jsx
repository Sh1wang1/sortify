export const selectionSort = (array) => {
    const animations = [];
    const auxiliaryArray = array.slice();
    for (let i = 0; i < auxiliaryArray.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < auxiliaryArray.length; j++) {
        animations.push([i, j, false]);
        if (auxiliaryArray[j] < auxiliaryArray[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        animations.push([i, minIdx, true]);
        swap(auxiliaryArray, i, minIdx);
      }
    }
    return { animations, sorted: auxiliaryArray };
  };
  
  const swap = (array, idx1, idx2) => {
    let temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  };
  
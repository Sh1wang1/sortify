export const MergeSort = (array) => {
    const animations = [];
    if (array.length <= 1) return animations;
  
    const auxiliaryArray = array.slice();
    const sortedArray = array.slice();
    
    mergeSortHelper(sortedArray, 0, sortedArray.length - 1, auxiliaryArray, animations);
    return animations;
  };
  
  const mergeSortHelper = (sortedArray, startIdx, endIdx, auxiliaryArray, animations) => {
    if (startIdx === endIdx) return;
  
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, sortedArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, sortedArray, animations);
  
    doMerge(sortedArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  };
  
  const doMerge = (sortedArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
  
    while (i <= middleIdx && j <= endIdx) {
      // Push two indices that are being compared
      animations.push([i, j]);
      // Push two indices again, to change their color back
      animations.push([i, j]);
  
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // Push index and its new height
        animations.push([k, auxiliaryArray[i]]);
        sortedArray[k++] = auxiliaryArray[i++]; // Update the sortedArray copy
      } else {
        // Push index and its new height
        animations.push([k, auxiliaryArray[j]]);
        sortedArray[k++] = auxiliaryArray[j++]; // Update the sortedArray copy
      }
    }
  
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
  
      animations.push([k, auxiliaryArray[i]]);
      sortedArray[k++] = auxiliaryArray[i++]; // Update the sortedArray copy
    }
  
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
  
      animations.push([k, auxiliaryArray[j]]);
      sortedArray[k++] = auxiliaryArray[j++]; // Update the sortedArray copy
    }
  };
  
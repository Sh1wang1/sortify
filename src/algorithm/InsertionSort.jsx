export const insertionSort = (array) => {
    let animations = [];
    let tempArray = [...array]; 
  
    for (let i = 1; i < tempArray.length; i++) {
      let key = tempArray[i];
      let j = i - 1;
  
      while (j >= 0 && tempArray[j] > key) {
        animations.push([j, j + 1, true]);  
        tempArray[j + 1] = tempArray[j];   
        j--;
      }
  
      animations.push([j + 1, i, true]);    
      tempArray[j + 1] = key;
    }
  
    return { animations, sorted: tempArray };
  };
  
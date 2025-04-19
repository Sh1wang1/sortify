export const insertionSort = (array) => {
  const animations = [];
  const tempArray = [...array];

  for (let i = 1; i < tempArray.length; i++) {
    const key = tempArray[i];
    let j = i - 1;
    animations.push({ type: "compare", index: i });

    while (j >= 0 && tempArray[j] > key) {
      animations.push({ type: "swap", indices: [j, j + 1] });
      tempArray[j + 1] = tempArray[j];
      animations.push({
        type: "overwrite",
        toIndex: j + 1,
        fromIndex: j,
      });

      j--;
    }

    tempArray[j + 1] = key;
    animations.push({
      type: "insert",
      index: j + 1,
      value: key,
    });

    animations.push({
      type: "sortedUpto",
      index: i,
    });
  }

  return { animations, sorted: tempArray };
};

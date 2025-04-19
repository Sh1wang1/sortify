export const bubbleSort = (array) => {
  const arr = [...array];
  const animations = [];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const isSwap = arr[j] > arr[j + 1];

      animations.push({
        type: "compare",
        indices: [j, j + 1],
        swap: isSwap
      });

      if (isSwap) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }

    animations.push({
      type: "markSorted",
      index: n - i - 1
    });
  }

  animations.push({
    type: "markSorted",
    index: 0
  });

  return { animations, sorted: arr };
};

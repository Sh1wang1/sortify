export const bubbleSort = (array) => {
  const arr = [...array];
  const animations = [];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const isSwap = arr[j] > arr[j + 1];
      animations.push([j, j + 1, isSwap, false]);

      if (isSwap) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    animations.push([n - i - 1, n - i - 1, false, true]);
  }

  animations.push([0, 0, false, true]);

  return { animations, sorted: arr };
};

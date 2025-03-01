export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Highlight bars being compared
      animations.push([j, j + 1, 'compare']); // Mark for comparison

      if (array[j] > array[j + 1]) {
        // Swap the bars and add animation for the swap
        animations.push([j, array[j + 1], 'swap']); // Update bar j
        animations.push([j + 1, array[j], 'swap']); // Update bar j + 1

        // Perform the actual swap in the array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }

      // After comparison, restore the colors
      animations.push([j, j + 1, 'restore']); // Restore the comparison bars to normal
    }
  }

  return animations;
}

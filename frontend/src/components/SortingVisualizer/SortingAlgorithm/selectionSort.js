export function getSelectionSortAnimations(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find the minimum element in the unsorted portion of the array
    for (let j = i + 1; j < n; j++) {
      // Compare and add indices to the animation (highlight comparison)
      animations.push([j, minIdx, 'compare']);
      
      if (array[j] < array[minIdx]) {
        minIdx = j; // Update minimum index
      }
    }

    // Swap elements if a smaller element was found
    if (minIdx !== i) {
      animations.push([i, minIdx, 'swap']);
      animations.push([i, array[minIdx], 'swap']);
      animations.push([minIdx, array[i], 'swap']);
      animations.push([minIdx, array[i], 'swap']);
      [array[i], array[minIdx]] = [array[minIdx], array[i]]; // Swap the elements
    }
  }

  return animations;
}

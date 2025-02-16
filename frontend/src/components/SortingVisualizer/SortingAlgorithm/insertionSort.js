export function getInsertionSortAnimations(array) {
  const animations = [];
  const n = array.length;
  
  for (let i = 1; i < n; i++) {
    let currentValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currentValue) {
      animations.push([j, j + 1, 'compare']);
      animations.push([j + 1, array[j], 'swap']);
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currentValue;
    animations.push([j + 1, currentValue, 'swap']);
  }
  
  return animations;
}
export function getQuickSortAnimations(array) {
  const animations = [];

  function quickSortHelper(arr, startIdx, endIdx) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(arr, startIdx, endIdx);
    quickSortHelper(arr, startIdx, pivotIdx - 1); // Left side of pivot
    quickSortHelper(arr, pivotIdx + 1, endIdx); // Right side of pivot
  }

  function partition(arr, startIdx, endIdx) {
    const pivotValue = arr[endIdx];
    let pivotIdx = startIdx;

    for (let i = startIdx; i < endIdx; i++) {
      // Comparison of element with pivot
      animations.push([i, endIdx, 'compare']);
      
      if (arr[i] < pivotValue) {
        // Swap the element at i with the element at pivotIdx
        animations.push([i, pivotIdx, 'swap']);
        animations.push([i, pivotIdx, 'swap']);
        animations.push([i, arr[pivotIdx], 'swap']);
        animations.push([pivotIdx, arr[i], 'swap']);
        [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
        pivotIdx++;
      }
    }
    
    // Swap the pivot element with the element at pivotIdx
    animations.push([pivotIdx, endIdx, 'swap']);
    animations.push([pivotIdx, endIdx, 'swap']);
    animations.push([pivotIdx, arr[endIdx], 'swap']);
    animations.push([endIdx, arr[pivotIdx], 'swap']);
    [arr[pivotIdx], arr[endIdx]] = [arr[endIdx], arr[pivotIdx]];

    return pivotIdx;
  }

  quickSortHelper(array, 0, array.length - 1);
  return animations;
}

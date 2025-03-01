export function getHeapSortAnimations(array) {
  const animations = [];
  const n = array.length;

  // Helper function for heapifying the array
  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Compare left child with root
    if (left < n && arr[left] > arr[largest]) largest = left;
    // Compare right child with root
    if (right < n && arr[right] > arr[largest]) largest = right;

    // If largest is not root, swap and heapify the affected subtree
    if (largest !== i) {
      // Animation for comparison
      animations.push([i, largest, 'compare']);
      animations.push([i, largest, 'compare']);
      // Animation for swapping
      animations.push([i, arr[largest], 'swap']);
      animations.push([largest, arr[i], 'swap']);
      // Perform the actual swap in the array
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);  // Recursively heapify the affected subtree
    }
  }

  // Build the max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }

  // One by one extract elements from the heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end (swap)
    animations.push([0, i, 'compare']);
    animations.push([0, i, 'compare']);
    animations.push([0, array[i], 'swap']);
    animations.push([i, array[0], 'swap']);
    [array[0], array[i]] = [array[i], array[0]];

    // Call heapify on the reduced heap
    heapify(array, i, 0);
  }

  return animations;
}

/**
 * Quick Sort Algorithm with step-by-step tracking
 * Divide and conquer with pivot-based partitioning
 */

export function quickSort(array) {
  const steps = [];
  let comparisons = 0;
  let partitions = 0;
  const arrCopy = [...array];

  function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    // Agregar paso inicial de partición
    steps.push({
      array: [...arr],
      comparisons,
      partitions,
      currentIndex: -1,
      compareIndex: -1,
      pivotIndex: high,
      partitionRange: { start: low, end: high },
      message: `Iniciando partición del rango [${low}...${high}] con pivote = ${pivot}`
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      
      if (arr[j] <= pivot) {
        i++;

        // Intercambiar arr[i] y arr[j]
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          array: [...arr],
          comparisons,
          partitions,
          currentIndex: i,
          compareIndex: j,
          pivotIndex: high,
          partitionRange: { start: low, end: high },
          message: `${arr[j]} ≤ ${pivot} ✓ - Intercambiando posiciones ${i} y ${j}`
        });
      } else {
        steps.push({
          array: [...arr],
          comparisons,
          partitions,
          currentIndex: -1,
          compareIndex: j,
          pivotIndex: high,
          partitionRange: { start: low, end: high },
          message: `${arr[j]} > ${pivot} ✗ - Elemento ${arr[j]} ya está en el lado correcto`
        });
      }
    }

    // Intercambiar arr[i+1] y arr[high] (pivote a su posición final)
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      array: [...arr],
      comparisons,
      partitions,
      currentIndex: i + 1,
      compareIndex: -1,
      pivotIndex: i + 1,
      partitionRange: { start: low, end: high },
      message: `✓ Pivote ${pivot} en posición final ${i + 1}. Elementos menores a la izquierda, mayores a la derecha.`
    });

    partitions++;
    return i + 1;
  }

  function quickSortRecursive(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);

      // Agregar mensaje de progresión
      steps.push({
        array: [...arr],
        comparisons,
        partitions,
        currentIndex: -1,
        compareIndex: -1,
        pivotIndex: pi,
        partitionRange: { start: -1, end: -1 },
        message: `Continuando con subarray izquierdo [${low}...${pi - 1}] y derecho [${pi + 1}...${high}]`
      });

      // Ordenar recursivamente
      quickSortRecursive(arr, low, pi - 1);
      quickSortRecursive(arr, pi + 1, high);
    }
  }

  if (array.length > 0) {
    quickSortRecursive(arrCopy, 0, array.length - 1);
  }

  // Agregar paso final
  steps.push({
    array: [...arrCopy],
    comparisons,
    partitions,
    currentIndex: -1,
    compareIndex: -1,
    pivotIndex: -1,
    partitionRange: { start: -1, end: -1 },
    message: '✓ Quick Sort completado - Array totalmente ordenado'
  });

  return {
    array: arrCopy,
    comparisons,
    partitions,
    steps,
    complexity: {
      time: 'O(n log n)',
      space: 'O(log n)',
      bestCase: 'O(n log n)',
      worstCase: 'O(n²)',
      stable: false
    }
  };
}

export function quickSortSimple(array) {
  const result = quickSort([...array]);
  return result.array;
}

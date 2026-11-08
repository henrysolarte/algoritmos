/**
 * Merge Sort Algorithm with step-by-step tracking
 * Divide and conquer approach for sorting
 */

export function mergeSort(array) {
  const steps = [];
  let comparisons = 0;
  let merges = 0;
  const arrCopy = [...array];

  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    // Fusionar y rastrear pasos
    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        steps.push({
          array: [...arr],
          comparisons,
          merges,
          currentIndex: k,
          compareIndex: left + i,
          mergeRange: { start: left, end: right },
          message: `Comparando: ${leftArr[i]} ≤ ${rightArr[j]} ✓ - Copiando ${leftArr[i]} a posición ${k}`
        });
        i++;
      } else {
        arr[k] = rightArr[j];
        steps.push({
          array: [...arr],
          comparisons,
          merges,
          currentIndex: k,
          compareIndex: mid + 1 + j,
          mergeRange: { start: left, end: right },
          message: `Comparando: ${leftArr[i]} > ${rightArr[j]} - Copiando ${rightArr[j]} a posición ${k}`
        });
        j++;
      }
      k++;
    }

    // Copiar elementos restantes de la izquierda
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        comparisons,
        merges,
        currentIndex: k,
        compareIndex: left + i,
        mergeRange: { start: left, end: right },
        message: `Copiando elemento restante: ${leftArr[i]} a posición ${k}`
      });
      i++;
      k++;
    }

    // Copiar elementos restantes de la derecha
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        comparisons,
        merges,
        currentIndex: k,
        compareIndex: mid + 1 + j,
        mergeRange: { start: left, end: right },
        message: `Copiando elemento restante: ${rightArr[j]} a posición ${k}`
      });
      j++;
      k++;
    }

    merges++;
    steps.push({
      array: [...arr],
      comparisons,
      merges,
      currentIndex: -1,
      compareIndex: -1,
      mergeRange: { start: left, end: right },
      message: `✓ Fusión completada del rango [${left}...${right}]`
    });
  }

  function mergeSortRecursive(arr, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      // Agregar paso de división
      steps.push({
        array: [...arr],
        comparisons,
        merges,
        currentIndex: -1,
        compareIndex: -1,
        mergeRange: { start: left, end: right },
        message: `Dividiendo rango [${left}...${right}] en [${left}...${mid}] y [${mid + 1}...${right}]`
      });

      // Ordenar primera mitad
      mergeSortRecursive(arr, left, mid);

      // Ordenar segunda mitad
      mergeSortRecursive(arr, mid + 1, right);

      // Fusionar mitades
      merge(arr, left, mid, right);
    }
  }

  if (array.length > 0) {
    mergeSortRecursive(arrCopy, 0, array.length - 1);
  }

  return {
    array: arrCopy,
    comparisons,
    merges,
    steps,
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)',
      bestCase: 'O(n log n)',
      stable: true
    }
  };
}

export function mergeSortSimple(array) {
  const result = mergeSort([...array]);
  return result.array;
}

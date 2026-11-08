/**
 * Selection Sort Algorithm
 * @param {number[]} arr - Array a ordenar
 * @param {string} order - 'asc' para ascendente, 'desc' para descendente
 * @returns {object} Objeto con array ordenado, pasos y estadísticas
 */
export function selectionSort(arr, order = 'asc') {
  const array = [...arr];
  let min;
  let temp;
  let comparisons = 0;
  let swaps = 0;
  const steps = [];

  // Registrar estado inicial
  steps.push({
    array: [...array],
    comparisons,
    swaps,
    currentIndex: -1,
    minIndex: -1,
    compareIndex: -1,
    sortedUntil: 0,
    message: 'Inicio del algoritmo Selection Sort',
  });

  // Recorre el arreglo desde 0 hasta n-1
  for (let i = 0; i < array.length - 1; i++) {
    min = i;

    // Busca el elemento mínimo en el resto del arreglo
    for (let j = i + 1; j < array.length; j++) {
      comparisons++;

      if (order === 'asc' ? array[j] < array[min] : array[j] > array[min]) {
        min = j;
      }

      steps.push({
        array: [...array],
        comparisons,
        swaps,
        currentIndex: i,
        minIndex: min,
        compareIndex: j,
        sortedUntil: i,
        message: `Buscando mínimo: Comparando array[${j}]=${array[j]} con array[${min}]=${array[min]}`,
      });
    }

    // Intercambiamos el siguiente elemento a ordenar
    if (min !== i) {
      temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      swaps++;

      steps.push({
        array: [...array],
        comparisons,
        swaps,
        currentIndex: i,
        minIndex: min,
        compareIndex: -1,
        sortedUntil: i + 1,
        message: `✓ Intercambiando array[${i}]=${temp} con array[${min}]=${array[min]} - Posición ${i + 1} ordenada`,
      });
    } else {
      steps.push({
        array: [...array],
        comparisons,
        swaps,
        currentIndex: -1,
        minIndex: -1,
        compareIndex: -1,
        sortedUntil: i + 1,
        message: `✓ Elemento array[${i}]=${array[i]} ya está en su posición correcta`,
      });
    }
  }

  steps.push({
    array: [...array],
    comparisons,
    swaps,
    currentIndex: -1,
    minIndex: -1,
    compareIndex: -1,
    sortedUntil: array.length,
    message: '✅ ¡Ordenamiento completado! El array está completamente ordenado.',
  });

  return {
    array,
    comparisons,
    swaps,
    steps,
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      stable: false,
    },
  };
}

/**
 * Selection Sort versión simple sin pasos
 * @param {number[]} arr - Array a ordenar
 * @returns {number[]} Array ordenado
 */
export function selectionSortSimple(arr) {
  const array = [...arr];
  let min;
  let temp;

  for (let i = 0; i < array.length - 1; i++) {
    min = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }

    if (min !== i) {
      temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
  }

  return array;
}

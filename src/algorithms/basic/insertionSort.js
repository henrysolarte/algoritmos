/**
 * Insertion Sort Algorithm
 * @param {number[]} arr - Array a ordenar
 * @param {string} order - 'asc' para ascendente, 'desc' para descendente
 * @returns {object} Objeto con array ordenado, pasos y estadísticas
 */
export function insertionSort(arr, order = 'asc') {
  const array = [...arr];
  let pos;
  let valor;
  let comparisons = 0;
  let swaps = 0;
  const steps = [];

  // Registrar estado inicial
  steps.push({
    array: [...array],
    comparisons,
    swaps,
    currentIndex: -1,
    compareIndex: -1,
    insertIndex: -1,
    sortedUntil: 0,
    message: 'Inicio del algoritmo Insertion Sort',
  });

  // Recorre el arreglo desde 0 hasta length
  for (let i = 0; i < array.length; i++) {
    pos = i;
    valor = array[i];

    steps.push({
      array: [...array],
      comparisons,
      swaps,
      currentIndex: i,
      compareIndex: -1,
      insertIndex: -1,
      sortedUntil: i,
      message: `Iniciando inserción del elemento array[${i}]=${valor}`,
    });

    // Busca la posición correcta para insertar
    while (pos > 0 && (order === 'asc' ? valor < array[pos - 1] : valor > array[pos - 1])) {
      comparisons++;

      steps.push({
        array: [...array],
        comparisons,
        swaps,
        currentIndex: pos - 1,
        compareIndex: pos,
        insertIndex: i,
        sortedUntil: i,
        message: `Comparando array[${pos}]=${valor} con array[${pos - 1}]=${array[pos - 1]}`,
      });

      // Desplazamos el elemento hacia la derecha
      array[pos] = array[pos - 1];
      swaps++;

      steps.push({
        array: [...array],
        comparisons,
        swaps,
        currentIndex: pos - 1,
        compareIndex: -1,
        insertIndex: pos,
        sortedUntil: i,
        message: `Desplazando array[${pos - 1}] → array[${pos}]`,
      });

      pos = pos - 1;
    }

    // Insertamos el valor en la posición indicada
    array[pos] = valor;

    steps.push({
      array: [...array],
      comparisons,
      swaps,
      currentIndex: -1,
      compareIndex: -1,
      insertIndex: pos,
      sortedUntil: i + 1,
      message: `✓ Elemento ${valor} insertado en posición ${pos}`,
    });
  }

  steps.push({
    array: [...array],
    comparisons,
    swaps,
    currentIndex: -1,
    compareIndex: -1,
    insertIndex: -1,
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
      stable: true,
    },
  };
}

/**
 * Insertion Sort versión simple sin pasos
 * @param {number[]} arr - Array a ordenar
 * @returns {number[]} Array ordenado
 */
export function insertionSortSimple(arr) {
  const array = [...arr];
  let pos;
  let valor;

  for (let i = 0; i < array.length; i++) {
    pos = i;
    valor = array[i];

    while (pos > 0 && valor < array[pos - 1]) {
      array[pos] = array[pos - 1];
      pos = pos - 1;
    }

    array[pos] = valor;
  }

  return array;
}

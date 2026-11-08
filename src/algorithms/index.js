// Ejemplo template para implementar algoritmos de sorting
// Esta es una plantilla que puedes usar para cada algoritmo

/**
 * Template de función de sorting
 * @param {number[]} arr - Array a ordenar
 * @param {string} order - 'asc' para ascendente, 'desc' para descendente
 * @returns {object} Objeto con array ordenado y estadísticas
 */
export function templateSort(arr, order = 'asc') {
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const steps = [];

  // TODO: Implementar lógica del algoritmo
  // Registrar cada paso para visualización
  // steps.push({ array: [...array], comparisons, swaps });

  return {
    array,
    comparisons,
    swaps,
    steps,
  };
}

/**
 * Función para ejecutar sorting con animación
 * @param {number[]} arr - Array a ordenar
 * @param {string} algorithmName - Nombre del algoritmo
 * @param {function} callback - Callback para cada paso
 */
export async function animatedSort(arr, algorithmName, callback) {
  const sortFn = getSortFunction(algorithmName);
  const result = sortFn(arr);

  for (const step of result.steps) {
    callback(step);
    await new Promise(resolve => setTimeout(resolve, 50)); // Delay para animación
  }

  return result;
}

/**
 * Obtener función de sorting por nombre
 */
function getSortFunction(name) {
  const algorithms = {
    // basic
    'bubbleSort': require('./basic/bubbleSort').bubbleSort,
    'selectionSort': require('./basic/selectionSort').selectionSort,
    'insertionSort': require('./basic/insertionSort').insertionSort,
    // advanced
    'quickSort': require('./advanced/quickSort').quickSort,
    'mergeSort': require('./advanced/mergeSort').mergeSort,
    'heapSort': require('./advanced/heapSort').heapSort,
  };

  return algorithms[name] || null;
}

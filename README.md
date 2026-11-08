# Algoritmos de Sorting - React + Vite

Proyecto educativo para implementar y visualizar algoritmos de ordenamiento usando React, Vite y JavaScript moderno.

## 📁 Estructura del Proyecto

```
algoritmosSORT/
├── src/                          # Código fuente principal
│   ├── components/               # Componentes React reutilizables
│   │   ├── sorting/              # Componentes específicos para visualización de algoritmos
│   │   └── ui/                   # Componentes UI genéricos (botones, inputs, etc)
│   ├── algorithms/               # Implementación de algoritmos de sorting
│   │   ├── basic/                # Algoritmos básicos (Bubble, Selection, Insertion)
│   │   └── advanced/             # Algoritmos avanzados (Quick, Merge, Heap)
│   ├── hooks/                    # Custom React hooks (useSort, useSortVisualization, etc)
│   ├── utils/                    # Funciones utilitarias y helpers
│   ├── styles/                   # Estilos CSS globales
│   ├── pages/                    # Páginas/vistas principales
│   ├── assets/                   # Recursos estáticos
│   │   ├── images/               # Imágenes
│   │   └── icons/                # Iconos SVG
│   ├── App.jsx                   # Componente raíz
│   ├── main.jsx                  # Punto de entrada
│   └── App.css                   # Estilos principales
├── public/                       # Archivos públicos estáticos
├── tests/                        # Pruebas unitarias e integración
│   ├── unit/                     # Tests unitarios
│   └── algorithms/               # Tests de algoritmos
├── docs/                         # Documentación del proyecto
├── index.html                    # HTML principal
├── vite.config.js                # Configuración de Vite
├── package.json                  # Dependencias y scripts
└── README.md                     # Este archivo
```

## 🚀 Guía de Carpetas

### `src/components/sorting/`
Componentes React para visualizar y controlar la ejecución de algoritmos:
- `SortVisualizer.jsx` - Visualizador principal de arrays
- `ControlPanel.jsx` - Panel de control (play, pause, reset)
- `AlgorithmSelector.jsx` - Selector de algoritmos
- `SpeedControl.jsx` - Control de velocidad de animación
- `StatsDisplay.jsx` - Muestra estadísticas (comparaciones, swaps)

### `src/components/ui/`
Componentes UI reutilizables:
- `Button.jsx`
- `Card.jsx`
- `Select.jsx`
- `Slider.jsx`

### `src/algorithms/basic/`
Algoritmos de ordenamiento básicos:
- `bubbleSort.js` - Bubble Sort O(n²)
- `selectionSort.js` - Selection Sort O(n²)
- `insertionSort.js` - Insertion Sort O(n²)

### `src/algorithms/advanced/`
Algoritmos de ordenamiento avanzados:
- `quickSort.js` - Quick Sort O(n log n)
- `mergeSort.js` - Merge Sort O(n log n)
- `heapSort.js` - Heap Sort O(n log n)
- `shellSort.js` - Shell Sort
- `countingSort.js` - Counting Sort

### `src/hooks/`
Custom React hooks:
- `useSort.js` - Hook para manejar lógica de sorting
- `useSortVisualization.js` - Hook para animación y visualización
- `useAnimationFrame.js` - Hook para control de animaciones

### `src/utils/`
Funciones utilitarias:
- `arrayUtils.js` - Generador de arrays, shuffle, etc
- `sortingStats.js` - Cálculo de estadísticas
- `colorMapper.js` - Mapeo de colores para visualización
- `validators.js` - Validación de datos

### `tests/`
Suites de testing:
- Tests unitarios para cada algoritmo
- Tests de integración para componentes
- Benchmarks de rendimiento

## 📦 Instalación

```bash
npm install
```

## 🏃 Comandos

```bash
# Desarrollo
npm run dev

# Producción
npm run build

# Vista previa
npm run preview

# Tests
npm run test

# Tests con UI
npm run test:ui
```

## 🎯 Próximas Tareas

1. **Algoritmos Básicos**: Implementar Bubble, Selection e Insertion Sort
2. **Algoritmos Avanzados**: Implementar Quick, Merge y Heap Sort
3. **Visualizador**: Crear componentes React para visualizar el proceso
4. **Animaciones**: Agregar animaciones suaves con CSS/Framer Motion
5. **Estadísticas**: Mostrar comparaciones, swaps y tiempo de ejecución
6. **Tests**: Suite completa de pruebas unitarias
7. **Documentación**: Explicar cada algoritmo visualmente

## 📚 Recursos Útiles

- [Big O Notation](https://www.bigocheatsheet.com/)
- [Sorting Algorithms Visualized](https://www.sortvisualizer.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

**Autor**: Tu nombre  
**Año**: 2026  
**Licencia**: MIT

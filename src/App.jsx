import { useState } from 'react'
import { SelectionSortPage } from './pages/SelectionSortPage'
import { InsertionSortPage } from './pages/InsertionSortPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const algorithms = [
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      description: 'Ordenamiento por Selección',
      complexity: 'O(n²)',
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      description: 'Ordenamiento por Inserción',
      complexity: 'O(n²)',
    },
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      description: 'Ordenamiento de Burbuja',
      complexity: 'O(n²)',
      disabled: true,
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      description: 'Ordenamiento Rápido',
      complexity: 'O(n log n)',
      disabled: true,
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      description: 'Ordenamiento por Mezcla',
      complexity: 'O(n log n)',
      disabled: true,
    },
    {
      id: 'heap-sort',
      name: 'Heap Sort',
      description: 'Ordenamiento por Montículo',
      complexity: 'O(n log n)',
      disabled: true,
    },
  ]

  if (currentPage === 'selection-sort') {
    return (
      <div className="app">
        <header className="header-with-back">
          <button className="back-btn" onClick={() => setCurrentPage('home')}>
            ← Volver al Menú
          </button>
          <h1>Algoritmos de Sorting</h1>
        </header>
        <SelectionSortPage />
      </div>
    )
  }

  if (currentPage === 'insertion-sort') {
    return (
      <div className="app">
        <header className="header-with-back">
          <button className="back-btn" onClick={() => setCurrentPage('home')}>
            ← Volver al Menú
          </button>
          <h1>Algoritmos de Sorting</h1>
        </header>
        <InsertionSortPage />
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <h1>🔢 Algoritmos de Sorting</h1>
        <p className="subtitle">Aprende visualizando algoritmos de ordenamiento</p>
      </header>

      <main>
        <div className="algorithms-grid">
          {algorithms.map(algo => (
            <div
              key={algo.id}
              className={`algorithm-card ${algo.disabled ? 'disabled' : ''}`}
              onClick={() => !algo.disabled && setCurrentPage(algo.id)}
            >
              <div className="card-header">
                <h3>{algo.name}</h3>
                {algo.disabled && <span className="coming-soon">Próximamente</span>}
              </div>
              <p className="description">{algo.description}</p>
              <div className="complexity-badge">{algo.complexity}</div>
              {!algo.disabled && (
                <button className="card-btn">Explorar →</button>
              )}
            </div>
          ))}
        </div>

        <section className="info-section">
          <h2>📚 ¿Qué son los Algoritmos de Sorting?</h2>
          <p>
            Los algoritmos de ordenamiento son procedimientos que reorganizan los elementos
            de una colección (como un array) de acuerdo con un criterio específico, generalmente
            en orden ascendente o descendente. Son fundamentales en la informática y tienen
            aplicaciones en bases de datos, búsqueda y procesamiento de datos.
          </p>

          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h4>Eficiente</h4>
              <p>Aprende sobre la complejidad temporal y espacial de cada algoritmo</p>
            </div>
            <div className="feature">
              <span className="feature-icon">👁️</span>
              <h4>Visual</h4>
              <p>Visualiza cómo cada algoritmo ordena los elementos paso a paso</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <h4>Estadísticas</h4>
              <p>Observa comparaciones, intercambios y métricas de rendimiento</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎮</span>
              <h4>Interactivo</h4>
              <p>Controla la velocidad, pausa y experimenta con diferentes arrays</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Algoritmos de Sorting • Proyecto Educativo</p>
      </footer>
    </div>
  )
}

export default App

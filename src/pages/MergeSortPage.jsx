import { useState, useEffect } from 'react';
import { mergeSort } from '../algorithms/basic/mergeSort';
import '../components/styles/SortPage.css';

export function MergeSortPage() {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [sortResult, setSortResult] = useState(null);
  const [arraySize, setArraySize] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [selectedSize, setSelectedSize] = useState(20);

  // Generar array aleatorio al seleccionar tamaño
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    setArraySize(size);
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setSortResult(null);
    setShowModal(false);
  };

  // Generar array aleatorio
  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setSortResult(null);
  };

  // Ejecutar algoritmo
  const handleSort = () => {
    const result = mergeSort([...array]);
    setSortResult(result);
    setSteps(result.steps);
    setCurrentStep(0);
  };

  // Animar los pasos
  useEffect(() => {
    if (!isRunning || currentStep >= steps.length) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1001 - speed);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep, steps, speed]);

  // Determinar si el algoritmo ha terminado
  const isAlgorithmComplete = steps.length > 0 && currentStep >= steps.length;

  const handlePlayPause = () => {
    if (steps.length === 0) {
      handleSort();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
  };

  // Si el algoritmo está completo, mostrar estado final con todo ordenado
  let currentData;
  if (isAlgorithmComplete && sortResult) {
    currentData = {
      array: sortResult.array,
      comparisons: sortResult.comparisons,
      merges: sortResult.merges,
      sortedUntil: array.length,
      currentIndex: -1,
      compareIndex: -1,
      mergeRange: { start: -1, end: -1 },
      message: '✅ ¡Algoritmo completado! Array ordenado correctamente.'
    };
  } else {
    currentData = steps[currentStep] || { 
      array, 
      comparisons: 0, 
      merges: 0, 
      currentIndex: -1, 
      compareIndex: -1, 
      mergeRange: { start: -1, end: -1 },
      message: '' 
    };
  }
  const maxValue = Math.max(...array, 1);

  // Modal de selección de tamaño
  if (showModal) {
    return (
      <div className="sort-page">
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🎲 Selecciona la cantidad de números</h2>
            <p>¿Cuántos números aleatorios quieres ordenar?</p>
            
            <div className="size-grid">
              {[5, 10, 15, 20, 25, 30].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            
            <div className="custom-input-group">
              <label>O ingresa un número personalizado:</label>
              <input
                type="number"
                min="1"
                max="100"
                value={selectedSize}
                onChange={(e) => setSelectedSize(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              />
              <button 
                className="btn btn-success"
                onClick={() => handleSizeSelection(selectedSize)}
              >
                Continuar con {selectedSize} números
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sort-page">
      <div className="sort-container">
        <h2>Merge Sort - Ordenamiento por Fusión</h2>

        {/* Panel de Control */}
        <div className="control-panel">
          <div className="control-group">
            <label>Tamaño del Array: {arraySize} números</label>
            <button
              onClick={() => {
                setShowModal(true);
                setSteps([]);
                setCurrentStep(0);
                setIsRunning(false);
              }}
              className="btn btn-secondary"
            >
              Cambiar cantidad
            </button>
          </div>

          <div className="control-group">
            <label>Velocidad de Animación:</label>
            <input
              type="range"
              min="50"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <span>{speed}ms</span>
          </div>

          <div className="button-group">
            <button
              onClick={generateRandomArray}
              disabled={isRunning}
              className="btn btn-secondary"
            >
              🔄 Nuevo Array Aleatorio
            </button>
            <button
              onClick={handlePlayPause}
              className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
            >
              {isRunning ? '⏸ Pausa' : '▶ Ejecutar'}
            </button>
            <button
              onClick={handleReset}
              disabled={!isRunning}
              className="btn btn-warning"
            >
              🔄 Resetear
            </button>
          </div>
        </div>

        {/* Visualizador */}
        <div className="visualizer">
          <div className="array-visualization">
            {currentData.array.map((value, idx) => {
              let barColor = '#667eea'; // Color default (púrpura)
              let textColor = 'white'; // Color default del texto
              
              // Elementos ya ordenados (azul oscuro)
              if (idx < currentData.sortedUntil) {
                barColor = '#0ea5e9';
                textColor = 'white';
              }
              // Rango siendo fusionado (NARANJA)
              else if (currentData.mergeRange && idx >= currentData.mergeRange.start && idx <= currentData.mergeRange.end && currentData.mergeRange.start !== -1) {
                barColor = '#f97316';
                textColor = '#ffffff';
              }
              // Elemento actual siendo escrito (VERDE BRILLANTE)
              else if (idx === currentData.currentIndex) {
                barColor = '#22c55e';
                textColor = '#ffffff';
              }
              // Elemento siendo comparado (AMARILLO BRILLANTE)
              else if (idx === currentData.compareIndex) {
                barColor = '#eab308';
                textColor = '#000000';
              }
              
              return (
                <div
                  key={idx}
                  className="bar"
                  style={{
                    height: `${(value / maxValue) * 300}px`,
                    backgroundColor: barColor,
                    transition: 'all 0.2s ease',
                    boxShadow: (idx === currentData.currentIndex || idx === currentData.compareIndex || (currentData.mergeRange && idx >= currentData.mergeRange.start && idx <= currentData.mergeRange.end && currentData.mergeRange.start !== -1)) 
                      ? `0 0 15px ${barColor}` 
                      : 'none',
                  }}
                >
                  <span className="bar-value" style={{color: textColor}}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="stats-panel">
          <div className="stat">
            <label>Comparaciones:</label>
            <span>{currentData.comparisons}</span>
          </div>
          <div className="stat">
            <label>Fusiones:</label>
            <span>{currentData.merges}</span>
          </div>
          <div className="stat">
            <label>Paso:</label>
            <span>
              {currentStep} / {steps.length}
            </span>
          </div>
          {sortResult && (
            <div className="stat">
              <label>Complejidad:</label>
              <span>{sortResult.complexity.time}</span>
            </div>
          )}
        </div>

        {/* Mensaje */}
        <div className="message-panel">
          <p>{currentData.message}</p>
        </div>

        {/* Información del Algoritmo */}
        <div className="algorithm-info">
          <h3>📚 Información del Algoritmo</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>Complejidad Temporal</h4>
              <p className="complexity-time">O(n log n)</p>
              <small>Mejor, Promedio y Peor caso</small>
            </div>
            <div className="info-card">
              <h4>Complejidad Espacial</h4>
              <p className="complexity-space">O(n)</p>
              <small>Requiere espacio adicional</small>
            </div>
            <div className="info-card">
              <h4>Estable</h4>
              <p className="stability">Sí</p>
              <small>Mantiene orden de iguales</small>
            </div>
            <div className="info-card">
              <h4>En-lugar</h4>
              <p className="in-place">No</p>
              <small>Requiere espacio adicional</small>
            </div>
          </div>

          <h4>¿Cómo funciona?</h4>
          <ol className="algorithm-steps">
            <li>Divide el array en dos mitades recursivamente</li>
            <li>Continúa dividiendo hasta que cada subarray tenga un elemento</li>
            <li>Fusiona los subarrays ordenando mientras combina</li>
            <li>Repite hasta tener un array completamente ordenado</li>
          </ol>

          <h4>Ventajas</h4>
          <ul>
            <li>✓ O(n log n) en todos los casos (mejor, promedio, peor)</li>
            <li>✓ Es estable (mantiene orden de elementos iguales)</li>
            <li>✓ Excelente para datos grandes</li>
            <li>✓ Predecible en rendimiento</li>
          </ul>

          <h4>Desventajas</h4>
          <ul>
            <li>✗ Requiere O(n) espacio adicional</li>
            <li>✗ No es ordenamiento en-lugar</li>
            <li>✗ Más lento que Quick Sort para datos pequeños</li>
          </ul>

          <h4>Casos de Uso</h4>
          <ul>
            <li>→ Datos muy grandes donde O(n log n) garantizado es crítico</li>
            <li>→ Listas vinculadas (mejor que Quick Sort)</li>
            <li>→ Cuando se requiere estabilidad</li>
            <li>→ Ordenamiento externo (archivos grandes en disco)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

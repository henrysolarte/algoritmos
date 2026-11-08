import { useState, useEffect } from 'react';
import { selectionSort } from '../algorithms/basic/selectionSort';
import '../components/styles/SortPage.css';

export function SelectionSortPage() {
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
    const result = selectionSort([...array]);
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
      swaps: sortResult.swaps,
      sortedUntil: array.length,
      currentIndex: -1,
      minIndex: -1,
      compareIndex: -1,
      message: '✅ ¡Algoritmo completado! Array ordenado correctamente.'
    };
  } else {
    currentData = steps[currentStep] || { array, comparisons: 0, swaps: 0, currentIndex: -1, minIndex: -1, message: '' };
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
        <h2>Selection Sort - Ordenamiento por Selección</h2>

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
              // Elemento actual siendo procesado (VERDE BRILLANTE) - Primera prioridad visual
              else if (idx === currentData.currentIndex) {
                barColor = '#22c55e';
                textColor = '#ffffff';
              }
              // Elemento que se está comparando (AMARILLO BRILLANTE)
              else if (idx === currentData.compareIndex) {
                barColor = '#eab308';
                textColor = '#000000';
              }
              // Elemento mínimo encontrado (NARANJA)
              else if (idx === currentData.minIndex) {
                barColor = '#f97316';
                textColor = '#ffffff';
              }
              
              return (
                <div
                  key={idx}
                  className="bar"
                  style={{
                    height: `${(value / maxValue) * 300}px`,
                    backgroundColor: barColor,
                    transition: 'all 0.2s ease',
                    boxShadow: (idx === currentData.currentIndex || idx === currentData.compareIndex || idx === currentData.minIndex) 
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
            <label>Intercambios:</label>
            <span>{currentData.swaps}</span>
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
              <p className="complexity-time">O(n²)</p>
              <small>Peor, Promedio y Mejor caso</small>
            </div>
            <div className="info-card">
              <h4>Complejidad Espacial</h4>
              <p className="complexity-space">O(1)</p>
              <small>Ordenamiento en-lugar</small>
            </div>
            <div className="info-card">
              <h4>Estable</h4>
              <p className="stability">No</p>
              <small>Puede alterar el orden de iguales</small>
            </div>
            <div className="info-card">
              <h4>En-lugar</h4>
              <p className="in-place">Sí</p>
              <small>No requiere espacio adicional</small>
            </div>
          </div>

          <h4>¿Cómo funciona?</h4>
          <ol className="algorithm-steps">
            <li>Divide el array en dos partes: ordenada e sin ordenar</li>
            <li>Encuentra el elemento mínimo en la parte sin ordenar</li>
            <li>Intercambia el mínimo con el primer elemento sin ordenar</li>
            <li>Repite hasta que todo esté ordenado</li>
          </ol>

          <h4>Ventajas</h4>
          <ul>
            <li>✓ Muy simple de entender e implementar</li>
            <li>✓ No requiere espacio adicional</li>
            <li>✓ Buen desempeño con arrays pequeños</li>
          </ul>

          <h4>Desventajas</h4>
          <ul>
            <li>✗ O(n²) lo hace lento para arrays grandes</li>
            <li>✗ No es estable</li>
            <li>✗ Realiza muchas comparaciones innecesarias</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

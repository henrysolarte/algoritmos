import { useState, useEffect } from 'react';
import { insertionSort } from '../algorithms/basic/insertionSort';
import '../components/styles/SortPage.css';

export function InsertionSortPage() {
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
    const result = insertionSort([...array]);
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

  const currentData = steps[currentStep] || { array, comparisons: 0, swaps: 0, currentIndex: -1, compareIndex: -1, insertIndex: -1, message: '' };
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
              {[5, 10, 15, 20, 30, 50, 75, 100].map(size => (
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
        <h2>Insertion Sort - Ordenamiento por Inserción</h2>

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

        {/* Leyenda de Colores */}
        <div className="color-legend">
          <h4>Leyenda de Colores - Sigue el Algoritmo:</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#22c55e'}}></div>
              <span>🟢 Verde Brillante = Elemento siendo insertado</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#eab308'}}></div>
              <span>🟨 Amarillo = Elemento que se está comparando</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#f97316'}}></div>
              <span>🟠 Naranja = Posición donde se insertará</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#0ea5e9'}}></div>
              <span>🔵 Azul Claro = Elementos ya ordenados</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#667eea'}}></div>
              <span>🟣 Púrpura = Elementos sin procesar</span>
            </div>
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
              // Elemento siendo insertado (VERDE BRILLANTE)
              else if (idx === currentData.currentIndex) {
                barColor = '#22c55e';
                textColor = '#ffffff';
              }
              // Elemento que se está comparando (AMARILLO BRILLANTE)
              else if (idx === currentData.compareIndex) {
                barColor = '#eab308';
                textColor = '#000000';
              }
              // Posición de inserción (NARANJA)
              else if (idx === currentData.insertIndex) {
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
                    boxShadow: (idx === currentData.currentIndex || idx === currentData.compareIndex || idx === currentData.insertIndex) 
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
            <label>Desplazamientos:</label>
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
              <small>Peor y Promedio caso</small>
            </div>
            <div className="info-card">
              <h4>Mejor Caso</h4>
              <p className="complexity-space">O(n)</p>
              <small>Array ya ordenado</small>
            </div>
            <div className="info-card">
              <h4>Estable</h4>
              <p className="stability">Sí</p>
              <small>Mantiene orden de iguales</small>
            </div>
            <div className="info-card">
              <h4>En-lugar</h4>
              <p className="in-place">Sí</p>
              <small>No requiere espacio adicional</small>
            </div>
          </div>

          <h4>¿Cómo funciona?</h4>
          <ol className="algorithm-steps">
            <li>Comienza desde el segundo elemento (índice 1)</li>
            <li>Compara el elemento actual con los anteriores</li>
            <li>Desplaza elementos a la derecha si son mayores</li>
            <li>Inserta el elemento en su posición correcta</li>
            <li>Repite hasta recorrer todo el array</li>
          </ol>

          <h4>Ventajas</h4>
          <ul>
            <li>✓ Muy simple de entender e implementar</li>
            <li>✓ Eficiente para arrays pequeños</li>
            <li>✓ Eficiente para arrays casi ordenados</li>
            <li>✓ Estable: mantiene el orden de elementos iguales</li>
            <li>✓ En-lugar: usa poco espacio adicional</li>
          </ul>

          <h4>Desventajas</h4>
          <ul>
            <li>✗ O(n²) lo hace lento para arrays grandes</li>
            <li>✗ Muchos desplazamientos en el peor caso</li>
          </ul>

          <h4>Casos de Uso</h4>
          <ul>
            <li>✓ Ordenar arrays pequeños</li>
            <li>✓ Ordenar datos casi ordenados</li>
            <li>✓ Cuando se requiere estabilidad</li>
            <li>✓ Algoritmo híbrido (Timsort usa Insertion Sort)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

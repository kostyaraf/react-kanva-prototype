import React, { useState, useCallback, useEffect } from 'react';
import ProcessCanvas from './components/ProcessCanvas';
import CardPalette from './components/CardPalette';
import ControlPanel from './components/ControlPanel';
import ConnectionCreator from './components/ConnectionCreator';
import { ProcessCard, Connection, CARD_TEMPLATES } from './types';
import { initialCards, initialConnections } from './data/initialData';
import { saveStateToCookie, loadStateFromCookie, clearSavedState } from './utils/cookies';
import './App.css';

// Main application component with state management
const App: React.FC = () => {
  const [cards, setCards] = useState<ProcessCard[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<'current' | 'target'>('current');
  const [history, setHistory] = useState<Array<{ cards: ProcessCard[]; connections: Connection[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showConnectionCreator, setShowConnectionCreator] = useState(false);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Save state to history and cookies
  const saveToHistory = useCallback((newCards: ProcessCard[], newConnections: Connection[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ cards: [...newCards], connections: [...newConnections] });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Save to cookies
    saveStateToCookie({
      cards: newCards,
      connections: newConnections,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      timestamp: Date.now()
    });
  }, [history, historyIndex]);

  // Add new card from template
  const handleAddCard = useCallback((template: typeof CARD_TEMPLATES[0]) => {
    // Find the next available grid position
    const gridSize = 220; // 200 (large cell) + 20 (small cell)
    const usedPositions = cards.map(card => `${card.x},${card.y}`);
    
    let newX = 0;
    let newY = 0;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
      const testX = Math.floor(Math.random() * 10) * gridSize;
      const testY = Math.floor(Math.random() * 10) * gridSize;
      
      if (!usedPositions.includes(`${testX},${testY}`)) {
        newX = testX;
        newY = testY;
        break;
      }
      attempts++;
    }

    const newCard: ProcessCard = {
      ...template,
      id: generateId(),
      x: newX,
      y: newY
    };

    const newCards = [...cards, newCard];
    setCards(newCards);
    saveToHistory(newCards, connections);
  }, [cards, connections, saveToHistory]);

  // Handle card selection
  const handleCardSelect = useCallback((id: string) => {
    setSelectedCardId(id);
    setSelectedConnectionId(null);
  }, []);

  // Handle card drag end
  const handleCardDragEnd = useCallback((id: string, x: number, y: number) => {
    const newCards = cards.map(card =>
      card.id === id ? { ...card, x, y } : card
    );
    setCards(newCards);
    saveToHistory(newCards, connections);
  }, [cards, connections, saveToHistory]);

  // Handle card deletion
  const handleCardDelete = useCallback((id: string) => {
    const newCards = cards.filter(card => card.id !== id);
    const newConnections = connections.filter(
      conn => conn.fromCardId !== id && conn.toCardId !== id
    );
    setCards(newCards);
    setConnections(newConnections);
    setSelectedCardId(null);
    saveToHistory(newCards, newConnections);
  }, [cards, connections, saveToHistory]);

  // Handle connection selection
  const handleConnectionSelect = useCallback((id: string) => {
    setSelectedConnectionId(id);
    setSelectedCardId(null);
  }, []);

  // Handle connection deletion
  const handleConnectionDelete = useCallback((id: string) => {
    const newConnections = connections.filter(conn => conn.id !== id);
    setConnections(newConnections);
    setSelectedConnectionId(null);
    saveToHistory(cards, newConnections);
  }, [cards, connections, saveToHistory]);

  // Handle connection creation
  const handleCreateConnection = useCallback((connection: Connection) => {
    const newConnections = [...connections, connection];
    setConnections(newConnections);
    setShowConnectionCreator(false);
    saveToHistory(cards, newConnections);
  }, [cards, connections, saveToHistory]);

  // Handle canvas click to deselect
  const handleCanvasClick = useCallback(() => {
    setSelectedCardId(null);
    setSelectedConnectionId(null);
  }, []);

  // Handle state change
  const handleStateChange = useCallback((state: 'current' | 'target') => {
    setCurrentState(state);
  }, []);

  // Undo functionality
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setCards([...state.cards]);
      setConnections([...state.connections]);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  // Redo functionality
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setCards([...state.cards]);
      setConnections([...state.connections]);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    // Zoom functionality will be handled by the canvas component
    console.log('Zoom in');
  }, []);

  const handleZoomOut = useCallback(() => {
    // Zoom functionality will be handled by the canvas component
    console.log('Zoom out');
  }, []);

  const handleFitToScreen = useCallback(() => {
    // Calculate the bounds of all cards
    if (cards.length === 0) return;
    
    const minX = Math.min(...cards.map(card => card.x));
    const maxX = Math.max(...cards.map(card => card.x + card.width));
    const minY = Math.min(...cards.map(card => card.y));
    const maxY = Math.max(...cards.map(card => card.y + card.height));
    
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    
    // Add padding
    const padding = 100;
    const canvasWidth = window.innerWidth - 400;
    const canvasHeight = window.innerHeight - 200;
    
    const scaleX = (canvasWidth - padding) / contentWidth;
    const scaleY = (canvasHeight - padding) / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Don't zoom in more than 100%
    
    // Center the content
    const centerX = (canvasWidth - contentWidth * scale) / 2 - minX * scale;
    const centerY = (canvasHeight - contentHeight * scale) / 2 - minY * scale;
    
    // This would need to be implemented in the canvas component
    console.log('Fit to screen', { scale, centerX, centerY });
  }, [cards]);

  // Clear all
  const handleClearAll = useCallback(() => {
    setCards([]);
    setConnections([]);
    setSelectedCardId(null);
    setSelectedConnectionId(null);
    saveToHistory([], []);
  }, [saveToHistory]);

  // Load demo data
  const handleLoadDemo = useCallback(() => {
    setCards([...initialCards]);
    setConnections([...initialConnections]);
    setSelectedCardId(null);
    setSelectedConnectionId(null);
    saveToHistory([...initialCards], [...initialConnections]);
  }, [saveToHistory]);

  // Handle card insertion in chain
  const handleCardInsert = useCallback((insertIndex: number) => {
    // This will be called when a card is dropped at a specific position
    // For now, we'll just log the insertion point
    console.log('Card inserted at position:', insertIndex);
  }, []);

  // Load saved state from cookies on component mount
  useEffect(() => {
    const savedState = loadStateFromCookie();
    if (savedState) {
      setCards(savedState.cards);
      setConnections(savedState.connections);
      setHistory(savedState.history);
      setHistoryIndex(savedState.historyIndex);
      console.log('Application state restored from cookies');
    } else {
      console.log('No saved state found, starting with empty state');
    }
  }, []);

  // Clear saved state
  const handleClearSavedState = useCallback(() => {
    clearSavedState();
    setCards([]);
    setConnections([]);
    setHistory([]);
    setHistoryIndex(-1);
    setSelectedCardId(null);
    setSelectedConnectionId(null);
    console.log('Saved state cleared');
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <div className="header" style={{
        backgroundColor: '#343a40',
        color: '#ffffff',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Process Flow Designer</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px' }}>State: {currentState}</span>
          <span style={{ fontSize: '14px' }}>Cards: {cards.length}</span>
          <span style={{ fontSize: '14px' }}>Connections: {connections.length}</span>
          <span style={{ fontSize: '12px', color: '#28a745' }} title="State is automatically saved to cookies">
            💾 Auto-saved
          </span>
          <button
            onClick={() => setShowConnectionCreator(true)}
            disabled={cards.length < 2}
            style={{
              padding: '8px 16px',
              border: '1px solid #28a745',
              borderRadius: '4px',
              backgroundColor: '#28a745',
              color: '#ffffff',
              cursor: cards.length >= 2 ? 'pointer' : 'not-allowed',
              fontSize: '12px',
              opacity: cards.length >= 2 ? 1 : 0.6
            }}
          >
            🔗 Add Connection
          </button>
          <button
            onClick={handleLoadDemo}
            style={{
              padding: '8px 16px',
              border: '1px solid #17a2b8',
              borderRadius: '4px',
              backgroundColor: '#17a2b8',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            📋 Load Demo
          </button>
          <button
            onClick={handleClearSavedState}
            style={{
              padding: '8px 16px',
              border: '1px solid #dc3545',
              borderRadius: '4px',
              backgroundColor: '#dc3545',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            title="Clear saved state from cookies"
          >
            🗑️ Clear Saved
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content" style={{
        display: 'flex',
        height: 'calc(100vh - 140px)',
        overflow: 'hidden'
      }}>
        {/* Card palette */}
        <div className="sidebar" style={{
          width: '350px',
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid #dee2e6',
          overflowY: 'auto',
          padding: '20px'
        }}>
          <CardPalette onAddCard={handleAddCard} />
        </div>

        {/* Canvas area */}
        <div className="canvas-area" style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <ProcessCanvas
            cards={cards}
            connections={connections}
            selectedCardId={selectedCardId}
            selectedConnectionId={selectedConnectionId}
            onCardSelect={handleCardSelect}
            onCardDragEnd={handleCardDragEnd}
            onCardDelete={handleCardDelete}
            onConnectionSelect={handleConnectionSelect}
            onConnectionDelete={handleConnectionDelete}
            onCanvasClick={handleCanvasClick}
            onCardInsert={handleCardInsert}
          />
        </div>
      </div>

      {/* Control panel */}
      <ControlPanel
        currentState={currentState}
        onStateChange={handleStateChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitToScreen={handleFitToScreen}
        onClearAll={handleClearAll}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />

      {/* Connection creator modal */}
      {showConnectionCreator && (
        <ConnectionCreator
          cards={cards}
          onCreateConnection={handleCreateConnection}
          onCancel={() => setShowConnectionCreator(false)}
        />
      )}
    </div>
  );
};

export default App;

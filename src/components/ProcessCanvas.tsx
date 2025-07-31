import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';
import ProcessCardComponent from './ProcessCard';
import ConnectionComponent from './Connection';
import { ProcessCard, Connection } from '../types';

interface ProcessCanvasProps {
  cards: ProcessCard[];
  connections: Connection[];
  selectedCardId: string | null;
  selectedConnectionId: string | null;
  onCardSelect: (id: string) => void;
  onCardDragEnd: (id: string, x: number, y: number) => void;
  onCardDelete: (id: string) => void;
  onConnectionSelect: (id: string) => void;
  onConnectionDelete: (id: string) => void;
  onCanvasClick: () => void;
  onCardInsert: (insertIndex: number) => void;
}

// Grid configuration
const GRID_CONFIG = {
  largeCellSize: 200, // Size of large cells where cards snap to
  smallCellSize: 20,  // Size of small cells for spacing
  snapThreshold: 50   // Distance threshold for snapping
};

// Main canvas component for displaying and managing process flow
const ProcessCanvas: React.FC<ProcessCanvasProps> = ({
  cards,
  connections,
  selectedCardId,
  selectedConnectionId,
  onCardSelect,
  onCardDragEnd,
  onCardDelete,
  onConnectionSelect,
  onConnectionDelete,
  onCanvasClick,
  onCardInsert
}) => {
  const stageRef = useRef<any>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingCard, setIsDraggingCard] = useState(false);

  // Snap position to grid
  const snapToGrid = (x: number, y: number) => {
    const largeCellSize = GRID_CONFIG.largeCellSize;
    const smallCellSize = GRID_CONFIG.smallCellSize;
    const totalCellSize = largeCellSize + smallCellSize;
    
    const snappedX = Math.round(x / totalCellSize) * totalCellSize;
    const snappedY = Math.round(y / totalCellSize) * totalCellSize;
    
    return { x: snappedX, y: snappedY };
  };

  // Handle zoom functionality
  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setScale(newScale);

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    setPosition(newPos);
  };

  // Handle canvas click to deselect
  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      onCanvasClick();
      setDragOverIndex(null);
    }
  };

  // Get card by ID helper
  const getCardById = (id: string) => cards.find(card => card.id === id);

  // Handle card drag start
  const handleCardDragStart = () => {
    setIsDraggingCard(true);
  };

  // Handle card drag move - detect insertion points
  const handleCardDragMove = (e: any, cardId: string) => {
    if (!isDraggingCard) return;
    
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    
    // Find the closest card position for insertion
    let closestIndex = 0;
    let minDistance = Infinity;
    
    cards.forEach((card, index) => {
      const distance = Math.sqrt(
        Math.pow(pointerPos.x - card.x, 2) + Math.pow(pointerPos.y - card.y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    // Check if we're close enough to show insertion point
    if (minDistance < GRID_CONFIG.largeCellSize / 2) {
      setDragOverIndex(closestIndex);
    } else {
      setDragOverIndex(null);
    }
  };

  // Handle card drag end with grid snapping and insertion
  const handleCardDragEnd = (id: string, x: number, y: number) => {
    setIsDraggingCard(false);
    
    if (dragOverIndex !== null) {
      // Insert card at the detected position
      onCardInsert(dragOverIndex);
      setDragOverIndex(null);
    } else {
      // Snap to grid
      const snappedPosition = snapToGrid(x, y);
      onCardDragEnd(id, snappedPosition.x, snappedPosition.y);
    }
  };

  return (
    <div className="process-canvas">
      <Stage
        ref={stageRef}
        width={window.innerWidth - 400}
        height={window.innerHeight - 200}
        onWheel={handleWheel}
        onClick={handleStageClick}
        onTap={handleStageClick}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        style={{
          border: '1px solid #ccc',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Layer>
          {/* Grid background */}
          <Grid />
          
          {/* Insertion indicator */}
          {dragOverIndex !== null && (
            <Rect
              x={cards[dragOverIndex]?.x || 0}
              y={cards[dragOverIndex]?.y || 0}
              width={160}
              height={140}
              fill="rgba(33, 150, 243, 0.2)"
              stroke="#2196F3"
              strokeWidth={2}
              dash={[5, 5]}
              cornerRadius={8}
            />
          )}

          {/* Connections */}
          {connections.map((connection) => {
            const fromCard = getCardById(connection.fromCardId);
            const toCard = getCardById(connection.toCardId);
            
            if (!fromCard || !toCard) return null;
            
            return (
              <ConnectionComponent
                key={connection.id}
                connection={connection}
                fromCard={fromCard}
                toCard={toCard}
                isSelected={selectedConnectionId === connection.id}
                onSelect={onConnectionSelect}
                onDelete={onConnectionDelete}
              />
            );
          })}

          {/* Cards */}
          {cards.map((card) => (
            <ProcessCardComponent
              key={card.id}
              card={card}
              isSelected={selectedCardId === card.id}
              onSelect={onCardSelect}
              onDragStart={handleCardDragStart}
              onDragMove={(e) => handleCardDragMove(e, card.id)}
              onDragEnd={handleCardDragEnd}
              onDelete={onCardDelete}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

// Grid component with large and small cells
const Grid: React.FC = () => {
  const largeCellSize = GRID_CONFIG.largeCellSize;
  const smallCellSize = GRID_CONFIG.smallCellSize;
  const totalCellSize = largeCellSize + smallCellSize;
  
  const lines = [];
  const canvasWidth = 3000;
  const canvasHeight = 2000;
  
  // Draw large grid lines (for card snapping)
  for (let i = 0; i <= canvasWidth / totalCellSize; i++) {
    const x = i * totalCellSize;
    lines.push(
      <Line
        key={`large-v-${i}`}
        points={[x, 0, x, canvasHeight]}
        stroke="#2196F3"
        strokeWidth={1}
        opacity={0.3}
      />
    );
  }
  
  for (let i = 0; i <= canvasHeight / totalCellSize; i++) {
    const y = i * totalCellSize;
    lines.push(
      <Line
        key={`large-h-${i}`}
        points={[0, y, canvasWidth, y]}
        stroke="#2196F3"
        strokeWidth={1}
        opacity={0.3}
      />
    );
  }
  
  // Draw small grid lines (for spacing)
  for (let i = 0; i <= canvasWidth / smallCellSize; i++) {
    const x = i * smallCellSize;
    // Skip lines that coincide with large grid
    if (i % (totalCellSize / smallCellSize) !== 0) {
      lines.push(
        <Line
          key={`small-v-${i}`}
          points={[x, 0, x, canvasHeight]}
          stroke="#E0E0E0"
          strokeWidth={0.5}
          opacity={0.2}
        />
      );
    }
  }
  
  for (let i = 0; i <= canvasHeight / smallCellSize; i++) {
    const y = i * smallCellSize;
    // Skip lines that coincide with large grid
    if (i % (totalCellSize / smallCellSize) !== 0) {
      lines.push(
        <Line
          key={`small-h-${i}`}
          points={[0, y, canvasWidth, y]}
          stroke="#E0E0E0"
          strokeWidth={0.5}
          opacity={0.2}
        />
      );
    }
  }
  
  return <>{lines}</>;
};

export default ProcessCanvas; 
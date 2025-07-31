import React from 'react';
import { Line, Text } from 'react-konva';
import { Connection as ConnectionType, ProcessCard } from '../types';

interface ConnectionProps {
  connection: ConnectionType;
  fromCard: ProcessCard;
  toCard: ProcessCard;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

// Connection component to display links between process cards
const ConnectionComponent: React.FC<ConnectionProps> = ({
  connection,
  fromCard,
  toCard,
  isSelected,
  onSelect,
  onDelete
}) => {
  // Calculate connection points
  const fromX = fromCard.x + fromCard.width / 2;
  const fromY = fromCard.y + fromCard.height / 2;
  const toX = toCard.x + toCard.width / 2;
  const toY = toCard.y + toCard.height / 2;

  // Calculate midpoint for label
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  // Determine line style based on connection type
  const getLineStyle = () => {
    switch (connection.type) {
      case 'parallel':
        return { dash: [10, 5], strokeWidth: 2 };
      case 'route':
        return { dash: [5, 5], strokeWidth: 3 };
      case 'flow':
        return { dash: [], strokeWidth: 2 };
      default:
        return { dash: [], strokeWidth: 2 };
    }
  };

  const lineStyle = getLineStyle();

  const handleClick = () => {
    onSelect(connection.id);
  };

  const handleDelete = (e: any) => {
    e.cancelBubble = true;
    onDelete(connection.id);
  };

  return (
    <>
      {/* Connection line */}
      <Line
        points={[fromX, fromY, toX, toY]}
        stroke={isSelected ? '#FF5722' : '#666666'}
        strokeWidth={lineStyle.strokeWidth}
        dash={lineStyle.dash}
        opacity={0.8}
        onClick={handleClick}
        onTap={handleClick}
      />

      {/* Connection label */}
      {connection.label && (
        <Text
          x={midX - 30}
          y={midY - 10}
          text={connection.label}
          fontSize={10}
          fill={isSelected ? '#FF5722' : '#333333'}
          fontStyle="bold"
          backgroundColor={isSelected ? '#FFEB3B' : '#FFFFFF'}
          padding={2}
          cornerRadius={3}
          onClick={handleClick}
          onTap={handleClick}
        />
      )}

      {/* Delete button for selected connections */}
      {isSelected && (
        <Text
          x={midX + 10}
          y={midY - 10}
          text="🗑️"
          fontSize={12}
          onClick={handleDelete}
          onTap={handleDelete}
        />
      )}
    </>
  );
};

export default ConnectionComponent; 
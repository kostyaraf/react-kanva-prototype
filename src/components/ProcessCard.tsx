import React, { useRef, useState } from 'react';
import { Group, Rect, Text, Circle } from 'react-konva';
import { ProcessCard as ProcessCardType } from '../types';

interface ProcessCardProps {
  card: ProcessCardType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onDragStart?: () => void;
  onDragMove?: (e: any) => void;
  onDelete: (id: string) => void;
}

// Process card component with Figma-inspired design
const ProcessCardComponent: React.FC<ProcessCardProps> = ({
  card,
  isSelected,
  onSelect,
  onDragEnd,
  onDragStart,
  onDragMove,
  onDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<any>(null);

  const handleDragEnd = () => {
    if (groupRef.current) {
      const pos = groupRef.current.position();
      onDragEnd(card.id, pos.x, pos.y);
    }
  };

  const handleDragStart = () => {
    onDragStart?.();
  };

  const handleDragMove = (e: any) => {
    onDragMove?.(e);
  };

  const handleClick = () => {
    onSelect(card.id);
  };

  const handleDelete = (e: any) => {
    e.cancelBubble = true;
    onDelete(card.id);
  };

  const headerHeight = 40;

  return (
    <Group
      ref={groupRef}
      x={card.x}
      y={card.y}
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onTap={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card shadow */}
      <Rect
        width={card.width}
        height={card.height}
        fill="rgba(0,0,0,0.1)"
        cornerRadius={8}
        x={2}
        y={2}
      />

      {/* Main card body (white) */}
      <Rect
        width={card.width}
        height={card.height}
        fill="#FFFFFF"
        stroke={isSelected ? '#FF5722' : isHovered ? '#FFC107' : '#E0E0E0'}
        strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
        cornerRadius={8}
      />

      {/* Colored header */}
      <Rect
        width={card.width}
        height={headerHeight}
        fill={card.color}
        cornerRadius={[8, 8, 0, 0]}
      />

      {/* Header title */}
      <Text
        x={10}
        y={10}
        text={card.title}
        fontSize={14}
        fontStyle="bold"
        fill="#FFFFFF"
        width={card.width - 20}
        align="center"
      />

      {/* Icon container */}
      <Circle
        x={card.width / 2}
        y={headerHeight + 25}
        radius={20}
        fill="transparent"
        stroke={card.color}
        strokeWidth={2}
      />

      {/* Icon text (outline style) */}
      <Text
        x={card.width / 2 - 10}
        y={headerHeight + 15}
        text={card.icon}
        fontSize={20}
        align="center"
        width={20}
        fill={card.color}
      />

      {/* Sub-label button if exists */}
      {card.subLabel && (
        <Rect
          x={card.width / 2 - 30}
          y={headerHeight + 50}
          width={60}
          height={20}
          fill="#F5F5F5"
          stroke={card.color}
          strokeWidth={1}
          cornerRadius={10}
        />
      )}

      {/* Sub-label text */}
      {card.subLabel && (
        <Text
          x={card.width / 2 - 25}
          y={headerHeight + 55}
          text={card.subLabel}
          fontSize={10}
          fill={card.color}
          fontStyle="bold"
        />
      )}

      {/* Description */}
      <Text
        x={10}
        y={card.subLabel ? headerHeight + 80 : headerHeight + 60}
        text={card.description}
        fontSize={11}
        fill="#333333"
        width={card.width - 20}
        wrap="word"
        lineHeight={1.3}
        align="center"
      />

      {/* Delete button */}
      {isSelected && (
        <Circle
          x={card.width - 15}
          y={15}
          radius={8}
          fill="#FF5722"
          stroke="#FFFFFF"
          strokeWidth={1}
          onClick={handleDelete}
          onTap={handleDelete}
        />
      )}

      {/* Delete button text */}
      {isSelected && (
        <Text
          x={card.width - 20}
          y={8}
          text="×"
          fontSize={12}
          fill="#FFFFFF"
          fontStyle="bold"
          onClick={handleDelete}
          onTap={handleDelete}
        />
      )}
    </Group>
  );
};

export default ProcessCardComponent; 
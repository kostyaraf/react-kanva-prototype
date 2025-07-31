import React, { useState } from 'react';
import { ProcessCard, Connection } from '../types';

interface ConnectionCreatorProps {
  cards: ProcessCard[];
  onCreateConnection: (connection: Connection) => void;
  onCancel: () => void;
}

// Component for creating connections between cards
const ConnectionCreator: React.FC<ConnectionCreatorProps> = ({
  cards,
  onCreateConnection,
  onCancel
}) => {
  const [fromCardId, setFromCardId] = useState('');
  const [toCardId, setToCardId] = useState('');
  const [connectionType, setConnectionType] = useState<'parallel' | 'route' | 'flow'>('flow');
  const [label, setLabel] = useState('');

  const handleCreate = () => {
    if (!fromCardId || !toCardId || fromCardId === toCardId) {
      alert('Please select different cards for connection');
      return;
    }

    const newConnection: Connection = {
      id: Math.random().toString(36).substr(2, 9),
      fromCardId,
      toCardId,
      type: connectionType,
      label: label || undefined
    };

    onCreateConnection(newConnection);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ffffff',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      minWidth: '300px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>Create Connection</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          From Card:
        </label>
        <select
          value={fromCardId}
          onChange={(e) => setFromCardId(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="">Select a card</option>
          {cards.map(card => (
            <option key={card.id} value={card.id}>
              {card.title}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          To Card:
        </label>
        <select
          value={toCardId}
          onChange={(e) => setToCardId(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="">Select a card</option>
          {cards.map(card => (
            <option key={card.id} value={card.id}>
              {card.title}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Connection Type:
        </label>
        <select
          value={connectionType}
          onChange={(e) => setConnectionType(e.target.value as any)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="flow">Flow</option>
          <option value="parallel">Parallel</option>
          <option value="route">Route</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Label (optional):
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g., Route A, parallel to"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#495057',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          style={{
            padding: '8px 16px',
            border: '1px solid #007bff',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default ConnectionCreator; 
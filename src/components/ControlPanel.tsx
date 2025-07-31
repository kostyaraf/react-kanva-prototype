import React from 'react';

interface ControlPanelProps {
  currentState: 'current' | 'target';
  onStateChange: (state: 'current' | 'target') => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
  onClearAll: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// Control panel component with process management tools
const ControlPanel: React.FC<ControlPanelProps> = ({
  currentState,
  onStateChange,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onClearAll,
  canUndo,
  canRedo
}) => {
  return (
    <div className="control-panel" style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #dee2e6',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000
    }}>
      {/* Left side - State toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Process State:</span>
        <div style={{
          display: 'flex',
          backgroundColor: '#e9ecef',
          borderRadius: '20px',
          padding: '2px',
          border: '1px solid #ced4da'
        }}>
          <button
            onClick={() => onStateChange('current')}
            style={{
              padding: '8px 16px',
              borderRadius: '18px',
              border: 'none',
              backgroundColor: currentState === 'current' ? '#007bff' : 'transparent',
              color: currentState === 'current' ? '#ffffff' : '#6c757d',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Current State
          </button>
          <button
            onClick={() => onStateChange('target')}
            style={{
              padding: '8px 16px',
              borderRadius: '18px',
              border: 'none',
              backgroundColor: currentState === 'target' ? '#007bff' : 'transparent',
              color: currentState === 'target' ? '#ffffff' : '#6c757d',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Target State
          </button>
        </div>
      </div>

      {/* Center - Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onUndo}
          disabled={!canUndo}
          style={{
            padding: '8px 12px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: canUndo ? '#ffffff' : '#f8f9fa',
            color: canUndo ? '#495057' : '#6c757d',
            cursor: canUndo ? 'pointer' : 'not-allowed',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          ↩ Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          style={{
            padding: '8px 12px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: canRedo ? '#ffffff' : '#f8f9fa',
            color: canRedo ? '#495057' : '#6c757d',
            cursor: canRedo ? 'pointer' : 'not-allowed',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          ↪ Redo
        </button>
      </div>

      {/* Right side - Zoom controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onZoomOut}
          style={{
            padding: '8px 12px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#495057',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          🔍- Zoom Out
        </button>
        <button
          onClick={onFitToScreen}
          style={{
            padding: '8px 12px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#495057',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          ⤢ Fit to Screen
        </button>
        <button
          onClick={onZoomIn}
          style={{
            padding: '8px 12px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#495057',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          🔍+ Zoom In
        </button>
        <button
          onClick={onClearAll}
          style={{
            padding: '8px 12px',
            border: '1px solid #dc3545',
            borderRadius: '4px',
            backgroundColor: '#dc3545',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          🗑️ Clear All
        </button>
      </div>
    </div>
  );
};

export default ControlPanel; 
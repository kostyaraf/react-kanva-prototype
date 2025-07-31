import React from 'react';
import { CARD_TEMPLATES } from '../types';

interface CardPaletteProps {
  onAddCard: (template: typeof CARD_TEMPLATES[0]) => void;
}

// Card palette component for adding new cards to the canvas
const CardPalette: React.FC<CardPaletteProps> = ({ onAddCard }) => {
  return (
    <div className="card-palette">
      <h3>Card Templates</h3>
      <div className="card-templates">
        {CARD_TEMPLATES.map((template, index) => (
          <div
            key={index}
            className="card-template"
            onClick={() => onAddCard(template)}
            style={{
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '0',
              margin: '5px',
              cursor: 'pointer',
              width: '160px',
              height: '140px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              backgroundColor: '#ffffff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            {/* Header */}
            <div style={{
              backgroundColor: template.color,
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 10px'
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: '1.2'
              }}>
                {template.title}
              </span>
            </div>

            {/* Body */}
            <div style={{
              flex: 1,
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              {/* Icon */}
              <div style={{
                fontSize: '20px',
                marginBottom: '5px',
                color: template.color
              }}>
                {template.icon}
              </div>

              {/* Sub-label if exists */}
              {template.subLabel && (
                <div style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: template.color,
                  marginBottom: '5px',
                  padding: '2px 8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px',
                  border: `1px solid ${template.color}`
                }}>
                  {template.subLabel}
                </div>
              )}

              {/* Description */}
              <div style={{
                fontSize: '9px',
                color: '#666666',
                lineHeight: '1.2',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {template.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPalette; 
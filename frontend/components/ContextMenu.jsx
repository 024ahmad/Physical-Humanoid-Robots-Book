import React from 'react';

const ContextMenu = ({ position, onAsk, onTranslate, onClose, selectedText }) => {
  if (!position) return null;

  const style = {
    position: 'fixed',
    left: position.x,
    top: position.y,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 10000,
    padding: '5px 0'
  };

  return (
    <div className="context-menu" style={style}>
      <button
        onClick={() => onAsk(selectedText)}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px 12px',
          border: 'none',
          background: 'none',
          textAlign: 'left',
          cursor: 'pointer'
        }}
      >
        Ask about this
      </button>
      <button
        onClick={() => onTranslate(selectedText)}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px 12px',
          border: 'none',
          background: 'none',
          textAlign: 'left',
          cursor: 'pointer'
        }}
      >
        Translate
      </button>
      <button
        onClick={onClose}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px 12px',
          border: 'none',
          background: 'none',
          textAlign: 'left',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  );
};

export default ContextMenu;
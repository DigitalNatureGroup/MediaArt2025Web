import type { Work } from '../worksData';
import './Modal.css';

interface ModalProps {
  work: Work;
  onClose: () => void;
}

function Modal({ work, onClose }: ModalProps) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="button"
      tabIndex={0}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" tabIndex={-1}>
        <button type="button" className="modal-close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-grid">
          <div className="modal-image-container">
            <img 
              src={work.image} 
              alt={work.title} 
              className="modal-image"
              loading="lazy"
            />
          </div>
          <div className="modal-info">
            <h2>{work.title}</h2>
            <h3>
              {work.artist}, {work.year}
            </h3>
            <p>{work.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

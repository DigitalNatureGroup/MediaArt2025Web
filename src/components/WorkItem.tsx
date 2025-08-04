import type { Work } from '../worksData';
import './WorkItem.css';

interface WorkItemProps {
  work: Work;
  onClick: () => void;
}

function WorkItem({ work, onClick }: WorkItemProps) {
  return (
    <div
      className="work-item"
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      role="button"
      tabIndex={0}
    >
      <img 
        className="work-image" 
        src={work.image} 
        alt={work.title}
        loading="lazy"
      />
      <div className="work-content">
        <h3 className="work-title">{work.title}</h3>
        <p className="work-artist">{work.artist}</p>
        <p className="work-year">{work.year}</p>
        <p className="work-description">{work.description}</p>
      </div>
    </div>
  );
}

export default WorkItem;

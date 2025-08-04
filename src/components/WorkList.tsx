import { useState } from 'react';
import { works } from '../worksData';
import type { Work } from '../worksData';
import WorkItem from './WorkItem';
import Modal from './Modal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './WorkList.css';

function WorkList() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const sectionRef = useScrollAnimation();

  const openModal = (work: Work) => {
    setSelectedWork(work);
  };

  const closeModal = () => {
    setSelectedWork(null);
  };

  return (
    <section id="works" ref={sectionRef} className="scroll-animate">
      <h2>Works</h2>
      <div className="work-list-container">
        {works.map((work) => (
          <WorkItem key={work.id} work={work} onClick={() => openModal(work)} />
        ))}
      </div>
      {selectedWork && <Modal work={selectedWork} onClose={closeModal} />}
    </section>
  );
}

export default WorkList;

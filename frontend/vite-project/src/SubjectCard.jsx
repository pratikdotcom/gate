// frontend/src/SubjectCard.js
import React from 'react';
import './SubjectCard.css'; // Create this CSS file for card-specific styles

const SubjectCard = ({ subject, onUpdate }) => {
  return (
    <div className="subject-card">
      <div className="subject-name">{subject.name}</div>
      <div className="questions-solved">{subject.questionsSolved}</div>
      <button onClick={() => onUpdate(subject.name, subject.questionsSolved + 1)}>
        Add
      </button>
    </div>
  );
};

export default SubjectCard;

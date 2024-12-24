import React from 'react';

interface SubjectCardProps {
  id: number;
  title: string;
  description: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ id, title, description }) => {
  return (
    <div className="subject-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Subject ID: {id}</span>
    </div>
  );
};

export default SubjectCard;

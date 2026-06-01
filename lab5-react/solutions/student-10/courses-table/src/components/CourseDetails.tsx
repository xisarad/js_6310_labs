import React from 'react';
import { Course, statusLabels, statusColors } from '../types/course';

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>{course.title}</h2>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">📝 Описание:</span>
            <span className="detail-value">{course.description}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">📊 Статус:</span>
            <span 
              className="status-badge large" 
              style={{ backgroundColor: statusColors[course.status] }}
            >
              {statusLabels[course.status]}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">👨‍🏫 Преподаватель:</span>
            <span className="detail-value">{course.instructor}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">⏱ Длительность:</span>
            <span className="detail-value">{course.duration} часов</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">📅 Дата начала:</span>
            <span className="detail-value">{course.startDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

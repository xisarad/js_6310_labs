import React from 'react';
import { Course, statusLabels, statusColors } from '../types/course';

interface CourseRowProps {
  course: Course;
  onClick: (course: Course) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, onClick }) => {
  return (
    <tr className="course-row" onClick={() => onClick(course)}>
      <td className="course-title">{course.title}</td>
      <td className="course-description">{course.description}</td>
      <td>
        <span 
          className="status-badge" 
          style={{ backgroundColor: statusColors[course.status] }}
        >
          {statusLabels[course.status]}
        </span>
      </td>
      <td>{course.instructor}</td>
      <td>{course.duration} ч</td>
    </tr>
  );
};

export default CourseRow;

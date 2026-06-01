import React, { useState } from 'react';
import { Course, FilterOptions } from '../types/course';
import CourseRow from './CourseRow';
import CourseFilters from './CourseFilters';
import CourseDetails from './CourseDetails';
import './CourseTable.css';

interface CourseTableProps {
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  const [filters, setFilters] = useState<FilterOptions>({ status: 'all', searchTerm: '' });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sortField, setSortField] = useState<keyof Course>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSort = (field: keyof Course) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleCloseDetails = () => {
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(course => {
    if (filters.status && filters.status !== 'all' && course.status !== filters.status) {
      return false;
    }
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return course.title.toLowerCase().includes(searchLower) ||
             course.description.toLowerCase().includes(searchLower) ||
             course.instructor.toLowerCase().includes(searchLower);
    }
    return true;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal);
    }
    
    return sortDirection === 'asc' 
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const getSortIndicator = (field: keyof Course): string => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="courses-container">
      <h1>📚 Образовательные курсы</h1>
      
      <CourseFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')} className="sortable">
                Название {getSortIndicator('title')}
              </th>
              <th onClick={() => handleSort('description')} className="sortable">
                Описание {getSortIndicator('description')}
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Статус {getSortIndicator('status')}
              </th>
              <th onClick={() => handleSort('instructor')} className="sortable">
                Преподаватель {getSortIndicator('instructor')}
              </th>
              <th onClick={() => handleSort('duration')} className="sortable">
                Длительность (ч) {getSortIndicator('duration')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map(course => (
              <CourseRow 
                key={course.id} 
                course={course} 
                onClick={handleRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedCourses.length === 0 && (
        <div className="no-results">
          📭 Нет курсов, соответствующих фильтрам
        </div>
      )}
      
      {selectedCourse && (
        <CourseDetails course={selectedCourse} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default CourseTable;

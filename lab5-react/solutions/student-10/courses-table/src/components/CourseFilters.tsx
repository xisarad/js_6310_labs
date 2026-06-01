import React from 'react';
import { CourseStatus, FilterOptions, statusLabels } from '../types/course';

interface CourseFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CourseStatus | 'all';
    onFilterChange({ ...filters, status: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const handleReset = () => {
    onFilterChange({ status: 'all', searchTerm: '' });
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>🔍 Поиск:</label>
        <input
          type="text"
          placeholder="Название, описание, преподаватель..."
          value={filters.searchTerm || ''}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <label>📊 Статус:</label>
        <select value={filters.status || 'all'} onChange={handleStatusChange} className="status-select">
          <option value="all">Все</option>
          <option value="planned">{statusLabels.planned}</option>
          <option value="in-progress">{statusLabels['in-progress']}</option>
          <option value="completed">{statusLabels.completed}</option>
          <option value="on-hold">{statusLabels['on-hold']}</option>
        </select>
      </div>
      
      <button onClick={handleReset} className="reset-btn">
        🗑️ Сбросить
      </button>
    </div>
  );
};

export default CourseFilters;

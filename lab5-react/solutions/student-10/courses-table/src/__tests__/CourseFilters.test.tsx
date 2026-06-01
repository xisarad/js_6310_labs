import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseFilters from '../components/CourseFilters';
import { FilterOptions } from '../types/course';

describe('CourseFilters', () => {
  let mockFilters: FilterOptions;
  let mockOnFilterChange: jest.Mock;

  beforeEach(() => {
    mockFilters = { status: 'all', searchTerm: '' };
    mockOnFilterChange = jest.fn();
  });

  test('renders filter inputs', () => {
    render(<CourseFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByPlaceholderText(/Название, описание/)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('🗑️ Сбросить')).toBeInTheDocument();
  });

  test('calls onFilterChange when search input changes', () => {
    render(<CourseFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    const searchInput = screen.getByPlaceholderText(/Название, описание/);
    fireEvent.change(searchInput, { target: { value: 'React' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: 'all', searchTerm: 'React' });
  });

  test('calls onFilterChange when status select changes to planned', () => {
    render(<CourseFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'planned' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: 'planned', searchTerm: '' });
  });

  test('calls onFilterChange when status select changes to in-progress', () => {
    render(<CourseFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'in-progress' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: 'in-progress', searchTerm: '' });
  });

  test('calls onFilterChange when status select changes to completed', () => {
    render(<CourseFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: 'completed', searchTerm: '' });
  });

  test('calls onFilterChange when status select changes to on-hold', () => {
    render(<CourseFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'on-hold' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: 'on-hold', searchTerm: '' });
  });

  test('calls onFilterChange with reset values when reset button clicked', () => {
    const filtersWithSearch = { status: 'in-progress', searchTerm: 'test' };
    render(<CourseFilters filters={filtersWithSearch} onFilterChange={mockOnFilterChange} />);
    const resetBtn = screen.getByText('🗑️ Сбросить');
    fireEvent.click(resetBtn);
    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: 'all', searchTerm: '' });
  });

  test('handles empty search term', () => {
    const filtersWithStatus = { status: 'planned', searchTerm: '' };
    render(<CourseFilters filters={filtersWithStatus} onFilterChange={mockOnFilterChange} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('planned');
  });
});

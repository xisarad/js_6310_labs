import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseRow from '../components/CourseRow';
import { Course } from '../types/course';

const mockCourse: Course = {
  id: 1,
  title: 'Test Course',
  description: 'Test Description',
  status: 'in-progress',
  duration: 40,
  instructor: 'Test Instructor',
  startDate: '2025-01-01'
};

describe('CourseRow', () => {
  test('renders course data correctly', () => {
    const mockOnClick = jest.fn();
    render(
      <table>
        <tbody>
          <CourseRow course={mockCourse} onClick={mockOnClick} />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Instructor')).toBeInTheDocument();
    expect(screen.getByText('40 ч')).toBeInTheDocument();
    expect(screen.getByText('🔄 В процессе')).toBeInTheDocument();
  });

  test('calls onClick when row is clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <table>
        <tbody>
          <CourseRow course={mockCourse} onClick={mockOnClick} />
        </tbody>
      </table>
    );
    
    const row = screen.getByText('Test Course').closest('tr');
    if (row) fireEvent.click(row);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockCourse);
  });
});

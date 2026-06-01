import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseDetails from '../components/CourseDetails';
import { Course } from '../types/course';

const mockCourse: Course = {
  id: 1,
  title: 'Test Course',
  description: 'Test Description',
  status: 'completed',
  duration: 40,
  instructor: 'Test Instructor',
  startDate: '2025-01-01'
};

describe('CourseDetails', () => {
  test('renders course details correctly', () => {
    const mockOnClose = jest.fn();
    render(<CourseDetails course={mockCourse} onClose={mockOnClose} />);
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Instructor')).toBeInTheDocument();
    expect(screen.getByText('40 часов')).toBeInTheDocument();
    expect(screen.getByText('2025-01-01')).toBeInTheDocument();
    expect(screen.getByText('✅ Завершён')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<CourseDetails course={mockCourse} onClose={mockOnClose} />);
    
    const closeBtn = screen.getByText('✖');
    fireEvent.click(closeBtn);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when overlay is clicked', () => {
    const mockOnClose = jest.fn();
    render(<CourseDetails course={mockCourse} onClose={mockOnClose} />);
    
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});

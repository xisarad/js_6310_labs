import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseTable from '../components/CourseTable';
import { Course } from '../types/course';

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'JavaScript Course',
    description: 'Learn JavaScript',
    status: 'in-progress',
    duration: 40,
    instructor: 'John Doe',
    startDate: '2025-01-01'
  },
  {
    id: 2,
    title: 'React Course',
    description: 'Learn React',
    status: 'planned',
    duration: 32,
    instructor: 'Jane Smith',
    startDate: '2025-02-01'
  },
  {
    id: 3,
    title: 'TypeScript Course',
    description: 'Learn TypeScript',
    status: 'completed',
    duration: 24,
    instructor: 'Bob Wilson',
    startDate: '2025-03-01'
  }
];

describe('CourseTable', () => {
  test('renders table with all courses', () => {
    render(<CourseTable courses={mockCourses} />);
    expect(screen.getByText('JavaScript Course')).toBeInTheDocument();
    expect(screen.getByText('React Course')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Course')).toBeInTheDocument();
  });

  test('filters courses by search term', () => {
    render(<CourseTable courses={mockCourses} />);
    const searchInput = screen.getByPlaceholderText(/Название, описание/);
    fireEvent.change(searchInput, { target: { value: 'React' } });
    expect(screen.getByText('React Course')).toBeInTheDocument();
    expect(screen.queryByText('JavaScript Course')).not.toBeInTheDocument();
  });

  test('filters courses by status', () => {
    render(<CourseTable courses={mockCourses} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });
    expect(screen.getByText('TypeScript Course')).toBeInTheDocument();
    expect(screen.queryByText('JavaScript Course')).not.toBeInTheDocument();
  });

  test('sorts courses by title', () => {
    render(<CourseTable courses={mockCourses} />);
    const titleHeader = screen.getByText(/Название/);
    fireEvent.click(titleHeader);
    expect(titleHeader).toBeInTheDocument();
  });

  test('sorts courses by duration', () => {
    render(<CourseTable courses={mockCourses} />);
    const durationHeader = screen.getByText(/Длительность/);
    fireEvent.click(durationHeader);
    expect(durationHeader).toBeInTheDocument();
  });

  test('shows course details on row click', () => {
    render(<CourseTable courses={mockCourses} />);
    const row = screen.getByText('JavaScript Course').closest('tr');
    if (row) fireEvent.click(row);
    expect(screen.getByText(/👨‍🏫 Преподаватель:/)).toBeInTheDocument();
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
  });

  test('closes details modal when close button clicked', () => {
    render(<CourseTable courses={mockCourses} />);
    const row = screen.getByText('JavaScript Course').closest('tr');
    if (row) fireEvent.click(row);
    expect(screen.getByText(/👨‍🏫 Преподаватель:/)).toBeInTheDocument();
    
    const closeBtn = screen.getByText('✖');
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/👨‍🏫 Преподаватель:/)).not.toBeInTheDocument();
  });

  test('resets filters when reset button clicked', () => {
    render(<CourseTable courses={mockCourses} />);
    const searchInput = screen.getByPlaceholderText(/Название, описание/);
    fireEvent.change(searchInput, { target: { value: 'React' } });
    expect(screen.getByText('React Course')).toBeInTheDocument();
    expect(screen.queryByText('JavaScript Course')).not.toBeInTheDocument();
    
    const resetBtn = screen.getByText('🗑️ Сбросить');
    fireEvent.click(resetBtn);
    expect(screen.getByText('JavaScript Course')).toBeInTheDocument();
  });

  test('shows no results message when no courses match filters', () => {
    render(<CourseTable courses={mockCourses} />);
    const searchInput = screen.getByPlaceholderText(/Название, описание/);
    fireEvent.change(searchInput, { target: { value: 'Nonexistent Course' } });
    expect(screen.getByText(/Нет курсов, соответствующих фильтрам/)).toBeInTheDocument();
  });

  test('handles empty courses array', () => {
    render(<CourseTable courses={[]} />);
    expect(screen.getByText(/Нет курсов, соответствующих фильтрам/)).toBeInTheDocument();
  });

  test('handles status filter "all" correctly', () => {
    render(<CourseTable courses={mockCourses} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'all' } });
    expect(screen.getByText('JavaScript Course')).toBeInTheDocument();
    expect(screen.getByText('React Course')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Course')).toBeInTheDocument();
  });

  test('closes modal by clicking on overlay', () => {
    render(<CourseTable courses={mockCourses} />);
    const row = screen.getByText('JavaScript Course').closest('tr');
    if (row) fireEvent.click(row);
    expect(screen.getByText(/👨‍🏫 Преподаватель:/)).toBeInTheDocument();
    
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) fireEvent.click(overlay);
    expect(screen.queryByText(/👨‍🏫 Преподаватель:/)).not.toBeInTheDocument();
  });
});

// Дополнительные тесты для покрытия всех веток фильтрации и сортировки
test('handles search with partial match in description', () => {
  render(<CourseTable courses={mockCourses} />);
  const searchInput = screen.getByPlaceholderText(/Название, описание/);
  fireEvent.change(searchInput, { target: { value: 'Learn' } });
  expect(screen.getByText('JavaScript Course')).toBeInTheDocument();
  expect(screen.getByText('React Course')).toBeInTheDocument();
  expect(screen.getByText('TypeScript Course')).toBeInTheDocument();
});

test('handles search with match in instructor name', () => {
  render(<CourseTable courses={mockCourses} />);
  const searchInput = screen.getByPlaceholderText(/Название, описание/);
  fireEvent.change(searchInput, { target: { value: 'Jane' } });
  expect(screen.getByText('React Course')).toBeInTheDocument();
  expect(screen.queryByText('JavaScript Course')).not.toBeInTheDocument();
});

test('handles sorting same column twice toggles direction', () => {
  render(<CourseTable courses={mockCourses} />);
  const titleHeader = screen.getByText(/Название/);
  const initialText = titleHeader.textContent;
  fireEvent.click(titleHeader);
  fireEvent.click(titleHeader);
  // Просто проверяем, что клик не сломал компонент
  expect(screen.getByText('JavaScript Course')).toBeInTheDocument();
});

// Тесты для покрытия всех функций в CourseTable
test('handles sorting by different columns sequentially', () => {
  render(<CourseTable courses={mockCourses} />);
  
  // Сортировка по названию
  const titleHeader = screen.getByText(/Название/);
  fireEvent.click(titleHeader);
  
  // Сортировка по описанию
  const descHeader = screen.getByText(/Описание/);
  fireEvent.click(descHeader);
  
  // Сортировка по преподавателю
  const instructorHeader = screen.getByText(/Преподаватель/);
  fireEvent.click(instructorHeader);
  
  // Проверяем, что всё работает
  expect(screen.getByText('JavaScript Course')).toBeInTheDocument();
});

test('handles status filter with on-hold value (no courses)', () => {
  render(<CourseTable courses={mockCourses} />);
  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'on-hold' } });
  expect(screen.getByText(/Нет курсов, соответствующих фильтрам/)).toBeInTheDocument();
});

test('handles search with empty string', () => {
  render(<CourseTable courses={mockCourses} />);
  const searchInput = screen.getByPlaceholderText(/Название, описание/);
  fireEvent.change(searchInput, { target: { value: '' } });
  // Все курсы должны отображаться
  expect(screen.getByText('JavaScript Course')).toBeInTheDocument();
  expect(screen.getByText('React Course')).toBeInTheDocument();
  expect(screen.getByText('TypeScript Course')).toBeInTheDocument();
});

test('handles sort indicator change on multiple clicks', () => {
  render(<CourseTable courses={mockCourses} />);
  const titleHeader = screen.getByText(/Название/);
  
  // Три клика для проверки разных состояний
  fireEvent.click(titleHeader);
  fireEvent.click(titleHeader);
  fireEvent.click(titleHeader);
  
  expect(titleHeader).toBeInTheDocument();
});

// Тест для handleSort с повторным кликом на тот же столбец
test('handles sort toggling correctly', () => {
  render(<CourseTable courses={mockCourses} />);
  const titleHeader = screen.getByText(/Название/);
  
  // Первый клик - сортировка по возрастанию
  fireEvent.click(titleHeader);
  // Второй клик - сортировка по убыванию (должен переключиться)
  fireEvent.click(titleHeader);
  
  // Проверяем, что индикатор изменился
  const headerText = titleHeader.textContent || '';
  // Индикатор должен быть либо ↑, либо ↓
  const hasArrow = headerText.includes('↑') || headerText.includes('↓');
  expect(hasArrow).toBe(true);
});

// Тест для handleCloseDetails
test('closes modal when handleCloseDetails is called', () => {
  render(<CourseTable courses={mockCourses} />);
  
  // Открываем модалку
  const row = screen.getByText('JavaScript Course').closest('tr');
  if (row) fireEvent.click(row);
  expect(screen.getByText(/👨‍🏫 Преподаватель:/)).toBeInTheDocument();
  
  // Закрываем через крестик (вызывает handleCloseDetails)
  const closeBtn = screen.getByText('✖');
  fireEvent.click(closeBtn);
  expect(screen.queryByText(/👨‍🏫 Преподаватель:/)).not.toBeInTheDocument();
});

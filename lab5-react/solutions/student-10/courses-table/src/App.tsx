import React from 'react';
import CourseTable from './components/CourseTable';
import { Course } from './types/course';
import './App.css';

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'JavaScript: с нуля до профи',
    description: 'Полный курс по современному JavaScript, включая ES6+, асинхронность и работу с API',
    status: 'in-progress',
    duration: 40,
    instructor: 'Анна Иванова',
    startDate: '2025-09-01'
  },
  {
    id: 2,
    title: 'React: разработка SPA',
    description: 'Изучение React hooks, контекста, маршрутизации и управления состоянием',
    status: 'planned',
    duration: 32,
    instructor: 'Дмитрий Соколов',
    startDate: '2025-11-01'
  },
  {
    id: 3,
    title: 'TypeScript: надёжная типизация',
    description: 'Практический курс по TypeScript для JavaScript разработчиков',
    status: 'completed',
    duration: 24,
    instructor: 'Елена Петрова',
    startDate: '2025-08-01'
  },
  {
    id: 4,
    title: 'Node.js: бэкенд на JavaScript',
    description: 'Создание серверных приложений, работа с базами данных и REST API',
    status: 'in-progress',
    duration: 48,
    instructor: 'Михаил Козлов',
    startDate: '2025-09-15'
  },
  {
    id: 5,
    title: 'Алгоритмы и структуры данных',
    description: 'Базовые алгоритмы, структуры данных и решение задач на собеседованиях',
    status: 'planned',
    duration: 36,
    instructor: 'Сергей Морозов',
    startDate: '2025-12-01'
  },
  {
    id: 6,
    title: 'HTML/CSS: вёрстка с нуля',
    description: 'Современная вёрстка, Flexbox, Grid, адаптивный дизайн и анимации',
    status: 'completed',
    duration: 28,
    instructor: 'Ольга Новикова',
    startDate: '2025-07-01'
  }
];

const App: React.FC = () => {
  return (
    <div className="App">
      <CourseTable courses={mockCourses} />
    </div>
  );
};

export default App;

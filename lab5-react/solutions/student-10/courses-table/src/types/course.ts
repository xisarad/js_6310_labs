export type CourseStatus = 'planned' | 'in-progress' | 'completed' | 'on-hold';

export interface Course {
  id: number;
  title: string;
  description: string;
  status: CourseStatus;
  duration: number;
  instructor: string;
  startDate: string;
}

export interface FilterOptions {
  status?: CourseStatus | 'all';
  searchTerm?: string;
}

export const statusLabels: Record<CourseStatus, string> = {
  'planned': '📅 Запланирован',
  'in-progress': '🔄 В процессе',
  'completed': '✅ Завершён',
  'on-hold': '⏸ На паузе'
};

export const statusColors: Record<CourseStatus, string> = {
  'planned': '#f59e0b',
  'in-progress': '#3b82f6',
  'completed': '#10b981',
  'on-hold': '#6b7280'
};

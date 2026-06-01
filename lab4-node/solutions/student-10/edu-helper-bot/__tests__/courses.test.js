import { getCourses, submitHomework, getHomeworkStatus } from '../src/courses.js';

describe('Courses Module', () => {
  test('getCourses returns array of courses', () => {
    const courses = getCourses();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
    expect(courses[0]).toHaveProperty('name');
  });

  test('submitHomework creates new submission', () => {
    const submission = submitHomework(100, 'Test homework');
    expect(submission).toHaveProperty('id');
    expect(submission.status).toBe('pending');
  });

  test('getHomeworkStatus returns submissions for user', () => {
    const userId = 200;
    submitHomework(userId, 'First task');
    const submissions = getHomeworkStatus(userId);
    expect(submissions.length).toBeGreaterThan(0);
    expect(submissions[0]).toHaveProperty('status');
  });
});

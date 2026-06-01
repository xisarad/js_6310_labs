const courses = [
  {
    id: 1,
    name: 'JavaScript Basic',
    progress: 80,
    deadline: '2025-12-15',
    nextClass: '2025-12-10 18:00',
  },
  {
    id: 2,
    name: 'Node.js Advanced',
    progress: 45,
    deadline: '2025-12-20',
    nextClass: '2025-12-12 19:00',
  },
  {
    id: 3,
    name: 'React Framework',
    progress: 30,
    deadline: '2025-12-25',
    nextClass: '2025-12-14 17:00',
  },
];

const homeworkSubmissions = new Map(); // userId -> [{ taskId, text, status, feedback }]
let nextTaskId = 1;

export function getCourses() {
  return courses;
}

export function getCourseProgress(userId, courseId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;
  return course;
}

export function submitHomework(userId, text, fileUrl = null) {
  const submission = {
    id: nextTaskId++,
    userId,
    text,
    fileUrl,
    status: 'pending',
    feedback: null,
    createdAt: new Date().toISOString(),
  };
  
  if (!homeworkSubmissions.has(userId)) {
    homeworkSubmissions.set(userId, []);
  }
  homeworkSubmissions.get(userId).push(submission);
  return submission;
}

export function getHomeworkStatus(userId) {
  const submissions = homeworkSubmissions.get(userId) || [];
  return submissions.map(sub => ({
    id: sub.id,
    text: sub.text.substring(0, 50) + (sub.text.length > 50 ? '...' : ''),
    status: sub.status,
    feedback: sub.feedback,
  }));
}

// Для преподавателя - обновление статуса (можно расширить)
export function updateHomeworkStatus(submissionId, status, feedback) {
  for (const submissions of homeworkSubmissions.values()) {
    const sub = submissions.find(s => s.id === submissionId);
    if (sub) {
      sub.status = status;
      sub.feedback = feedback;
      return true;
    }
  }
  return false;
}

export const materials = {
  js: {
    title: 'JavaScript: The Good Parts',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    description: 'Бесплатная книга по JavaScript',
  },
  node: {
    title: 'Node.js Documentation',
    url: 'https://nodejs.org/docs/',
    description: 'Официальная документация',
  },
  react: {
    title: 'React Official Tutorial',
    url: 'https://react.dev/learn',
    description: 'Интерактивный учебник',
  },
};

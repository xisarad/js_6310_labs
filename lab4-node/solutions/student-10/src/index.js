
import express from 'express';
import dotenv from 'dotenv';
import bot from './bot.js';
import reminders from './services/reminders.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => res.send('EduHelper API is running'));

// Simple API endpoints
app.get('/courses', async (req, res) => {
  try {
    const fs = await import('fs').then(m => m.promises);
    const data = JSON.parse(await fs.readFile('data/courses.json', 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read courses' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  reminders.start(); // start reminders when server starts
});

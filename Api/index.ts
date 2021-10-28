import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ methods: 'GET' }));

app.get('/languages/:name', (_req, res) => {
  res.send('list languages');
});

app.get('/projects/:name', (_req, res) => {
  res.send('list projects');
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`listening port: ${PORT}`));

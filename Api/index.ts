import express from 'express';
import cors from 'cors';
import Controllers from './Controllers';

const app = express();

app.use(cors({ methods: 'GET' }));

app.get('/languages/:name', Controllers.Languages.getLanguages);

app.get('/repositories/:name/:language', Controllers.Repos.getReposByLanguage);

app.get('/repositories/:name', Controllers.Repos.getRepos);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`listening port: ${PORT}`));

import express from 'express';
import cors from 'cors';
import Controllers from './Controllers';
import Middlewares from './Middlewares';

const app = express();

app.use(cors({ methods: 'GET' }));

app.get('/languages/:name', Controllers.Languages.getLanguages);

app.get('/repositories/:name/:language',
  Middlewares.Repos.ValidateQueryParams,
  Controllers.Repos.getReposByLanguage);

app.get('/repositories/:name', Controllers.Repos.getRepos);

export default app;

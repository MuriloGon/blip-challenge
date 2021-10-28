import { Request, Response } from 'express';
import GitRepoService from '../Services/GitRepo';

interface ReposReq extends Request<
{ name: string, language: string },
{},
{},
{ qty?: number, sort?: 'asc' | 'desc' }> { }

export async function getReposByLanguage(req: ReposReq, res: Response) {
  const { name, language } = req.params;
  const { qty = 10, sort = 'desc' } = req.query;

  const service = new GitRepoService(name);

  const { status, data } = await service.getFilteredRepos(language, sort, qty);
  res.status(status).json(data);
}

export async function getRepos(req: ReposReq, res: Response) {
  const { name } = req.params;

  const service = new GitRepoService(name);

  const { status, data } = await service.getRepos();
  res.status(status).json(data);
}

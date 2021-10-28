import { Request, Response } from 'express';
import GitRepoService from '../Services/GitRepo';

interface LangReq extends Request<
{ name: string }> { }

export async function getLanguages(req: LangReq, res: Response) {
  const { name } = req.params;
  const service = new GitRepoService(name);

  const { status, data } = await service.getLanguages();
  res.status(status).json(data);
}

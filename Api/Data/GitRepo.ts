import axios from 'axios';
import {
  BaseRepoData, IRepos, RepoData, RepoDto,
} from './GitRepoUtils';

class Repo implements IRepos {
  constructor(
    public readonly orgName: string,
  ) { }

  async getAllRepos(): Promise<RepoData[]> {
    const response = await axios.request<BaseRepoData[]>({
      url: `https://api.github.com/orgs/${this.orgName}/repos`,
      method: 'GET',
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    const rawReposData = response.data;
    const output = rawReposData.map(RepoDto);
    return output;
  }

  async getReposByLang(language: string, sort: 'desc' | 'asc', qty: number): Promise<RepoData[]> {
    const repos = await this.getAllRepos();

    const filteredByLang = repos.filter(
      (repo) => repo.language.toLowerCase() === language.toLowerCase(),
    );

    const filteredRepos = filteredByLang.sort((a, b) => {
      if (sort === 'asc') return a.createdAt.getTime() - b.createdAt.getTime();
      if (sort === 'desc') return b.createdAt.getTime() - a.createdAt.getTime();
      return 0;
    });

    return filteredRepos.slice(0, qty);
  }

  async getRepoLangs(): Promise<string[]> {
    const repos = await this.getAllRepos();
    const langs = repos.map(({ language }) => language);
    const uniqueLangs = new Set(langs);
    return [...uniqueLangs.values()].sort();
  }
}

export default Repo;

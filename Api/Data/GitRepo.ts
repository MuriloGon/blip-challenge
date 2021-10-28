import axios from 'axios';
import {
  BaseRepoData, IRepos, RepoData, RepoDto,
} from './GitRepoUtils';

class Repo implements IRepos {
  async getAllProjects(): Promise<RepoData[]> {
    const response = await axios.request<BaseRepoData[]>({
      url: 'https://api.github.com/orgs/takenet/repos',
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });
    const rawProjectsData = response.data;
    return rawProjectsData.map(RepoDto);
  }

  async getProjectsByLang(language: string, sort: 'desc' | 'asc'): Promise<RepoData[]> {
    const projects = await this.getAllProjects();

    const filteredByLang = projects.filter(
      (project) => project.language.toLowerCase() === language.toLowerCase(),
    );

    const filteredProjs = filteredByLang.sort((a, b) => {
      if (sort === 'asc') return a.createdAt.getTime() - b.createdAt.getTime();
      if (sort === 'desc') return b.createdAt.getTime() - a.createdAt.getTime();
      return 0;
    });
    return filteredProjs;
  }

  async getRepoLangs(): Promise<string[]> {
    const projects = await this.getAllProjects();
    const langs = projects.map(({ language }) => language);
    const uniqueLangs = new Set(langs);
    return [...uniqueLangs.values()].sort();
  }
}

export default Repo;

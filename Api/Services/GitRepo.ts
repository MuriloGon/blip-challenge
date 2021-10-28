import { StatusCodes } from 'http-status-codes';
import GitRepoData from '../Data/GitRepo';
import { ServiceResponse } from '../utils/Api';

class GitRepoService {
  public readonly gitRepoData: GitRepoData;

  constructor(
    orgName: string,
    gitrepodata: GitRepoData = new GitRepoData(orgName),
  ) {
    this.gitRepoData = gitrepodata;
  }

  async getRepos() {
    try {
      const projects = await this.gitRepoData.getAllRepos();
      return ServiceResponse(StatusCodes.OK, projects);
    } catch (error) {
      return ServiceResponse(
        StatusCodes.NOT_FOUND,
        { error: 'Org not found' },
      );
    }
  }

  async getFilteredRepos(language: string, sort: 'asc' | 'desc', qty: number) {
    try {
      const projects = await this.gitRepoData.getReposByLang(language, sort, qty);
      return ServiceResponse(StatusCodes.OK, projects);
    } catch (error) {
      return ServiceResponse(
        StatusCodes.NOT_FOUND,
        { error: 'Org not found' },
      );
    }
  }

  async getLanguages() {
    try {
      const languages = await this.gitRepoData.getRepoLangs();
      const data = languages.map((lang) => ({
        language: lang,
        encoded: encodeURIComponent(lang),
      }));
      return ServiceResponse(StatusCodes.OK, data);
    } catch (error) {
      return ServiceResponse(
        StatusCodes.NOT_FOUND,
        { error: 'Org not found' },
      );
    }
  }
}

export default GitRepoService;

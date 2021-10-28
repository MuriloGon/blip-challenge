import { StatusCodes, ReasonPhrases } from 'http-status-codes';
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
        StatusCodes.INTERNAL_SERVER_ERROR,
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async getFilteredRepos(language: string, sort: 'asc' | 'desc', qty: number) {
    try {
      const projects = await this.gitRepoData.getReposByLang(language, sort, qty);
      return ServiceResponse(StatusCodes.OK, projects);
    } catch (error) {
      return ServiceResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
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
        StatusCodes.INTERNAL_SERVER_ERROR,
        { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
      );
    }
  }
}

export default GitRepoService;

export interface BaseRepoData {
  'name': string;
  'owner': { 'avatar_url': string };
  'html_url': string;
  'created_at': string;
  'description': string;
  'language': string | null;
}

export interface RepoData {
  name: string;
  img: string;
  url: string;
  description: string;
  language: string;
  createdAt: Date;
}

export interface IRepos {
  getAllProjects(): Promise<RepoData[]>;
  getProjectsByLang(language: string, sort: 'desc' | 'asc', qty?: number): Promise<RepoData[]>
  getRepoLangs(): Promise<string[]>
}

export function RepoDto(rawData: BaseRepoData): RepoData {
  return {
    name: rawData.name,
    img: rawData.owner.avatar_url,
    description: rawData.description,
    url: rawData.html_url,
    language: rawData.language || 'None',
    createdAt: new Date(rawData.created_at),
  };
}

import { sendHttpRequest } from './HttpClient';
import Url from '../utils/url';
import { GitHubUser, GitHubOrganizations, GitHubRepository, GitHubBranch, FileContent } from '../models/github';
import { HttpResponseObject } from '../ArmHelper.types';

export default class GitHubService {
  public static authorizeUrl = `${Url.serviceHost}auth/github/authorize`;

  public static getUser = (authToken: string) => {
    const data = {
      url: 'https://api.github.com/user',
      authToken,
    };

    return sendHttpRequest<GitHubUser>({ url: `${Url.serviceHost}api/github/passthrough`, method: 'POST', data });
  };

  public static storeToken = (redirectUrl: string, authToken: string): Promise<HttpResponseObject<void>> => {
    const data = {
      redirUrl: redirectUrl,
      authToken: authToken,
    };

    return sendHttpRequest<void>({ url: `${Url.serviceHost}auth/github/storeToken`, method: 'POST', data });
  };

  public static getOrganizations = (authToken: string) => {
    const data = {
      url: 'https://api.github.com/user/orgs',
      authToken,
    };

    return sendHttpRequest<GitHubOrganizations[]>({ url: `${Url.serviceHost}api/github/passthrough`, method: 'POST', data });
  };

  public static getOrgRepositories = (repositories_url: string, authToken: string) => {
    const data = {
      url: `${repositories_url}/repos?per_page=100`,
      authToken,
    };

    return sendHttpRequest<GitHubRepository[]>({ url: `${Url.serviceHost}api/github/passthrough`, method: 'POST', data });
  };

  public static getUserRepositories = (authToken: string) => {
    const data = {
      url: `https://api.github.com/user/repos?type=owner`,
      authToken,
    };

    return sendHttpRequest<GitHubRepository[]>({ url: `${Url.serviceHost}api/github/passthrough`, method: 'POST', data });
  };

  public static getBranches = (repo_url: string, authToken: string) => {
    const data = {
      url: `${repo_url}/branches`,
      authToken,
    };

    return sendHttpRequest<GitHubBranch[]>({ url: `${Url.serviceHost}api/github/passthrough`, method: 'POST', data });
  };

  public static getAllWorkflowConfigurations = (repoUrl: string, branchName: string, authToken: string) => {
    const data = {
      url: `${repoUrl}/contents/.github/workflows?ref=${branchName}`,
      authToken,
    };

    return sendHttpRequest<FileContent[]>({ url: `${Url.serviceHost}api/github/passthrough`, method: 'POST', data });
  };
  public static getWorkflowConfiguration = (repoUrl: string, branchName: string, workflowYmlPath: string, authToken: string) => {
    const data = {
      url: `${repoUrl}/contents/${workflowYmlPath}?ref=${branchName}`,
      authToken,
    };

    return sendHttpRequest<FileContent>({ url: `${Url.serviceHost}api/github/passthrough`, method: 'POST', data });
  };
}

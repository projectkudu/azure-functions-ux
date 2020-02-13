import { Controller, Post, Body, HttpException, Response, Get, Session, HttpCode, Res, Put } from '@nestjs/common';
import { ConfigService } from '../shared/config/config.service';
import { HttpService } from '../shared/http/http.service';
import { Constants } from '../constants';
import { HttpUtil } from '../utilities/http.util';

@Controller('api/staticsites')
export class StaticSitesController {
  constructor(private configService: ConfigService, private httpService: HttpService) {}

  @Get('github/clientId')
  clientId() {
    return { client_id: this.configService.get('STATICSITES_GITHUB_CLIENT_ID') };
  }

  @Post('github/generateAccessToken')
  @HttpCode(200)
  async generateAccessToken(@Body('code') code: string, @Body('state') state: string) {
    try {
      const response = await this.httpService.post(`${Constants.oauthApis.githubApiUri}/access_token`, {
        code,
        state,
        client_id: this.configService.get('STATICSITES_GITHUB_CLIENT_ID'),
        client_secret: this.configService.get('STATICSITES_GITHUB_CLIENT_SECRET'),
      });

      const accessToken = HttpUtil.getQueryParameterValue('access_token', `?${response.data}`);
      return { access_token: accessToken };
    } catch (err) {
      if (err.response) {
        throw new HttpException(err.response.data, err.response.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Post('github/orgs')
  @HttpCode(200)
  async orgs(@Body('accessToken') accessToken: string) {
    try {
      const userPromise = this.httpService.get(`${Constants.githubApiUrl}/user`, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });

      const orgPromise = this.httpService.get(`${Constants.githubApiUrl}/user/orgs`, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });

      return await Promise.all([userPromise, orgPromise])
        .then(responses => {
          const sanitizedOrgs = this._processOrgs(responses[1].data);
          sanitizedOrgs.push({ login: responses[0].data.login, url: responses[0].data.repos_url });
          return sanitizedOrgs;
        })
        .catch(err => {
          if (err.response) {
            throw new HttpException(err.response.data, err.response.status);
          }
          throw new HttpException(err, 500);
        });
    } catch (err) {
      if (err.response) {
        throw new HttpException(err.response.data, err.response.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Post('github/repos')
  @HttpCode(200)
  async repos(@Body('accessToken') accessToken: string, @Body('orgUrl') orgUrl: string) {
    try {
      const isUser = orgUrl.toLocaleLowerCase().indexOf('github.com/users/') > -1;

      let response: any = null;
      if (isUser) {
        response = await this.httpService.get(`${Constants.githubApiUrl}/user/repos`, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
      } else {
        response = await this.httpService.get(`${orgUrl}/repos`, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
      }

      return this._processRepos(response.data);
    } catch (err) {
      if (err.response) {
        throw new HttpException(err.response.data, err.response.status);
      }
      throw new HttpException(err, 500);
    }
  }

  @Post('github/branches')
  @HttpCode(200)
  async repoBranches(@Body('accessToken') accessToken: string, @Body('repoFullName') repoFullName: string) {
    try {
      const response = await this.httpService.get(`${Constants.githubApiUrl}/repos/${repoFullName}/branches`, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });

      return this._processBranches(response.data);
    } catch (err) {
      if (err.response) {
        throw new HttpException(err.response.data, err.response.status);
      }
      throw new HttpException(err, 500);
    }
  }

  private _processOrgs(data: any[]): { login: string; url: string }[] {
    const newOrgList: any[] = [];
    data.forEach(org => {
      newOrgList.push({
        login: org.login,
        url: org.url,
      });
    });

    return newOrgList;
  }

  private _processBranches(data: any[]): { name: string }[] {
    const newBranchList: any[] = [];
    data.forEach(branch => {
      newBranchList.push({
        name: branch.name,
      });
    });

    return newBranchList;
  }

  private _processRepos(data: any[]): { name: string; html_url: string }[] {
    const newRepoList: any[] = [];
    data.forEach(repo => {
      newRepoList.push({
        name: repo.name,
        html_url: repo.html_url,
        full_name: repo.full_name,
      });
    });

    return newRepoList;
  }
}

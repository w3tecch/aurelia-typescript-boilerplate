import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { UserModel } from './../models/user.model';

export interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

@autoinject
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public async getUsers(): Promise<UserModel[]> {
    this.httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withBaseUrl('https://api.github.com/');
		});

		const response: Response = await this.httpClient.fetch('users');
		return await response.json().then((r: IUser[]) => r.map(i => new UserModel(i.avatar_url, i.login, i.html_url)));
  }
}

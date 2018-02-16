import { autoinject } from 'aurelia-framework';
import { plainToClass } from 'class-transformer';

import { RestClient } from './rest-client.service';
import { UserModel } from './../../models/user.model';

export interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

@autoinject
export class UserRestService {

  constructor(
    private restClient: RestClient,
  ) {
    this.restClient
      .useAPI()
      .withResource('users');
  }

  public async getUsers(): Promise<UserModel[]> {
    const users = await this.restClient.findAll<IUser[]>();

    return plainToClass(UserModel, users);
  }
}

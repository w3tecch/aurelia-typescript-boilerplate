import { autoinject } from 'aurelia-framework';
import { UserRestService } from './../../services/rest/user.service';
import { UserModel } from './../../models/user.model';

@autoinject
export class UsersViewModel {
	public heading: string = 'Github Users';
	public users: Array<UserModel> = [];

	constructor(
    private userRestService: UserRestService
  ) { }

	public async activate(): Promise<void> {
    this.users = await this.userRestService.getUsers();
	}
}

import { autoinject } from 'aurelia-framework';
import { UserService } from './../../services/user.service';
import { UserModel } from './../../models/user.model';

@autoinject
export class UsersViewModel {
	public heading: string = 'Github Users';
	public users: Array<UserModel> = [];

	constructor(
    private userService: UserService
  ) { }

	public async activate(): Promise<void> {
		this.users = await this.userService.getUsers();
	}
}

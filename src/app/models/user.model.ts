
import { Expose } from 'class-transformer';

export class UserModel {

  @Expose({ name: 'avatar_url' })
  public avatarUrl: string = '';

  public login: string = '';

  @Expose({ name: 'html_url' })
  public htmlUrl: string = '';

  public getLogin(): string {
    return this.login;
  }

  public getAvatarUrl(): string {
    return this.avatarUrl;
  }

  public getHtmlUrl(): string {
    return this.htmlUrl;
  }
}


export class UserModel {
  constructor(
    public avatarUrl: string,
    public login: string,
    public htmlUrl: string
  ) { }

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

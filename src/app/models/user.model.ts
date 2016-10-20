
export class UserModel {
  constructor(
    public firstname: string,
    public lastname: string
  ) { }

  public getFullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}

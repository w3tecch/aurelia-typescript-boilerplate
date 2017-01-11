export class JsonValueConverter {
  public toView(value): string | void {
    if (value) {
      return JSON.stringify(value, undefined, '\t');
    }
    return;
  }
}

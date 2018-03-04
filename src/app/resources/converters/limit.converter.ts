export class LimitValueConverter {
  public toView(array, amount): any[] {
    if (Array.isArray(array)) {
      return array.slice(0, amount);
    }

    return [];
  }
}

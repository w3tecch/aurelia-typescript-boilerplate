export class FilterValueConverter {
  public toView(array, property, value): any[] {
    if (!array || !property || !value) {
      return array;
    }
    return array.filter((item) => item[property].toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
}

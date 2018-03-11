export class FilterValueConverter {
  public toView(array, property, value): any[] {
    if (!array || !property) {
      return array;
    }
    if (!value) {
      return array.filter(item => item.indexOf(property) > -1);
    }

    return array.filter(item => item[property].toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
}

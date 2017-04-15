export class SortValueConverter {
  public toView(array, property, sortAsc = true): any[] | void {
    if (!array) {
      return;
    }
    if (!property) {
      return array;
    }
    array.sort((a, b) => {

      let aProp;
      let bProp;
      if (typeof (a[property]) === 'string') {
        aProp = a[property].toUpperCase();
      } else {
        aProp = a[property];
      }
      if (typeof (b[property]) === 'string') {
        bProp = b[property].toUpperCase();
      } else {
        bProp = b[property];
      }

      if (aProp < bProp) {
        return sortAsc ? -1 : 1;
      }
      if (aProp > bProp) {
        return sortAsc ? 1 : -1;
      }
      return 0;
    });
    return array;
  }
}

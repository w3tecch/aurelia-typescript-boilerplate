// tslint:disable-next-line:interface-name
interface StringConstructor {
  isEmpty(str: string | undefined): boolean;
  emptyIfUndefined(str: string): string;
}

// tslint:disable-next-line:no-null-keyword
String.isEmpty = str => str === undefined || str === null || str.length === 0;

String.emptyIfUndefined = str => String.isEmpty(str) ? '' : str;

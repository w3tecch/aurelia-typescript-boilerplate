/// <reference path="../typings/globals/whatwg-fetch/index.d.ts" />
interface URLSearchParams {}
declare module "isomorphic-fetch" {
  export = fetch;
}
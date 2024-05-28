/// <reference types="citation-js" />

declare module "citation-js" {
  export default class Cite {
    constructor(...args: any[]);
    [key: string]: any;
  }
}

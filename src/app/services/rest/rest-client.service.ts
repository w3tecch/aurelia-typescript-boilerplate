import { autoinject, transient } from 'aurelia-framework';
import { HttpClient, json, RequestInit } from 'aurelia-fetch-client';

import { AppConfigService } from './../app-config.service';

export interface IFetchOption {
  method?: string;
  headers?: THeaders;
  body?: string | {};
}

export type TBody = Blob | BufferSource | FormData | URLSearchParams | string;
export type THeaders = Headers | {} | { [name: string]: string } | undefined;
export type TIdentifier = string | number;

export const toJson = json;

export const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

@transient()
@autoinject
export class RestClient {

  private resource!: string;

  private baseUrl!: string;

  private headers: THeaders = {};

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.configureURL(this.appConfigService.getConfig().API_MAIN_URL);
  }

  /**
   * Configuration
   */
  public useAPI(): RestClient {
    this.configureURL(this.appConfigService.getConfig().API_MAIN_URL);

    return this;
  }

  public useUAM(): RestClient {
    this.configureURL(this.appConfigService.getConfig().API_UAM_URL);

    return this;
  }

  public withResource(resource: string): RestClient {
    this.resource = resource;

    return this;
  }

  public withHeaders(headers: THeaders): RestClient {
    this.configureHeaders(headers);

    return this;
  }

  public withJsonHeaders(): RestClient {
    this.withHeaders(jsonHeaders);

    return this;
  }

  public getHttpClient(): HttpClient {
    return this.httpClient;
  }

  public getHeaders(): THeaders {
    return this.headers;
  }

  public getResource(): string {
    return this.resource;
  }

  /**
   * Model access layer
   */
  public findOne<T>(id: TIdentifier): Promise<T> {
    return this.fetchGet<T>(`${this.resource}/${id}`);
  }
  public findAll<T>(query?: string): Promise<T> {
    return this.fetchGet<T>(`${this.resource}`, query);
  }
  public create<T>(body: TBody): Promise<T> {
    return this.fetchPost<T>(`${this.resource}`, body);
  }
  public update<T>(id: TIdentifier, body: TBody): Promise<T> {
    return this.fetchPut<T>(`${this.resource}/${id}`, body);
  }
  public delete<T>(id: TIdentifier): Promise<T> {
    return this.fetchDelete<T>(`${this.resource}/${id}`);
  }

  /**
   * HTTP access layer
   */
  public async fetchGet<T>(requestURL: string, query?: string, requestOption?: RequestInit): Promise<T> {
    const finalRequestOption: RequestInit = Object.assign({
      headers: this.headers,
    }, requestOption);
    const response: Response = await this.httpClient.fetch(this.getRequestURL(requestURL, query), finalRequestOption);

    return response.json();
  }

  public async fetchPost<T>(requestURL: string, body: TBody, query?: string, requestOption?: RequestInit): Promise<T> {
    const finalRequestOption: RequestInit = Object.assign({
      method: 'POST',
      headers: this.headers
    }, { body }, requestOption);
    const response: Response = await this.httpClient.fetch(this.getRequestURL(requestURL, query), finalRequestOption);

    return response.json();
  }

  public async fetchPut<T>(requestURL: string, body: TBody, query?: string, requestOption?: RequestInit): Promise<T> {
    const finalRequestOption: RequestInit = Object.assign({
      method: 'PUT',
      headers: this.headers
    }, { body }, requestOption);
    const response: Response = await this.httpClient.fetch(this.getRequestURL(requestURL, query), finalRequestOption);

    return response.json();
  }

  public async fetchPatch<T>(requestURL: string, body: TBody, query?: string, requestOption?: RequestInit): Promise<T> {
    const finalRequestOption: RequestInit = Object.assign({
      method: 'PATCH',
      headers: this.headers
    }, { body }, requestOption);
    const response: Response = await this.httpClient.fetch(this.getRequestURL(requestURL, query), finalRequestOption);

    return response.json();
  }

  public async fetchDelete<T>(requestURL: string, query?: string, requestOption?: RequestInit): Promise<T> {
    const finalRequestOption: RequestInit = Object.assign({
      method: 'DELETE',
      headers: this.headers
    }, requestOption);
    const response: Response = await this.httpClient.fetch(this.getRequestURL(requestURL, query), finalRequestOption);

    return response.json();
  }

  /**
   * Helper methods
   */
  public getRequestURL(path: string, query?: string): string {
    return `${this.baseUrl}${path}${query || ''}`;
  }

  private configureURL(baseURL: string): void {
    this.baseUrl = baseURL;
  }

  private configureHeaders(headers: THeaders): void {
    this.headers = Object.assign(this.headers, headers);
  }

}

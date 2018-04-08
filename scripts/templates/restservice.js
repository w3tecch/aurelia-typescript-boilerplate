const changeCase = require('change-case');

module.exports = {
  name: 'restservice',
  description: 'Creating a Rest Service',
  target: 'src/app/services/rest/',
  wrapFolder: undefined,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the rest service name (e.g. User)?'
    },
    {
      type: 'text',
      name: 'url',
      message: 'What\'s the rest service url (e.g. users)?'
    },
    {
      type: 'text',
      name: 'model',
      message: 'What\'s the rest service model (e.g. User)?'
    }
  ],
  files: [
    {
      template: params => {
        return `import { autoinject } from 'aurelia-framework';
import { plainToClass, classToPlain } from 'class-transformer';

import { RestClient, TBody } from './rest-client.service';
import { ${params.model}Model } from './../../models/${changeCase.paramCase(params.model).toLowerCase()}.model';

export interface IUser {
  avatar_url: string;
  login: string;
  html_url: string;
}

@autoinject
export class ${params.name}RestService {

  constructor(
    private restClient: RestClient,
  ) {
    this.restClient
      .useAPI()
      .withResource('${params.url}s');
  }

  public async findAll(): Promise<${params.model}Model[]> {
    const list = await this.restClient.findAll<${params.model}Model[]>();
    return plainToClass(${params.model}Model, list);
  }

  public async findOne(id: string): Promise<${params.model}Model> {
    const item = await this.restClient.findOne(id);
    return plainToClass(${params.model}Model, item);
  }

  public async create(data: ${params.model}Model): Promise<${params.model}Model> {
    const item = await this.restClient.create(classToPlain(data) as TBody);
    return plainToClass(${params.model}Model, item);
  }

  public async update(id: string, data: ${params.model}Model): Promise<${params.model}Model> {
    const item = await this.restClient.update(id, classToPlain(data) as TBody);
    return plainToClass(${params.model}Model, item);
  }

  public async delete(id: string): Promise<void> {
    this.restClient.delete(id);
  }
}
`;
      },
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.service.ts`
    },
  ]
}

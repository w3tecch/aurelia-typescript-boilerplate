const changeCase = require('change-case');

module.exports = {
  name: 'converter',
  description: 'Creating a Converter',
  target: 'src/app/resources/converters/',
  wrapFolder: undefined,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the converter name (e.g. DateFormat)?'
    }
  ],
  files: [
    {
      template: params => {
        return `export class ${params.name}ValueConverter {

  public toView(value: any): string {
    return '';
  }

  public fromView(value: any): string {
    return '';
  }
}
`;
      },
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.converter.ts`
    },
  ]
}

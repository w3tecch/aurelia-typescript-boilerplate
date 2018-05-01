const changeCase = require('change-case');

module.exports = {
  name: 'template',
  description: 'Creating a Template',
  target: 'src/app/resources/templates/',
  wrapFolder: params => `${changeCase.paramCase(params.name).toLowerCase()}`,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the template name?'
    }
  ],
  files: [
    {
      template: params => {
        return `<template bindable="color">

</template>`;
      },
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.html`
    },
  ]
}

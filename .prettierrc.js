const prettierConfig = require('eslint-config-mantine/.prettierrc.js')

module.exports = Object.assign({}, prettierConfig, {
  singleQuote: true,
  tabWidth: 2,
  importOrder: ['^components/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
})

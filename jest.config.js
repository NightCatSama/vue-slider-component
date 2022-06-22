module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/']
}
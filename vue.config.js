module.exports = {
  outputDir: process.env.VUE_APP_BUILD_MODE === 'package' ? 'dist' : 'docs',
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  css: { extract: false },
}

module.exports = {
  outputDir: process.env.VUE_APP_BUILD_MODE === 'package' ? 'dist' : 'docs',
  chainWebpack: config => {
    config.output.libraryExport('default')
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      })
  },
  css: { extract: false },
}

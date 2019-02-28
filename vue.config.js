const container = require('markdown-it-container')

function createContainer(name, defaultTitle) {
  return [
    container,
    name,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info
          .trim()
          .slice(name.length)
          .trim()
        if (name === 'example') {
          return `
<script>
  import examples from '@/examples/${info.split(' ')[0]}.ts'
  export default {
    data () {
      return {
        ...examples
      }
    }
  }
</script>\n
          `.trim()
        } else if (token.nesting === 1) {
          return `<div class="${name} custom-block"><p class="custom-block-title">${info ||
            defaultTitle}</p>\n`
        } else {
          return `</div>\n`
        }
      },
    },
  ]
}

module.exports = {
  parallel: false,
  outputDir: process.env.VUE_APP_BUILD_MODE === 'package' ? 'dist' : 'docs',
  chainWebpack: config => {
    if (process.env.VUE_APP_BUILD_MODE !== 'package') {
      config.resolve.alias.set('vue$', 'vue/dist/vue.common')
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
          preventExtract: true,
          wrapper: 'article',
          use: [
            createContainer('tip', 'TIP'),
            createContainer('warning', 'WARNING'),
            createContainer('danger', 'WARNING'),
            createContainer('example'),
          ],
        })
    } else {
      config.output.libraryExport('default')
    }
  },
  css: { extract: false },
}

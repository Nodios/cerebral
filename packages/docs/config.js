var join = require('path').join

module.exports = {
  "themes": [
    join('..', 'node_modules', 'bem-components', 'common.blocks'),
    join('..', 'node_modules', 'bem-components', 'desktop.blocks'),
    join('..', 'node_modules', 'bem-components', 'design', 'common.blocks'),
    join('..', 'node_modules', 'bem-components', 'design', 'desktop.blocks'),
    "cerebral-website"
  ],
  "langs": [
    "en"
  ],
  "output": "dist",
  "debug": false,
  "server": {
    tunnel: false,
    open: false
  },
  "posthtmlPlugins": [].concat(
    require('mad-mark').posthtmlPlugins,
    tree => {
      var tabs = []
      tree.walk(node => {
        if (node.tag === 'h6') {
          tabs.push({ elem: 'tab', name: node.content, content: [] })
          node = null
        } else if (tabs.length && node.tag === 'hr') {
          node = { block: 'tabs', content: tabs }
          tabs = []
        } else if (tabs.length) {
          tabs[tabs.length - 1].content.push(node.content || node)
          node = null
        }

        return node
      })
    }
  ),
  "postcssPlugins": [
    require('sharps').postcss({
      columns: 24,
      maxWidth: '960px',
      gutter: '0',
      flex: 'flex'
    }),
    require('cssnano')()
  ]
};
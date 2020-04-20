import path from 'path'
const projectRoot = process.cwd()
const webpack = {
  common: {
    context: projectRoot,
    entry: './index.js',
    resolve: {
      alias: {
        '@messServ': path.join(projectRoot, 'src')
      }
    },
    target: 'node'
  },

  production: {
    output: {
      path: path.join(projectRoot, 'dist/prod'),
      filename: 'alpheios-messaging.node.min.js'
    }
  },

  development: {
    output: {
      path: path.join(projectRoot, 'dist/dev'),
      filename: 'alpheios-messaging.node.js'
    }
  }
}

export { webpack }

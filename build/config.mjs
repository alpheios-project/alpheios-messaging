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
    }
  },

  production: {
    output: {
      path: path.join(projectRoot, 'dist/prod'),
      filename: 'alpheios-messaging.min.js'
    }
  },

  development: {
    output: {
      path: path.join(projectRoot, 'dist/dev'),
      filename: 'alpheios-messaging.js'
    }
  }
}

export { webpack }

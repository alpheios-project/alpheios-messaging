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
      filename: 'messaging-service.min.js'
    }
  },

  development: {
    output: {
      path: path.join(projectRoot, 'dist/dev'),
      filename: 'messaging-service.js'
    }
  }
}

export { webpack }

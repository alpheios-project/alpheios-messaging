import path from 'path'
const projectRoot = process.cwd()
const webpack = {
  common: {
    context: projectRoot,
    entry: './tests/browser/messaging-service/index.js',
    output: {
      libraryTarget: 'window',
      library: 'AlpheiosMessagingService'
    },
    resolve: {
      alias: {
        '@messServ': path.join(projectRoot, 'src')
      }
    }
  },

  production: {
    output: {
      path: path.join(projectRoot, 'tests/browser/messaging-service/bundle'),
      filename: 'alpheios-messaging.min.js'
    }
  },

  development: {
    output: {
      path: path.join(projectRoot, 'tests/browser/messaging-service/bundle'),
      filename: 'alpheios-messaging-test.js'
    }
  }
}

export { webpack }

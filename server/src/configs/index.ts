const configs = {
  development: {
    server: {
      host: 'localhost',
      port: 3000
    }
  },
  test: {
    server: {
      host: 'localhost',
      port: 3000
    }
  },
  production: {
    server: {
      host: 'localhost',
      port: 3000
    }
  }
}

// 取 key
type configsKey = keyof typeof configs

const NODE_ENV = process.env.NODE_ENV as configsKey || 'development'

export default configs[NODE_ENV]

import databaseConfig from './database.json'
import { Dialect } from 'sequelize'
import path from 'path'

interface IDatabase {
  username: string
  password: string
  host: string
  database: string
  dialect: Dialect
}

const configs = {
  development: {
    server: {
      host: 'localhost',
      port: 3000
    },
    jwt: {
      privateKey: 'key'
    },
    database: databaseConfig.development as IDatabase,
    storage: {
      dir: path.resolve(__dirname, '../attachments'),
      prefix: '/public/attachments'
    }
  },
  test: {
    server: {
      host: 'localhost',
      port: 3000
    },
    jwt: {
      privateKey: 'key'
    },
    database: {},
    storage: {
      dir: path.resolve(__dirname, '../attachments'),
      prefix: '/public/attachments'
    }
  },
  production: {
    server: {
      host: 'localhost',
      port: 3000
    },
    jwt: {
      privateKey: 'key'
    },
    database: {},
    storage: {
      dir: path.resolve(__dirname, '../attachments'),
      prefix: '/public/attachments'
    }
  }
}

// 取 key
type configsKey = keyof typeof configs

const NODE_ENV = (process.env.NODE_ENV as configsKey) || 'development'

export default configs[NODE_ENV]

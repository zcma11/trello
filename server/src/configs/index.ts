import databaseConfig from './database.json'
import { Dialect } from 'sequelize'

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
    database: databaseConfig.development as IDatabase
  },
  test: {
    server: {
      host: 'localhost',
      port: 3000
    },
    jwt: {
      privateKey: 'key'
    },
    database: {}
  },
  production: {
    server: {
      host: 'localhost',
      port: 3000
    },
    jwt: {
      privateKey: 'key'
    },
    database: {}
  }
}

// 取 key
type configsKey = keyof typeof configs

const NODE_ENV = process.env.NODE_ENV as configsKey || 'development'

export default configs[NODE_ENV]

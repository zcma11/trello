import configs from './configs'
import { bootstrapControllers } from 'koa-ts-controllers'
import koaRouter from 'koa-router'
import Koa, { Context } from 'koa'
import path from 'path'
import koaBody from 'koa-body'
import { notFound } from '@hapi/boom'
import { Sequelize } from 'sequelize-typescript'

interface ErrorBody {
  status: number
  error: string
  message: string
  errorDetails?: string
}

;(async () => {
  const app = new Koa()
  const router = new koaRouter()

  app.context.db = new Sequelize({
    ...configs.database,
    models: [__dirname + '/models/**/*']
  })

  await bootstrapControllers(app, {
    router,
    basePath: '/api',
    versions: [1],
    controllers: [path.resolve(__dirname, 'controllers/**/*')],
    errorHandler: async (err: any, ctx: Context) => {
      console.log(err)
      let status = 500
      let body: ErrorBody = {
        status,
        error: 'error',
        message: 'an error'
      }
      if (err.output) {
        status = err.output.statusCode
        body = err.output.payload
        if (err.data) {
          body.errorDetails = err.data
        }
      }

      ctx.status = status
      ctx.body = body
    }
  })

  router.all('(.*)', async ctx => {
    throw notFound('not', 'found')
  })

  app.use(koaBody({ multipart: true }))
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(configs.server.port, configs.server.host, () => {
    console.log(
      `连接成功 -- http://${configs.server.host}:${configs.server.port}`,
      '\nbasePath -- /api/v1'
    )
  })
})()

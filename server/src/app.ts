import configs from './configs'
import { bootstrapControllers } from 'koa-ts-controllers'
import koaRouter from 'koa-router'
import Koa from 'koa'
import path from 'path';

(async () => {
  const app = new Koa()
  const router = new koaRouter()

  await bootstrapControllers(app, {
    router,
    basePath: '/api',
    versions: [1],
    controllers: [path.resolve(__dirname, 'controllers/**/*')]
  })

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(configs.server.port, configs.server.host, () => {
    console.log(`连接成功 -- http://${configs.server.host}:${configs.server.port}`)
  })
})()
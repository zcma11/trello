import { Context, Next } from 'koa'
import { unauthorized } from '@hapi/boom'

export default async (ctx: Context, next: Next) => {
  if (!ctx.userInfo || ctx.userInfo.id < 1) {
    throw unauthorized('无权访问，请先登录')
  }

  await next()
}
import { Controller, Get } from 'koa-ts-controllers'

// 一开始 收集了先
@Controller('/test')
class Test {
  @Get('/hello')
  async getHello() {
    return 'hello world'
  }
}

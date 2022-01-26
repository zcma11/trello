import {
  Body,
  Controller,
  Get,
  Header,
  Params,
  Post,
  Query
} from 'koa-ts-controllers'
import { IsNumberString } from 'class-validator'
import { Boom, notFound } from '@hapi/boom'

class foo {
  @IsNumberString({}, { message: 'cuo la' })
  id: number
}

// 一开始 收集了先
@Controller('/test')
class Test {
  @Get('/hello')
  async getHello() {
    return 'hello world'
  }

  @Get('/foo/:id(\\d+)')
  async foo(
    @Params() params: { id: number },
    // @Query() p: { id: number},
    @Query() p: foo,
    @Header() header: any
  ) {
    console.log(params)
    console.log(header)
    throw notFound('hhh', 'mole')
    return `${params.id}-${p.id}`
  }

  @Post('/bar')
  async bar(@Body() body: { name: string }) {
    console.log(body)
    return `fffffffly`
  }
}

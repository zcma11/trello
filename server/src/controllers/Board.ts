import { Context } from 'koa'
import {
  Controller,
  Get,
  Flow,
  Post,
  Delete,
  Params,
  Body,
  Ctx,
  Put
} from 'koa-ts-controllers'
import authorization from '../middlewares/authorization'
import { Board as BoardModel } from '../models/Board'
import { PostAddBoardBody, PutUpdateBoardBody } from '../validators/Board'
import { notFound, forbidden } from '@hapi/boom'

@Controller('/board')
@Flow([authorization])
export class Board {
  @Post('')
  public async addBoard(@Ctx() ctx: Context, @Body() body: PostAddBoardBody) {
    const { name } = body
    const board = new BoardModel()
    board.name = name
    board.userId = ctx.userInfo.id
    await board.save()

    ctx.status = 201
    return board
  }

  @Get('')
  public async getBoards(@Ctx() ctx: Context) {
    const where = {
      userId: ctx.userInfo.id
    }

    const boards = await BoardModel.findAll({ where })

    return boards
  }

  @Get('/:id(\\d+)')
  public async getBoard(@Ctx() ctx: Context, @Params('id') id: number) {
    const board = getBoard(id, ctx.userInfo.id)
    return board
  }

  @Put('/:id(\\d+)')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutUpdateBoardBody
  ) {
    const board = await getBoard(id, ctx.userInfo.id)

    if (body.name) {
      board.name = body.name
      await board.save()
    }

    ctx.status = 204
  }

  @Delete('/:id(\\d+)')
  public async deleteBoard(@Ctx() ctx: Context, @Params('id') id: number) {
    const board = await getBoard(id, ctx.userInfo.id)

    await board.destroy()
    ctx.status = 204
  }
}

async function getBoard(id: number, userId: number): Promise<BoardModel> {
  const board = await BoardModel.findByPk(id)

  if (!board) {
    throw notFound('指定面板不存在')
  }

  if (board.userId !== userId) {
    throw forbidden('禁止访问该面板')
  }

  return board
}

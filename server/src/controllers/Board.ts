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
import { PostAddBoardBody, PutUpdateBoardBody, getAndVerifyBoard } from '../validators/Board'

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
    const board = getAndVerifyBoard(id, ctx.userInfo.id)
    return board
  }

  @Put('/:id(\\d+)')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutUpdateBoardBody
  ) {
    const board = await getAndVerifyBoard(id, ctx.userInfo.id)

    if (body.name) {
      board.name = body.name
      await board.save()
    }

    ctx.status = 204
    return board
  }

  @Delete('/:id(\\d+)')
  public async deleteBoard(@Ctx() ctx: Context, @Params('id') id: number) {
    const board = await getAndVerifyBoard(id, ctx.userInfo.id)

    await board.destroy()
    ctx.status = 204
  }
}
import { Context } from 'koa'
import {
  Controller,
  Ctx,
  Flow,
  Get,
  Post,
  Put,
  Delete,
  Params,
  Body,
  Query
} from 'koa-ts-controllers'
import authorization from '../middlewares/authorization'
import {
  PostAddListBody,
  GetListQuery,
  PutUpdateListBody,
  getAndVerifyBoardList
} from '../validators/BoardList'
import { BoardList as BoardListModel } from '../models/BoardList'
import { getAndVerifyBoard } from '../validators/Board'

@Controller('/list')
@Flow([authorization])
export default class BoardList {
  @Post('')
  public async addList(@Ctx() ctx: Context, @Body() body: PostAddListBody) {
    const { boardId, name } = body
    await getAndVerifyBoard(boardId, ctx.userInfo.id)

    const maxOrderList = await BoardListModel.findOne({
      where: {
        boardId
      },
      order: [['order', 'desc']]
    })
    const boardList = new BoardListModel()
    boardList.name = name
    boardList.userId = ctx.userInfo.id
    boardList.boardId = boardId
    boardList.order = maxOrderList ? maxOrderList.order + 65535 : 65535
    await boardList.save()

    ctx.status = 201
    return boardList
  }

  /**
   * /list?boardId=1
   */
  @Get('')
  public async getLists(@Ctx() ctx: Context, @Query() query: GetListQuery) {
    const { boardId } = query
    await getAndVerifyBoard(boardId, ctx.userInfo.id)

    const where = {
      boardId
    }

    const boardList = await BoardListModel.findAll({
      where,
      order: [['order', 'asc']]
    })

    return boardList
  }

  @Get('/:id(\\d+)')
  public async getList(@Ctx() ctx: Context, @Params('id') id: number) {
    const boardList = await getAndVerifyBoardList(id, ctx.userInfo.id)

    return boardList
  }

  @Put('/:id(\\d+)')
  public async updateList(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutUpdateListBody
  ) {
    const boardList = await getAndVerifyBoardList(id, ctx.userInfo.id)

    const { boardId, name, order } = body

    if (boardId) {
      boardList.boardId = boardId
    }

    if (name) {
      boardList.name = name
    }

    if (order) {
      boardList.order = order
    }

    await boardList.save()

    ctx.status = 204
    return boardList
  }

  @Delete('/:id(\\d+)')
  public async deleteList(@Ctx() ctx: Context, @Params('id') id: number) {
    const boardList = await getAndVerifyBoardList(id, ctx.userInfo.id)

    boardList.destroy()

    ctx.status = 204
    return
  }
}

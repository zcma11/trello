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
  PutUpdateListBody
} from '../validators/BoardList'
import { BoardList as BoardListModel } from '../models/BoardList'

@Controller('/list')
@Flow([authorization])
export default class BoardList {
  @Post('')
  public async addList(@Ctx() ctx: Context, @Body() body: PostAddListBody) {}

  /**
   * /list?boardId=1
   */
  @Get('')
  public async getLists(@Ctx() ctx: Context, @Query() query: GetListQuery) {}

  @Get('/:id(\\d+)')
  public async getList(@Ctx() ctx: Context, @Params('id') id: number) {}

  @Put('/:id(\\d+)')
  public async updateList(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutUpdateListBody
  ) {}

  @Put('/:id(\\d+)')
  public async deleteList(@Ctx() ctx: Context, @Params('id') id: number) {}
}

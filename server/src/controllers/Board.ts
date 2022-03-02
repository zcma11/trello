import { Context } from 'koa'
import {
  Controller,
  Get,
  Flow,
  Post,
  Delete,
  Params,
  Query,
  Body,
  Ctx,
  Put
} from 'koa-ts-controllers'
import { Board as BoardModel } from '../models/Board'
import { PostAddBoardBody, PutUpdateBoardBody } from '../validators/Board'

@Controller('/board')
export class Board {
  @Post('')
  public async addBoard(@Ctx() ctx: Context, @Body() body: PostAddBoardBody) {}

  @Get('')
  public async getBoards(@Ctx() ctx: Context) {}

  @Get('/:id(\\d+)')
  public async getBoard(@Ctx() ctx: Context, @Params('id') id: number) {}

  @Put('/:id(\\d+)')
  public async updateBoard(@Ctx() ctx: Context, @Params('id') id: number, @Body() body: PutUpdateBoardBody) {}

  @Delete('/:id(\\d+)')
  public async deleteBoard(@Ctx() ctx: Context, @Params('id') id: number) {}
}

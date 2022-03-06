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
  GetCardsQuery,
  PostAddCardBody,
  PutCardBody,
  getAndVerifyBoardListCard
} from '../validators/Card'
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard'
import { getAndVerifyBoardList } from '../validators/BoardList'
import { Comment as CommentModel } from '../models/Comment'
import { CardAttachment as CardAttachmentModel } from '../models/CardAttachment'
import { Attachment as AttachmentModel } from '../models/Attachment'
import config from '../configs'

@Controller('/card')
@Flow([authorization])
export class BoardListCard {
  @Post('')
  public async addCard(@Ctx() ctx: Context, @Body() body: PostAddCardBody) {
    const { boardListId, name, description } = body

    await getAndVerifyBoardList(boardListId, ctx.userInfo.id)
    const card = new BoardListCardModel()

    card.name = name
    card.boardListId = boardListId
    card.userId = ctx.userInfo.id
    if (description) {
      card.description = description
    }

    await card.save()
    ctx.status = 201
    return card
  }

  @Get('')
  public async getCards(@Ctx() ctx: Context, @Query() query: GetCardsQuery) {
    const { boardListId } = query
    await getAndVerifyBoardList(boardListId, ctx.userInfo.id)

    const cards = await BoardListCardModel.findAll({
      where: { boardListId },
      order: [['id', 'asc']],
      include: [
        {
          model: CommentModel,
          attributes: ['id']
        },
        {
          model: CardAttachmentModel,
          include: [
            {
              model: AttachmentModel
            }
          ]
        }
      ]
    })

    const boardListCardsData = cards.map(card => {
      let coverPath = ''
      let attachments = card.attachments.map(attachment => {
        let data = attachment.toJSON() as CardAttachmentModel & { path: string }
        data.path = config.storage.prefix + '/' + data.detail.name

        if (data.isCover) {
          coverPath = data.path
        }

        return data
      })

      return {
        id: card.id,
        userId: card.userId,
        boardListId: card.boardListId,
        name: card.name,
        description: card.description,
        order: card.order,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        attachments: attachments,
        coverPath: coverPath,
        commentCount: card.comments.length
      }
    })

    return boardListCardsData
  }

  @Get('/:id(\\d+)')
  public async getCard(@Ctx() ctx: Context, @Params('id') id: number) {
    const card = await getAndVerifyBoardListCard(id, ctx.userInfo.id)

    return card
  }

  @Put('/:id(\\d+)')
  public async updateCard(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutCardBody
  ) {
    const card = await getAndVerifyBoardListCard(id, ctx.userInfo.id)

    const { boardListId, description, name, order } = body

    if (boardListId) {
      card.boardListId = boardListId
    }
    if (description) {
      card.description = description
    }
    if (name) {
      card.name = name
    }
    if (order) {
      card.order = order
    }

    await card.save()
    ctx.status = 204
    return card
  }

  @Delete('/:id(\\d+)')
  public async deleteCard(@Ctx() ctx: Context, @Params('id') id: number) {
    const card = await getAndVerifyBoardListCard(id, ctx.userInfo.id)
    await card.destroy()
    ctx.status = 204
    return
  }
}

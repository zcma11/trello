import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  Min,
  ValidateIf
} from 'class-validator'
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard'
import { notFound, forbidden } from '@hapi/boom'

export class PostAddCardBody {
  @Min(1, {
    message: 'boardListId不能为空且必须大于1'
  })
  boardListId: number

  @IsNotEmpty({
    message: '名称不能为空'
  })
  @MaxLength(255, {
    message: '卡片名称不能大于255个字符'
  })
  name: string

  @ValidateIf(v => v.description !== undefined)
  @MaxLength(2000, {
    message: '卡片描述不能大于2000个字符'
  })
  description?: string
}

export class GetCardsQuery {
  @IsNumberString(
    {},
    {
      message: 'boardListId不能为空且必须是数字'
    }
  )
  boardListId: number
}

export class PutCardBody {
  @ValidateIf(v => v.boardListId !== undefined)
  @Min(1, {
    message: 'boardListId不能为空且必须是大于1的数字'
  })
  boardListId?: number

  @ValidateIf(v => v.name !== undefined)
  @MaxLength(255, {
    message: '卡片名称不能大于255个字符'
  })
  name?: string

  @ValidateIf(v => v.description !== undefined)
  @MaxLength(2000, {
    message: '卡片描述不能大于2000个字符'
  })
  description?: string

  @ValidateIf(v => v.order !== undefined)
  @IsNumberString(
    {},
    {
      message: 'order必须为数字'
    }
  )
  order?: number
}

export async function getAndVerifyBoardListCard(
  id: number,
  userId: number
): Promise<BoardListCardModel> {
  const card = await BoardListCardModel.findByPk(id)

  if (!card) {
    throw notFound('指定卡片不存在')
  }

  if (card.userId !== userId) {
    throw forbidden('禁止访问该卡片')
  }

  return card
}

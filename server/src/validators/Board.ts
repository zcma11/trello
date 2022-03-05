import { MaxLength, IsNotEmpty, ValidateIf } from 'class-validator'
import { Board as BoardModel } from '../models/Board'
import { notFound, forbidden } from '@hapi/boom'

export class PostAddBoardBody {
  @IsNotEmpty({
    message: '名字不能为空'
  })
  @MaxLength(255, {
    message: '长度不能超过255'
  })
  name: string
}

export class PutUpdateBoardBody {
  @ValidateIf(a => a !== undefined)
  @MaxLength(255, {
    message: '长度不能超过255'
  })
  name?: string
}

export async function getAndVerifyBoard(id: number, userId: number): Promise<BoardModel> {
  const board = await BoardModel.findByPk(id)

  if (!board) {
    throw notFound('指定面板不存在')
  }

  if (board.userId !== userId) {
    throw forbidden('禁止访问该面板')
  }

  return board
}

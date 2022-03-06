import { IsNotEmpty, IsNumber, IsNumberString, Min, ValidateIf } from 'class-validator'
import { notFound, forbidden } from '@hapi/boom'
import { BoardList as BoardListModel } from '../models/BoardList'

export class PostAddListBody {
  @Min(1, {
    message: '面板id不能为空且必须是数字'
  })
  boardId: number

  @IsNotEmpty({
    message: '列表名字不能为空'
  })
  name: string
}

export class GetListQuery {
  @IsNumberString({}, {
    message: '面板id不能为空且必须是数字'
  })
  boardId: number
}

export class PutUpdateListBody {
  @ValidateIf(o => o.boardId !== undefined)
  @Min(1, {
    message: '面板id不能为空且必须是数字'
  })
  boardId: number

  @ValidateIf(o => o.name !== undefined)
  @IsNotEmpty({
    message: '列表名字不能为空'
  })
  name: string

  @ValidateIf(o => o.order !== undefined)
  @IsNumber({},{
    message: '列表名字不能为空'
  })
  order: number
}

export async function getAndVerifyBoardList(id: number, userId: number): Promise<BoardListModel> {
  const boardList = await BoardListModel.findByPk(id)

  if (!boardList) {
    throw notFound('指定列表不存在')
  }

  if (boardList.userId !== userId) {
    throw forbidden('禁止访问该列表')
  }

  return boardList
}

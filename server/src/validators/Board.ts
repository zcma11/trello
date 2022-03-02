import { MaxLength, IsNotEmpty, ValidateIf } from 'class-validator'

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

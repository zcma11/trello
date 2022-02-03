import {  IsNotEmpty, Length } from 'class-validator'
import { IsSameValue } from './CustomValidator'

export class RegisterBody {
  @Length(1, 25, {
    message: '名字长度不能大于25个字符'
  })
  @IsNotEmpty({
    message: '用户名不能为空'
  })
  name: string

  @IsNotEmpty({
    message: '密码不能为空'
  })
  password: string

  @IsSameValue('password', {
    message: '两次输入不一致'
  })
  rePassword: string
}
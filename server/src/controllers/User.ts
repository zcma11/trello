import { Controller, Post, Body, Ctx } from 'koa-ts-controllers'
import { LoginBody, RegisterBody } from '../validators/User'
import { User as UserModule } from '../models/User'
import { conflict } from '@hapi/boom'
import { Context } from 'koa'
import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import configs from '../configs'

@Controller('/user')
export class UserController {
  @Post('/register')
  async register(@Ctx() ctx: Context, @Body() body: RegisterBody) {
    const { name, password } = body

    const user = await UserModule.findOne({
      where: {
        name
      }
    })

    if (user) {
      throw conflict('注册失败', '用户已存在')
    }

    const newUser = new UserModule()
    newUser.name = name
    newUser.password = password

    await newUser.save()
    ctx.status = 201
    return {
      id: newUser.id,
      name: newUser.name,
      createdAT: newUser.createdAt
    }
  }

  @Post('/login')
  async login(@Ctx() ctx: Context, @Body() body: LoginBody) {
    let { name, password } = body

    let user = await UserModule.findOne({
      where: {
        name
      }
    })

    if (!user) {
      throw conflict('登录失败', '用户不存在')
    }
    let md5 = crypto.createHash('md5')
    password = md5.update(password).digest('hex') 
    if (user?.password !== password) {
      throw conflict('登录失败', '密码错误')
    }

    const userInfo = {
      id: user.id,
      name: user.name
    }

    const token = jsonwebtoken.sign(userInfo, configs.jwt.privateKey)
    
    ctx.set('authorization', token)
    return userInfo
  }
}

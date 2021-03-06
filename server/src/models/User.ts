import {
  Model,
  Table,
  PrimaryKey,
  AllowNull,
  DataType,
  AutoIncrement,
  Column,
  Unique,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript'
import crypto from 'crypto'

@Table({
  tableName: 'User'
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(20)
  })
  name: string

  @Column
  set password(val: string) {
    const md5 = crypto.createHash('md5')
    const pwd = md5.update(val).digest('hex')
    this.setDataValue('password', pwd)
  }

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

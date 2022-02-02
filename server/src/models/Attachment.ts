import {
  Model,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  AllowNull,
  DataType,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  Default
} from 'sequelize-typescript'
import { User } from './User'

@Table({
  tableName: 'Attachment'
})
export class Attachment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  userId: number

  @AllowNull(false)
  @Default('')
  @Column({
    type: DataType.STRING(255)
  })
  originName: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255)
  })
  name: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255)
  })
  type: string

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER.UNSIGNED
  })
  size: number

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

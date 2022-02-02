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
  Default,
} from 'sequelize-typescript'
import { BoardList } from './BoardList'
import { User } from './User'

@Table({
  tableName: 'BoardListCard'
})
export class BoardListCard extends Model {
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

  @ForeignKey(() => BoardList)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  boardListId: number

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255)
  })
  name: string

  @AllowNull(false)
  @Default('')
  @Column({
    type: DataType.STRING(2000)
  })
  description: string

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.FLOAT
  })
  order: number

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}
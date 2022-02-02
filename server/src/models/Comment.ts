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
  UpdatedAt
} from 'sequelize-typescript'
import { BoardListCard } from './BoardListCard'
import { User } from './User'

@Table({
  tableName: 'Comment'
})
export class Comment extends Model {
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

  @ForeignKey(() => BoardListCard)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  boardListCardId: number

  @AllowNull(false)
  @Column({
    type: DataType.STRING(2000)
  })
  content: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

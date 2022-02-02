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
import { Board } from './Board'
import { User } from './User'

@Table({
  tableName: 'BoardList'
})
export class BoardList extends Model {
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

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  boardId: number

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255)
  })
  name: string

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
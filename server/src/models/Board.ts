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
import { User } from './User'

@Table({
  tableName: 'Board'
})
export class Board extends Model<Board> {
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
  @Column({
    type: DataType.STRING(255)
  })
  name: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}
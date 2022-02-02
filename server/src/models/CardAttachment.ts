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
import { Attachment } from './Attachment'
import { BoardListCard } from './BoardListCard'
import { User } from './User'

@Table({
  tableName: 'CardAttachment'
})
export class CardAttachment extends Model {
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

  @ForeignKey(() => Attachment)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  attachmentId: number

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.BOOLEAN
  })
  isCover: boolean

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

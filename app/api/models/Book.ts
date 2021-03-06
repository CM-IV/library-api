import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;
  @column()
  public author: string;
  @column()
  public publisher: string;
  @column()
  public image: string;
  @column()
  public description: string;
  @column()
  public assignedTo: number;
  @column()
  public publishYear: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    localKey: "assignedTo",
  })
  public assignedBooks: BelongsTo<typeof User>;
}

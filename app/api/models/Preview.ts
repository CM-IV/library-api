import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Preview extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public assignedTo: number;

  @column()
  public title: string;

  @column()
  public image: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    localKey: "assignedTo",
  })
  public assignedPreviews: BelongsTo<typeof User>;
}

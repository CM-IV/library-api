import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Book from "./Book";
import Preview from "./Preview";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public roleId: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Book, {
    foreignKey: "assignedTo",
  })
  public books: HasMany<typeof Book>;

  @hasMany(() => Preview, {
    foreignKey: "assignedTo",
  })
  public previews: HasMany<typeof Preview>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}

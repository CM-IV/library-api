import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Previews extends BaseSchema {
  protected tableName = "previews";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title", 75);
      table.string("image", 150);
      table
        .integer("assigned_to")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

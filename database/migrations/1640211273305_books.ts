import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Books extends BaseSchema {
  protected tableName = "books";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title", 50);
      table.string("author", 50);
      table.string("publisher", 50);
      table.string("image", 150);
      table.string("description", 250);
      table
        .integer("assigned_to")
        .references("id")
        .inTable("users")
        .notNullable();
      table.integer("publish_year");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: false });
      table.timestamp("updated_at", { useTz: false });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

import Factory from "@ioc:Adonis/Lucid/Factory";
import Book from "../../app/api/models/Book";

export const UserFactory = Factory.define(Book, ({ faker }) => {
  return {
    title: faker.lorem.words(2),
    author: faker.lorem.words(2),
    publisher: faker.lorem.words(2),
    image: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    publish_year: faker.datatype.number({
      min: 1500,
      max: 2022,
    }),
  };
}).build();

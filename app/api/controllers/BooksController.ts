import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Book from "App/api/models/Book";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class BooksController {
  public async show({ params }: HttpContextContract) {
    return Book.findOrFail(params.id);
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input("page", 1);

    const limit = request.input("per_page", 4);

    return Book.query().paginate(page, limit);
  }

  public async store({ request, response }: HttpContextContract) {
    const bookSchema = schema.create({
      title: schema.string({ trim: true }),
      author: schema.string({ trim: true }),
      publisher: schema.string({ trim: true }),
      image: schema.string({ trim: true }),
      description: schema.string({ trim: true }),
      assigned_to: schema.number(),
      publish_year: schema.number(),
    });

    const payload = await request.validate({ schema: bookSchema });

    await Book.create(payload); //Create and save

    return response.created();
  }

  public async update({ response, params, request }: HttpContextContract) {
    const book = await Book.findOrFail(params.id);

    const bookSchema = schema.create({
      title: schema.string({ trim: true }),
      author: schema.string({ trim: true }),
      publisher: schema.string({ trim: true }),
      image: schema.string({ trim: true }),
      description: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: bookSchema });

    book.title = payload.title;
    book.author = payload.author;
    book.publisher = payload.publisher;
    book.image = payload.image;
    book.description = payload.description;

    book.save();

    response.status(200);

    return `Book with ID ${params.id} was updated!`;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.id);

    book.delete();

    response.status(200);

    return `Book with ID ${params.id} was deleted!`;
  }
}

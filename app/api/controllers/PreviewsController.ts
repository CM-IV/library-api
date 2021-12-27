import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Preview from "../models/Preview";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class PreviewsController {
  public async show({ params }: HttpContextContract) {
    return Preview.findOrFail(params.id);
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input("page", 1);

    const limit = request.input("per_page", 4);

    return Preview.query().paginate(page, limit);
  }

  public async store({ request, response }: HttpContextContract) {
    const previewSchema = schema.create({
      title: schema.string({ trim: false }),
      image: schema.string({ trim: true }),
      url: schema.string({ trim: true }),
      assigned_to: schema.number(),
    });

    const payload = await request.validate({ schema: previewSchema });

    await Preview.create(payload);

    return response.created();
  }

  public async update({ response, params, request }: HttpContextContract) {
    const preview = await Preview.findOrFail(params.id);

    const previewSchema = schema.create({
      title: schema.string({ trim: false }),
      image: schema.string({ trim: true }),
      url: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: previewSchema });

    preview.title = payload.title;
    preview.image = payload.image;
    preview.url = payload.url;

    preview.save();

    return response.json({ preview });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const preview = await Preview.findOrFail(params.id);

    preview.delete();

    response.status(200);

    return `Preview with ID ${params.id} was deleted!`;
  }
}

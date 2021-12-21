import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Preview from "../models/Preview";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class PreviewsController {
  public async show({ params }: HttpContextContract) {
    return Preview.findOrFail(params.id);
  }

  public async index({}: HttpContextContract) {
    return Preview.all();
  }

  public async store({ request, response }: HttpContextContract) {
    const previewSchema = schema.create({
      title: schema.string({ trim: false }),
      image: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: previewSchema });

    const preview = await Preview.create(payload);

    response.status(201);

    return preview;
  }

  public async update({ response, params, request }: HttpContextContract) {
    const preview = await Preview.findOrFail(params.id);

    const previewSchema = schema.create({
      title: schema.string({ trim: false }),
      image: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: previewSchema });

    preview.title = payload.title;
    preview.image = payload.image;

    preview.save();

    response.status(200);

    return `Preview with ID of ${params.id} was updated!`;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const preview = await Preview.findOrFail(params.id);

    preview.delete();

    response.status(200);

    return `Preview with ID ${params.id} was deleted!`;
  }
}

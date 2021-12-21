import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.required(),
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({ trim: false }, [
        rules.confirmed(),
        rules.required(),
        rules.minLength(5),
      ]),
    });

    const payload = await request.validate({
      schema: userSchema,
      messages: {
        required: "The {{ field }} is required to register a new account.",
        "email.unique": "That email is already in use",
      },
    });

    const user = await User.create(payload);

    response.status(200);

    return response.created(user);
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const token = await auth.use("api").attempt(email, password);
      return token;
    } catch {
      return response.badRequest("Credentials are invalid!");
    }
  }
}

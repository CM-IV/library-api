import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
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
        confirmed: "The password fields do not match.",
        "email.email": "Enter a valid email address",
        "email.unique": "That email is already in use",
        "password.minLength":
          "The minimum characters in your password must be greater than or equal to 5.",
      },
    });

    const user = await User.create(payload);

    await auth.login(user);

    return response.json(user);
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const token = await auth.use("api").attempt(email, password);
      return token.toJSON();
    } catch {
      return response.badRequest("Credentials are invalid!");
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use("api").revoke();

    response.status(200);

    return {
      revoked: true,
    };
  }

  public async show({ response }: HttpContextContract) {
    const user = await User.query()
      .where("role_id", 1)
      .select("id")
      .firstOrFail();

    return response.json({ user });
  }
}

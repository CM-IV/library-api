/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes.
|
*/

import HealthCheck from "@ioc:Adonis/Core/HealthCheck";
import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    //GET /user fetches the user where role_id = 1
    Route.get("/user", "AuthController.show");

    //post /books
    //put /books/:id
    //delete /books/:id
    Route.resource("/books", "BooksController").only([
      "store",
      "update",
      "destroy",
    ]);

    //post /previews
    //put /previews/:id
    //delete /previews/:id
    Route.resource("/previews", "PreviewsController").only([
      "store",
      "update",
      "destroy",
    ]);

    //logout
    Route.post("/logout", "AuthController.logout");
  }).middleware("auth");

  //Health check
  Route.get("health", async ({ response }) => {

    const report = await HealthCheck.getReport();

    return report.healthy ? response.ok(report) : response.badRequest(report);

  })

  //get /books list
  //get /books/:id
  Route.resource("/books", "BooksController").only(["show", "index"]);
  //get /previews list
  //get /previews/:id
  Route.resource("/previews", "PreviewsController").only(["show", "index"]);
  //register and login controllers
  Route.post("/register", "AuthController.register");
  Route.post("/login", "AuthController.login");
}).prefix("/api");

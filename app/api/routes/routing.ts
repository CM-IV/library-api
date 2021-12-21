/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes.
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
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

// Require external modules
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongos:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
const Controller = require("../controllers/controllers");
const { schema } = require("../models/example");

const routes = [
  {
    method: "GET",
    url: "/api/example",
    handler: Controller.getExample,
  },
  {
    method: "GET", //
    url: "/api/example/:name",
    handler: Controller.getSingleExample,
  },
  /*   {
    method: "POST",
    url: "/api/example",
    handler: Controller.addExample,
  },
  {
    method: "PUT",
    url: "/api/example/:name",
    handler: Controller.updateExample,
  },
  {
    method: "DELETE",
    url: "/api/example/:name",
    handler: Controller.deleteExample,
  }, */
];

module.exports = routes;

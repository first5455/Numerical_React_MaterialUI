// Require external modules
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongos:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//for Develop only
/* mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err)); */

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
    schema:{
      params:{
        type: 'object',
        properties:{
          name:{
            type: 'string',
            description: 'Name of Method'
          },
        }
      },
      response:{
        200:{
          description: 'Successful Response',
          type: 'object',
          properties:{
            name: {type: 'string'},
            xl: {type: 'number'},
            xr: {type: 'number'},
            latex: {type: 'string'},
            x: {type: 'number'},
            arrayA: {type: 'array'},
            arrayB: {type: 'array'},
            arrayX: {type: 'array'},
            arrayY: {type: 'array'},
            xfind: {type: 'number'},
            arrayInput: {type: 'string'},
          }
        }
      }
    },
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

// Require external modules
const mongoose = require("mongoose");

const host = process.env.MONGOHOST || "localhost"

//connect mongo
mongoose
  .connect(`mongodb://${host}:27017/mydatabase`)
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
    schema: {
      params: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of Method",
          },
        },
      },
      response: {
        200: {
          description: "Successful Response",
          type: "object",
          properties: {
            name: { type: "string" },
            xl: { type: "number" },
            xr: { type: "number" },
            latex: { type: "string" },
            x: { type: "number" },
            arrayA: { type: "array" },
            arrayB: { type: "array" },
            arrayX: { type: "array" },
            arrayY: { type: "array" },
            xfind: { type: "number" },
            arrayInput: { type: "string" },
          },
        },
      },
    },
  },
/*   {
    method: "POST",
    url: "/api/example",
    handler: Controller.addExample,
    schema: {
      body: {
        type: "object",
        properties: {
          name: {type: 'string'}
        }
      },
      response: {
        200: {
          description: "Successful Response",
          type: "object",
          properties: {
            name: { type: "string" },
            xl: { type: "number" },
            xr: { type: "number" },
            latex: { type: "string" },
            x: { type: "number" },
            arrayA: { type: "array" },
            arrayB: { type: "array" },
            arrayX: { type: "array" },
            arrayY: { type: "array" },
            xfind: { type: "number" },
            arrayInput: { type: "string" },
          },
        },
      },
    },
  },
  {
    method: "PUT",
    url: "/api/example/:name",
    handler: Controller.updateExample,
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: 'string'}
        }
      },
      params: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of Method",
          },
        },
      },
      response: {
        200: {
          description: "Successful Response",
          type: "object",
          properties: {
            name: { type: "string" },
            xl: { type: "number" },
            xr: { type: "number" },
            latex: { type: "string" },
            x: { type: "number" },
            arrayA: { type: "array" },
            arrayB: { type: "array" },
            arrayX: { type: "array" },
            arrayY: { type: "array" },
            xfind: { type: "number" },
            arrayInput: { type: "string" },
          },
        },
      },
    },
  },
  {
    method: "DELETE",
    url: "/api/example/:name",
    handler: Controller.deleteExample,
    schema: {
      params: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of Method",
          },
        },
      },
      response: {
        200: {
          description: "Successful Response",
          type: "object",
          properties: {
            name: { type: "string" },
            xl: { type: "number" },
            xr: { type: "number" },
            latex: { type: "string" },
            x: { type: "number" },
            arrayA: { type: "array" },
            arrayB: { type: "array" },
            arrayX: { type: "array" },
            arrayY: { type: "array" },
            xfind: { type: "number" },
            arrayInput: { type: "string" },
          },
        },
      },
    },
  }, */
];

module.exports = routes;

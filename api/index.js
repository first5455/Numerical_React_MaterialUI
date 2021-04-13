// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

const swagger = require("./src/config/swagger");

fastify.register(require("fastify-swagger"), swagger.options);

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

const routes = require("./src/routes");

routes.forEach((routes, index) => {
  fastify.route(routes);
});

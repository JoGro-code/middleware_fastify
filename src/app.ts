/*
import Fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const buildApp = (opts = {}) => {
  const app: FastifyInstance = Fastify(opts);

  // Globale Middleware registrieren
  app.addHook("onError", errorMiddleware);

  // Alle Routen registrieren
  app.register(userRoutes, { prefix: "/api/users" });

  return app;
};

export default buildApp;
*/

import Fastify from "fastify";
import { userRoutes, priceRoutes } from "./routes/userRoutes";
import authPlugin from "./plugins/authPlugin";

const buildApp = () => {
  const app = Fastify();

  app.register(authPlugin);

  app.register(userRoutes, { prefix: "/api/users" });
  app.register(priceRoutes, { prefix: "/api/users" });

  return app;
};

export default buildApp;

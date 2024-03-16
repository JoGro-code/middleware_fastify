//import Fastify from "fastify";
//import buildApp from "./app";
//import { AppConfig } from "../config/config";
//
//const fastify = Fastify({
//  logger: true,
//  app: buildApp(),
//});
//
//fastify.register(app);
//
//const start = async () => {
//  try {
//    await fastify.listen(AppConfig.port, AppConfig.host);
//    console.log(`Server listening on ${AppConfig.host}:${AppConfig.port}`);
//  } catch (err) {
//    fastify.log.error(err);
//    process.exit(1);
//  }
//};
//
//start();

import buildApp from "./app.js";
import { AppConfig } from "./config/config.js";

const start = async () => {
  const app = buildApp();

  try {
    // Stellen Sie sicher, dass der Port als Zahl übergeben wird
    await app.listen({ port: AppConfig.port, host: AppConfig.host });
    console.log(`Server listening on ${AppConfig.host}:${AppConfig.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

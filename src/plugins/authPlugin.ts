import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";

export default fp(async (fastify: FastifyInstance) => {
  const secret = process.env.AZURE_AD_SECRET;

  // Überprüfen, ob das Geheimnis vorhanden ist, und einen Fehler werfen, wenn nicht
  if (!secret) {
    throw new Error(
      "AZURE_AD_SECRET is not defined in the environment variables."
    );
  }

  fastify.register(fastifyJwt, {
    secret: secret, // Nun ist sichergestellt, dass secret nicht 'undefined' ist
  });

  fastify.decorate("authenticate", async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  });
});

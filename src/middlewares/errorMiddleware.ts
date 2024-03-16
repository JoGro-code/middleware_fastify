import {
  FastifyInstance,
  FastifyError,
  FastifyRequest,
  FastifyReply,
} from "fastify";

export const errorMiddleware = async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(
    async (
      error: FastifyError,
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      // Log the error
      request.log.error(error.toString());

      // Custom error handling can be implemented here
      // For demonstration, we'll simply return the error message with a 500 status code
      const statusCode = error.statusCode || 500;
      reply.status(statusCode).send({ error: error.message });
    }
  );
};

import { FastifyPluginAsync } from "fastify";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { getPrice } from "../controllers/priceController";
import { UserRouteParams } from "../types/customTypes"; // Importieren Sie Ihre neuen Typdefinitionen

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.get("/", async (request, reply) => getUsers(request, reply));

  fastify.post("/", async (request, reply) => createUser(request, reply));

  // Nutzen Sie UserRouteParams, um den Typ von request.params für die Route zu präzisieren
  fastify.get<UserRouteParams>("/:id", async (request, reply) =>
    getUserById(request, reply)
  );

  fastify.put<UserRouteParams>("/:id", async (request, reply) =>
    updateUser(request, reply)
  );

  fastify.delete<UserRouteParams>("/:id", async (request, reply) =>
    deleteUser(request, reply)
  );
};

export const priceRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/getPrice", async (request, reply) => {
    return getPrice(request, reply); // Nur request und reply werden übergeben
  });
};

//export const priceRoutes: FastifyPluginAsync = async (fastify) => {
//  fastify.get("/getPrice", async (request, reply) => {
//    const { customerNo, articleNos } = request.query as any; // Berücksichtigen Sie die präzise Typisierung für bessere Typsicherheit
//    return getPrice(request, reply, customerNo, articleNos);
//  });
//};

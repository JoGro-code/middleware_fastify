import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/userService";
import { UserDTO } from "../types/customTypes";

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await UserService.getUsers();
    reply.send(users);
  } catch (error) {
    reply.status(500).send({ message: "Fehler beim Abrufen der Benutzer" });
  }
};

export const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Sicherstellen, dass request.body den Typ UserDTO hat
  const userData: UserDTO = request.body as UserDTO;
  try {
    const user = await UserService.createUser(userData); // Hier nutzen wir jetzt userData statt request.body
    reply.status(201).send(user);
  } catch (error) {
    reply.status(500).send({ message: "Fehler beim Erstellen des Benutzers" });
  }
};

export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const user = await UserService.getUserById(request.params.id);
    if (user) {
      reply.send(user);
    } else {
      reply.status(404).send({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    reply.status(500).send({ message: "Fehler beim Abrufen des Benutzers" });
  }
};

export const updateUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  // Für updateUser sollte ebenfalls eine explizite Typumwandlung erfolgen
  const userData: UserDTO = request.body as UserDTO;
  try {
    const updatedUser = await UserService.updateUser(
      request.params.id,
      userData // Verwendung von userData nach Typumwandlung
    );
    if (updatedUser) {
      reply.send(updatedUser);
    } else {
      reply.status(404).send({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    reply
      .status(500)
      .send({ message: "Fehler beim Aktualisieren des Benutzers" });
  }
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const success = await UserService.deleteUser(request.params.id);
    if (success) {
      reply.status(204).send();
    } else {
      reply.status(404).send({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    reply.status(500).send({ message: "Fehler beim Löschen des Benutzers" });
  }
};

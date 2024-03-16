import { userModel } from "../models/userModel";
import { User, UserDTO } from "../types/customTypes";

export class UserService {
  public static async getUsers(): Promise<User[]> {
    // Annahme: Die userModel.findAll() Methode gibt eine Promise mit einer Liste von User-Objekten zurück
    return await userModel.findAll();
  }

  public static async createUser(userData: UserDTO): Promise<User> {
    // Validierung oder Verarbeitung der Benutzerdaten vor dem Speichern in der Datenbank
    // Annahme: Die userModel.create() Methode speichert einen Benutzer und gibt das gespeicherte User-Objekt zurück
    return await userModel.create(userData);
  }

  public static async getUserById(id: string): Promise<User | null> {
    // Annahme: Die userModel.findById() Methode sucht nach einem Benutzer mit der gegebenen ID
    return await userModel.findById(id);
  }

  public static async updateUser(
    id: string,
    userData: UserDTO
  ): Promise<User | null> {
    // Überprüfen, ob der Benutzer existiert
    const user = await userModel.findById(id);
    if (!user) {
      return null;
    }

    // Annahme: Die userModel.updateById() Methode aktualisiert den Benutzer und gibt das aktualisierte User-Objekt zurück
    return await userModel.updateById(id, userData);
  }

  public static async deleteUser(id: string): Promise<boolean> {
    // Annahme: Die userModel.deleteById() Methode löscht einen Benutzer und gibt einen Wahrheitswert zurück, ob der Vorgang erfolgreich war
    return await userModel.deleteById(id);
  }
}

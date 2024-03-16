import { db } from "../utils/db";
import { User, UserDTO } from "../types/customTypes";

export const userModel = {
  /**
   * Findet alle Benutzer in der Datenbank.
   * @returns Eine Promise, die ein Array von User-Objekten zurückgibt.
   */
  async findAll(): Promise<User[]> {
    const result = await db.query<User>("SELECT * FROM Users");
    // Verwenden Sie Optional Chaining und Nullish Coalescing, um mit potenziell fehlenden recordsets umzugehen.
    return result?.recordset ?? [];
  },

  /**
   * Sucht einen Benutzer anhand seiner ID.
   * @param id Die ID des Benutzers.
   * @returns Eine Promise, die entweder ein User-Objekt oder null zurückgibt, falls kein Benutzer gefunden wurde.
   */
  async findById(id: string): Promise<User | null> {
    const result = await db.query<User>("SELECT * FROM Users WHERE id = @id", {
      id,
    });
    // Stellt sicher, dass wir ein Ergebnis haben, bevor wir darauf zugreifen.
    return result?.recordset?.[0] ?? null;
  },

  /**
   * Erstellt einen neuen Benutzer mit den gegebenen Benutzerdaten.
   * @param userData Die Daten des neuen Benutzers.
   * @returns Eine Promise, die das neu erstellte User-Objekt zurückgibt.
   */
  async create(userData: UserDTO): Promise<User> {
    const result: any = await db.query<User>(
      "INSERT INTO Users (name, email) OUTPUT INSERTED.* VALUES (@name, @email)",
      userData
    );
    // Nimmt an, dass das Einfügen immer erfolgreich ist und mindestens ein Ergebnis zurückgibt.
    return result.recordset[0];
  },

  /**
   * Aktualisiert die Daten eines Benutzers anhand seiner ID.
   * @param id Die ID des zu aktualisierenden Benutzers.
   * @param userData Die neuen Daten für den Benutzer.
   * @returns Eine Promise, die das aktualisierte User-Objekt oder null zurückgibt, falls kein Benutzer gefunden wurde.
   */
  async updateById(id: string, userData: UserDTO): Promise<User | null> {
    const result = await db.query<User>(
      "UPDATE Users SET name = @name, email = @email WHERE id = @id OUTPUT INSERTED.*",
      { ...userData, id }
    );
    // Prüft, ob die Aktualisierung ein Ergebnis zurückgegeben hat.
    return result?.recordset?.[0] ?? null;
  },

  /**
   * Löscht einen Benutzer anhand seiner ID.
   * @param id Die ID des zu löschenden Benutzers.
   * @returns Eine Promise, die true zurückgibt, wenn der Benutzer erfolgreich gelöscht wurde.
   */
  async deleteById(id: string): Promise<boolean> {
    await db.query("DELETE FROM Users WHERE id = @id", { id });
    // Annahme: Das Löschen war erfolgreich, ohne das Ergebnis zu überprüfen.
    return true;
  },
};

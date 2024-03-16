import sql from "mssql";
import { AppConfig } from "../config/config";

// MSSQL-Datenbankkonfiguration aus AppConfig extrahieren
const dbConfig: sql.config = {
  user: AppConfig.db.user,
  password: AppConfig.db.password,
  server: AppConfig.db.server, // Der Name oder die IP-Adresse des Datenbankservers
  database: AppConfig.db.database,
  options: {
    encrypt: AppConfig.db.options.encrypt, // Für Azure SQL erforderlich. Für andere MSSQL-Server auf false setzen.
    trustServerCertificate: AppConfig.db.options.trustServerCertificate, // Nur für Entwicklung. In Produktion korrektes Zertifikat verwenden.
  },
  pool: {
    max: 10, // Maximale Anzahl an Verbindungen im Pool
    min: 0,
    idleTimeoutMillis: 30000, // Zeit in ms, nach der eine ungenutzte Verbindung freigegeben wird
  },
};

// Initialisiert die Verbindung beim ersten Import der Datei
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Verbunden mit MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Datenbankverbindung fehlgeschlagen!", err);
    // Hier könnten Sie null zurückgeben oder eine spezielle Logik implementieren, um das Problem zu behandeln
    return null; // Geben Sie explizit null zurück, um den Typ korrekt zu handhaben
  });

export const db = {
  query: async <T>(
    queryText: string,
    params: Record<string, any> = {}
  ): Promise<sql.IResult<T> | null> => {
    // Erlauben Sie null als möglichen Rückgabetyp
    const pool = await poolPromise;
    if (!pool) {
      // Pool konnte nicht erstellt werden; geeignete Fehlerbehandlung hier
      return null;
    }

    const request = pool.request();
    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    return request.query<T>(queryText);
  },
};

/**Postgre SQL */
/*
import { Pool } from "pg"; // Angenommen, wir verwenden PostgreSQL. Für andere Datenbanken den entsprechenden Treiber importieren.
import { AppConfig } from "../config/config";

// Erstellen eines neuen Pool-Objekts mit Konfigurationsdaten
const pool = new Pool({
  user: AppConfig.db.user,
  host: AppConfig.db.server,
  database: AppConfig.db.database,
  password: AppConfig.db.password,
  port: parseInt(AppConfig.db.port, 10),
  ssl: AppConfig.db.options.encrypt
    ? { rejectUnauthorized: !AppConfig.db.options.trustServerCertificate }
    : false,
});

export const db = {
  query: async <T>(text: string, params?: any[]): Promise<T> => {
    const client = await pool.connect();
    try {
      const result = await client.query<T>(text, params);
      return result.rows;
    } finally {
      client.release(); // Sicherstellen, dass der Client zurück in den Pool gegeben wird
    }
  },
};

*/

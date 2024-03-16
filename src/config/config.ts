import { config } from "dotenv";
config(); // Lädt Umgebungsvariablen aus der .env Datei

export const AppConfig = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || "127.0.0.1",
  db: {
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    server: process.env.DB_SERVER || "",
    database: process.env.DB_DATABASE || "",
    options: {
      encrypt: process.env.DB_ENCRYPT === "true", // Für Azure SQL notwendig
      trustServerCertificate:
        process.env.DB_TRUST_SERVER_CERTIFICATE === "true", // Nur in Entwicklungsumgebung auf true setzen
    },
  },
  azureAd: {
    tenantId: process.env.AZURE_AD_TENANT_ID || "",
    clientId: process.env.AZURE_AD_CLIENT_ID || "",
  },
};
export { config };

// Definiert die Struktur eines Benutzerobjekts
export interface User {
  id: string;
  name: string;
  email: string;
  mandant?: string; // Optional, abhängig von der Anforderung
  personalnummer?: string; // Optional, abhängig von der Anforderung
}

// Definiert die Struktur der Daten, die zum Erstellen oder Aktualisieren eines Benutzers benötigt werden
export interface UserDTO {
  name: string;
  email: string;
  mandant?: string; // Optional, kann beim Erstellen eines Benutzers erforderlich sein
  personalnummer?: string; // Optional, kann beim Erstellen eines Benutzers erforderlich sein
}

export interface UserRouteParams {
  Params: {
    id: string;
  };
}

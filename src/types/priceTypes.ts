// Definiert die Struktur jedes Preisobjekts im Antwort-Array
export interface PriceInfo {
  customerNo: string;
  articleNo: string;
  listPrice: number;
  price: number;
}

// Definiert das Antwort-Array, das Objekte vom Typ PriceInfo enthält
export type PricesResponse = PriceInfo[];

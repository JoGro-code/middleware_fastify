import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../utils/db";
import { PricesResponse } from "../types/priceTypes";
import { User } from "../types/customTypes";

export const getPrice = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.user as User;
  const { customerNo, articleNos } = request.query as any; // Typisierung im Produktivcode präzisieren
  const mandant = user?.mandant ?? "";
  const personalnummer = user?.personalnummer ?? "";
  const pricesResponse: PricesResponse = [];

  for (const articleNo of articleNos) {
    // Stellen Sie sicher, dass die Stored Procedure parametrisierte Abfragen unterstützt, um SQL-Injection zu vermeiden
    const result: any | null = await db.query(
      `
            EXEC getPrice 
            @CustomerNo, 
            @ArticleNo, 
            @Mandant, 
            @Personalnummer
        `,
      {
        CustomerNo: customerNo,
        ArticleNo: articleNo,
        Mandant: mandant,
        Personalnummer: personalnummer,
      }
    );

    if (result.recordset.length > 0) {
      pricesResponse.push({
        customerNo,
        articleNo,
        listPrice: result.recordset[0].listPrice,
        price: result.recordset[0].price,
      });
    }
  }

  reply.send(pricesResponse);
};

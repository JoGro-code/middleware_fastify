//import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
////import { User } from "../types/customTypes";
//import { FastifyJWTOptions } from "@fastify/jwt";
//
//// Declaration Merging, um FastifyRequest zu erweitern
//declare module "fastify" {
//  //  // Erweitern des Interface für FastifyRequest
//  //  interface FastifyRequest {
//  //    //user?: User; // Optional, da nicht jede Anfrage den Benutzer haben muss
//  //    user: any;
//  //  }
//
//  // Erweitern des Interface für FastifyInstance
//  export interface FastifyInstance {
//    authenticate: (
//      request: FastifyRequest,
//      reply: FastifyReply
//    ) => Promise<void>;
//  }
//}

// src/types/fastify.d.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
//import { JwtVerify } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    //jwtVerify: any;
  }

  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

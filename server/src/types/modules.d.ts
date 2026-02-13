declare module "cors" {
  import type { RequestHandler } from "express";
  interface CorsOptions {
    origin?: string | string[] | boolean;
    credentials?: boolean;
  }
  const cors: (options?: CorsOptions) => RequestHandler;
  export default cors;
}

declare module "jsonwebtoken" {
  export interface SignOptions {
    expiresIn?: string | number;
  }
  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options?: SignOptions,
  ): string;
  export function verify(token: string, secretOrPublicKey: string): string | object;
}

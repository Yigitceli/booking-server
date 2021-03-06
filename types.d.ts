export interface newError extends Error {
  status: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

declare global {
  interface Error {
    name?: string;
    stack?: string;
    status?: number;
    stack?: string;
  }

}

interface IUser {
  userid: string;
  email: string;
  name: string;
  isAdmin: boolean;
  photoUrl: string;
}

interface ITokenData{
  user:IUser
}

export interface newError extends Error {
  status: number;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    isAdmin: boolean;
    email: string;
    userid: string;
    photoUrl: string;
    name: string;
  }; // or any other type
}

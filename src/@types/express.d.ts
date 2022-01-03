
type UserDocument = {
  name: string;
  email: string;
  password: string;
  about: string;
  role: number;
  history?: Array<any>;
};

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };

    profile: UserDocument;
  }
}
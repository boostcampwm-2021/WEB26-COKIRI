export {};

declare global {
  namespace Express {
    interface User {
      userID: string;
    }
  }
}

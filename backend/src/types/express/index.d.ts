export {};

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

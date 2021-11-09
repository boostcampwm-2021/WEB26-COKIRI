export interface User {
  userID: string;
}

export interface UserAuthProvider {
  authProvider: string;
  authProviderID: string;
}

export type ObjectType<T> = {
  [K in keyof T]: T[K];
};

export * from './modelType';

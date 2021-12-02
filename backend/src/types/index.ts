export interface User {
  userID: string;
}

export interface UserAuthProvider {
  authProvider: string;
  authProviderID: string;
  githubUsername?: string;
}

export type ObjectType<T> = {
  [K in keyof T]: T[K];
};

export type StringKeyObject = {
  [K: string]: object | string;
};

export * from './modelType';

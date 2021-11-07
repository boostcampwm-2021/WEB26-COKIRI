export interface User {
  username: string;
  userID: string;
}

export interface UserAuthProvider {
  authProvider: string;
  authProviderID: string;
}

export * from './modelType';

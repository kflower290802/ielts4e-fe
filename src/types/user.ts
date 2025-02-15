export interface IUser {
  id: string;
  email: string;
  name: string;
  account: {
    id: string;
    username: string;
    password: string;
    role: string;
    subscriptions: [string];
    createdAt: string;
    updatedAt: string;
  };
}

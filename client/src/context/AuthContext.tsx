import { createContext } from "react";

type User = {
  username: string;
  permission: string;
};

type Auth = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
export const AuthContext = createContext<Auth | null>(null);